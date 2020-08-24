export function storage(key: string, data: string | null = ''): string | null {
  if (data === null) {
    localStorage.removeItem(key);
  }
  if (!data) {
    return localStorage.getItem(key) || '';
  }
  localStorage.setItem(key, data);
  return null;
}
