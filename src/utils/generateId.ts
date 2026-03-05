export function generateImageId(projectId: string, index: number): string {
  return `${projectId}-img-${index}`;
}

export function generateStandardImageId(projectId: string, index: number): string {
  return `${projectId}-standard-${index}`;
}