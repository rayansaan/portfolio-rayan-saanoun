export function generateImageId(projectId: string, index: number): string {
  return `${projectId}-img-${index}`;
}