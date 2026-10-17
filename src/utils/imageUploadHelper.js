import { addMediaItem } from './adminStorage';

/**
 * Format bytes into human readable KB / MB
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 KB';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Compresses an image file from the device using Canvas
 * to prevent high-resolution camera photos from exceeding memory or limits.
 */
export async function compressAndReadImage(file, options = {}) {
  const {
    maxWidth = 1600,
    maxHeight = 1200,
    quality = 0.85
  } = options;

  return new Promise((resolve, reject) => {
    // For SVGs or non-raster, read directly
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve({
        dataUrl: reader.result,
        file,
        name: file.name,
        size: formatBytes(file.size),
        type: file.type
      });
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Scale proportionally if larger than maximums
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            maxHeight;
            height = Math.round((img.height * width) / img.width);
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        // Enhance rendering quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Determine output type (prefer image/webp, fallback to jpeg)
        const outputMime = file.type === 'image/png' && file.size < 500000 
          ? 'image/png' 
          : 'image/jpeg';
        
        const compressedDataUrl = canvas.toDataURL(outputMime, quality);
        
        // Approximate byte size of base64
        const stringLength = compressedDataUrl.length - 'data:image/jpeg;base64,'.length;
        const sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383;

        resolve({
          dataUrl: compressedDataUrl,
          file,
          name: file.name,
          size: formatBytes(sizeInBytes),
          type: outputMime,
          width,
          height
        });
      };
      img.onerror = () => {
        // Fallback to raw data url if canvas decode fails
        resolve({
          dataUrl: e.target.result,
          file,
          name: file.name,
          size: formatBytes(file.size),
          type: file.type
        });
      };
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image file from device.
 * Attempts server upload to /api/upload/index.php.
 * If server is unreachable or offline, safely uses optimized compressed Data URL.
 * Automatically saves asset to Media Library.
 */
export async function uploadImageFromFile(file, category = 'General') {
  if (!file) throw new Error('No file provided');

  // 1. First compress and read locally
  const localResult = await compressAndReadImage(file);
  let finalUrl = localResult.dataUrl;
  let finalSize = localResult.size;

  // 2. Try uploading to Hostinger PHP backend if available
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('category', category);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/upload/index.php', {
      method: 'POST',
      body: formData,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success' && json.url) {
        finalUrl = json.url;
        if (json.size) finalSize = json.size;
      }
    }
  } catch (err) {
    // Server endpoint not reachable (e.g. running in local Vite dev),
    // graceful fallback to optimized compressed Base64 Data URL.
  }

  // 3. Register in Media Library
  const cleanTitle = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  addMediaItem({
    title: cleanTitle || 'Uploaded Image',
    url: finalUrl,
    type: file.type || 'image/jpeg',
    size: finalSize,
    category: category || 'Uploaded'
  });

  return {
    url: finalUrl,
    title: cleanTitle,
    size: finalSize,
    name: file.name
  };
}

/**
 * Open the native file picker programmatically
 */
export function openDeviceFilePicker(onFileSelected, accept = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml') {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = accept;
  input.style.display = 'none';

  input.onchange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileSelected) {
      onFileSelected(file);
    }
    document.body.removeChild(input);
  };

  document.body.appendChild(input);
  input.click();
}
