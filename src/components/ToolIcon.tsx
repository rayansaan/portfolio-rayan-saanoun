import {
  FigmaIcon,
  MazeIcon,
  NotionIcon,
  JiraIcon,
  AfterEffectIcon,
  IllustratorIcon,
  PhotoshopIcon,
  WebflowIcon,
} from './ToolIcons';

const iconMap = {
  'Figma': FigmaIcon,
  'Maze': MazeIcon,
  'Notion': NotionIcon,
  'Jira': JiraIcon,
  'After effect': AfterEffectIcon,
  'Illustrator': IllustratorIcon,
  'Photoshop': PhotoshopIcon,
  'Webflow': WebflowIcon,
};

interface ToolIconProps {
  name: string;
  className?: string;
}

export function ToolIcon({ name, className }: ToolIconProps) {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}
