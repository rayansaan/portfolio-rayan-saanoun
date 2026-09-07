#!/usr/bin/env python3
"""Import a supplied photo ZIP without changing its originals (ImageMagick + Pillow)."""

import argparse
from collections import defaultdict
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import subprocess
import unicodedata
import zipfile
import zlib

from PIL import Image, ImageCms, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.avif'}


def slug(value):
    text = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', text).strip('-') or 'photo'


def run(*args):
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or f'Conversion failed: {args[0]}')
    return result.stdout.strip()


def verified_convert(command, destination, staging):
    temporary = staging / f'{destination.stem}-encoding.webp'
    run(*command, str(temporary))
    with Image.open(temporary) as image:
        image.load()
    if destination.exists():
        raise SystemExit(f'Asset appeared during conversion: {destination}')
    shutil.move(temporary, destination)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('archive', type=Path)
    parser.add_argument('staging', type=Path)
    parser.add_argument('--editorial', type=Path)
    parser.add_argument('--resume', action='store_true', help='Reuse verified originals and already generated assets after an interrupted import.')
    args = parser.parse_args()
    staging = args.staging.resolve()
    staging.mkdir(parents=True, exist_ok=True)
    originals = staging / 'originals'
    if originals.exists() and not args.resume:
        raise SystemExit('Use a fresh staging directory; extracted originals are never overwritten.')
    if not shutil.which('convert'):
        raise SystemExit('ImageMagick with HEIC and WebP support is required.')

    editorial = json.loads(args.editorial.read_text()) if args.editorial else {}
    profile = staging / 'sRGB.icc'
    profile.write_bytes(ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes())
    os.environ['MAGICK_TEMPORARY_PATH'] = str(staging)
    grouped = defaultdict(list)
    with zipfile.ZipFile(args.archive) as archive:
        members = [item for item in archive.infolist() if not item.is_dir()]
        if len(members) > 2000 or sum(item.file_size for item in members) > 1_000_000_000:
            raise SystemExit('Archive exceeds the bounded import size.')
        seen = set()
        for item in members:
            path = PurePosixPath(item.filename)
            mode = item.external_attr >> 16
            if (path.is_absolute() or '..' in path.parts or '\\' in item.filename
                    or stat.S_ISLNK(mode) or item.file_size > 150_000_000):
                raise SystemExit(f'Unsafe archive entry: {item.filename}')
            if item.filename.casefold() in seen:
                raise SystemExit(f'Duplicate archive entry: {item.filename}')
            seen.add(item.filename.casefold())
            if path.parts[0] == '__MACOSX' or path.name.startswith('.'):
                continue
            if len(path.parts) < 3 or path.suffix.lower() not in IMAGE_EXTENSIONS:
                raise SystemExit(f'Unexpected entry; review before importing: {item.filename}')
            if path.parts[0] != 'Projet Photos':
                raise SystemExit(f'Unexpected archive root: {path.parts[0]}')
            target = originals.joinpath(*path.parts)
            target.parent.mkdir(parents=True, exist_ok=True)
            if target.exists():
                if not args.resume or target.stat().st_size != item.file_size or zlib.crc32(target.read_bytes()) != item.CRC:
                    raise SystemExit(f'Existing original does not match this archive: {item.filename}')
            else:
                with archive.open(item) as source, target.open('xb') as output:
                    shutil.copyfileobj(source, output)
            grouped[path.parts[1]].append((path, target))

    projects = []
    report = []
    asset_root = ROOT / 'public/images/photography'
    for project_name, files in sorted(grouped.items()):
        project_id = slug(project_name)
        destination = asset_root / project_id
        destination.mkdir(parents=True, exist_ok=True)
        photos = []
        categories = {}
        paths_to_ids = {}
        for position, (path, original) in enumerate(sorted(files, key=lambda row: str(row[0]).casefold())):
            relative = str(PurePosixPath(*path.parts[1:]))
            digest = hashlib.sha256(relative.encode()).hexdigest()[:8]
            photo_id = f'{project_id}-{slug(path.stem)}-{digest}'
            full = destination / f'{photo_id}.webp'
            thumbnail = destination / f'{photo_id}-thumb.webp'
            if (full.exists() or thumbnail.exists()) and not args.resume:
                raise SystemExit(f'Import would overwrite an asset: {photo_id}')
            decoded = original
            if path.suffix.lower() in {'.heic', '.heif'} and not full.exists():
                decoded = staging / f'{photo_id}-decoded.png'
                if not decoded.exists():
                    run('heif-convert', '--quiet', str(original), str(decoded))
            command = ('convert', '-limit', 'memory', '256MiB', '-limit', 'map', '512MiB',
                       str(decoded) + '[0]', '-auto-orient', '-profile', str(profile),
                       '-colorspace', 'sRGB', '-strip')
            if not full.exists():
                verified_convert((*command, '-resize', '2560x2560>', '-quality', '88',
                                  '-define', 'webp:method=5'), full, staging)
            if not thumbnail.exists():
                verified_convert(('convert', str(full), '-resize', '1024x1024>', '-strip', '-quality', '83',
                                  '-define', 'webp:method=5'), thumbnail, staging)
            with Image.open(full) as image:
                image.load()
                width, height = image.size
                if image.getexif() or image.info.get('exif'):
                    raise SystemExit(f'Unexpected EXIF metadata: {photo_id}')
            category_path = list(path.parts[2:-1])
            photo = {
                'id': photo_id,
                'src': '/' + str(full.relative_to(ROOT / 'public')),
                'thumbnailSrc': '/' + str(thumbnail.relative_to(ROOT / 'public')),
                'width': width, 'height': height,
                'alt': editorial.get('photos', {}).get(relative, f'Photographie {position + 1} — {project_name}'),
            }
            if category_path:
                category_id = '--'.join(slug(part) for part in category_path)
                if category_id in categories and categories[category_id]['path'] != category_path:
                    raise SystemExit(f'Category slug collision: {category_path}')
                categories[category_id] = {'id': category_id, 'path': category_path}
                photo['categoryId'] = category_id
            photos.append(photo)
            paths_to_ids[relative] = photo_id
            report.append({'source': relative, 'id': photo_id, 'thumbnail': str(thumbnail),
                           'full': str(full), 'width': width, 'height': height,
                           'bytes': full.stat().st_size + thumbnail.stat().st_size})
            print(f'Imported {relative}: {width} × {height}', flush=True)
        cover = editorial.get('covers', {}).get(project_name)
        if cover and cover not in paths_to_ids:
            raise SystemExit(f'Unknown cover: {cover}')
        projects.append({'id': project_id, 'name': project_name,
                         'coverPhotoId': paths_to_ids[cover] if cover else photos[0]['id'],
                         'categories': list(categories.values()), 'photos': photos})

    # Machine-generated source data; no absolute paths or originals enter the site.
    manifest = ROOT / 'src/data/photography.generated.json'
    manifest.write_text(json.dumps(projects, ensure_ascii=False, indent=2) + '\n')
    (staging / 'import-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')

    # Bounded contact sheets for asset inspection, not browser screenshots.
    font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 16)
    for start in range(0, len(report), 12):
        rows = report[start:start + 12]
        sheet = Image.new('RGB', (1200, 350 * ((len(rows) + 3) // 4)), '#e8e8e8')
        draw = ImageDraw.Draw(sheet)
        for offset, entry in enumerate(rows):
            x, y = (offset % 4) * 300, (offset // 4) * 350
            with Image.open(entry['thumbnail']) as image:
                image = ImageOps.contain(image.convert('RGB'), (280, 295))
                sheet.paste(image, (x + (300 - image.width) // 2, y + (300 - image.height) // 2))
            label = entry['source'].split('/')[-1]
            draw.text((x + 10, y + 304), f'{start + offset + 1:02d} · {label}', font=font, fill='#111')
            draw.text((x + 10, y + 325), entry['source'].rsplit('/', 1)[0], font=font, fill='#444')
        sheet.save(staging / f'contact-{start // 12 + 1}.jpg', quality=90)
    print(json.dumps({'projects': len(projects), 'photos': len(report),
                      'categories': {p['name']: [c['path'] for c in p['categories']] for p in projects},
                      'asset_bytes': sum(row['bytes'] for row in report)}, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
