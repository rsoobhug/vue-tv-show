export function useSanitiseHtml(text) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
