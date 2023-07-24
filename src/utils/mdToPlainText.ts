export function mdToPlainText(md: string) {
  return md.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
}
