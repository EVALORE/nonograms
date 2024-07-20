export function validateTemplate(template: number[][]): boolean {
  if (!Array.isArray(template) || template.length === 0) {
    return false;
  }
  return template.every((row) => Array.isArray(row) && row.length === template[0]!.length);
}

export function areInvalidParams(index: number, template: number[][]): boolean {
  if (!template[index]) {
    return true;
  }
  if (index < 0 || index >= template.length) {
    return true;
  }
  return false;
}
