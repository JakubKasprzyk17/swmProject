export const tagRemover = (text: string | undefined): string => {
  if (!text) return '';
  const withoutParagraphs = text.replace(/<p>/g, '').replace(/<\/p>/g, '');
  const cleanText = withoutParagraphs.replace(/<[^>]*>?/gm, '');

  return cleanText;
};
