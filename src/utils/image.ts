import { MAX_IMAGE_BYTES } from '../data/campaignContent';
import type { PhotoState } from '../types/campaign';

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]);
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);
const MAX_DIMENSION = 1800;

export function validateImageFile(file: File): string | null {
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  const typeIsAllowed = ALLOWED_TYPES.has(file.type.toLowerCase());
  const extensionIsAllowed = ALLOWED_EXTENSIONS.has(extension);

  if (!typeIsAllowed && !extensionIsAllowed) {
    return 'That file type is not supported. Please choose a JPG, PNG or WEBP image.';
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return 'This photo is larger than 10 MB. Please choose a smaller image.';
  }

  if (file.size === 0) {
    return 'This file appears to be empty. Please choose another photo.';
  }

  return null;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('The photo could not be read.'));
    };
    reader.onerror = () => reject(new Error('The photo could not be read.'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error('The photo could not be opened. Please try another image.'));
    image.src = src;
  });
}

export async function preparePhoto(file: File): Promise<PhotoState> {
  const validationError = validateImageFile(file);
  if (validationError) throw new Error(validationError);

  const original = await readAsDataUrl(file);
  const image = await loadImage(original);
  const scale = Math.min(1, MAX_DIMENSION / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  let src = original;

  if (scale < 1) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare this photo.');
    context.drawImage(image, 0, 0, width, height);
    const outputType =
      file.type === 'image/png'
        ? 'image/png'
        : file.type === 'image/webp'
          ? 'image/webp'
          : 'image/jpeg';
    src = canvas.toDataURL(outputType, 0.9);
  }

  return {
    src,
    name: file.name,
    width,
    height,
    positionX: 50,
    positionY: 35,
  };
}

export function clampPosition(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)));
}
