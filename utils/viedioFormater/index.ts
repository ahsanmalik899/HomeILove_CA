export const ViedioFormater = (url: string): string | null => {
  if (!url) return null;

  // YouTube
  const ytRegex =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const ytMatch = url.match(ytRegex);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?playsinline=1`;

  // Dailymotion
  const dmRegex = /dailymotion\.com\/video\/([a-zA-Z0-9]+)/;
  const dmMatch = url.match(dmRegex);
  if (dmMatch) return `https://www.dailymotion.com/embed/video/${dmMatch[1]}`;

  // Vimeo
  const vmRegex = /vimeo\.com\/(\d+)/;
  const vmMatch = url.match(vmRegex);
  if (vmMatch) return `https://player.vimeo.com/video/${vmMatch[1]}`;

  return null; // unsupported URL
};
