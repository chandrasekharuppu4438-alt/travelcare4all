/**
 * Universal Image Resolver for Travel Care 4 All
 * Resolves tour, destination, and gallery image paths safely without double extensions
 *
 * @param {string} img - e.g. "srilanka.png", "srilanka", "/images/srilanka.png", "https://..."
 * @param {string} fallback - fallback image if img is missing (default: "/images/hero.png")
 * @returns {string} - e.g. "/images/srilanka.png"
 */
export function getAssetImageUrl(img, fallback = '/images/hero.png') {
  if (!img) return fallback;
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('/images/')) {
    return img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.webp') || img.endsWith('.svg')
      ? img
      : `${img}.png`;
  }
  if (img.startsWith('/')) return img;
  
  const clean = img.endsWith('.png') || img.endsWith('.jpg') || img.endsWith('.webp') || img.endsWith('.svg')
    ? img
    : `${img}.png`;
  return `/images/${clean}`;
}

export default getAssetImageUrl;
