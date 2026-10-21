import { toBlob } from 'html-to-image';
import { POSTER_SIZES } from '../data/campaignContent';
import type { PosterFormat } from '../types/campaign';

export async function waitForPosterAssets(node: HTMLElement): Promise<void> {
  await document.fonts.ready;

  const images = Array.from(node.querySelectorAll('img'));
  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          image.addEventListener('load', done, { once: true });
          image.addEventListener('error', done, { once: true });
        }),
    ),
  );

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

export async function renderPosterBlob(
  node: HTMLElement,
  format: PosterFormat,
): Promise<Blob> {
  await waitForPosterAssets(node);
  const size = POSTER_SIZES[format];

  try {
    const blob = await toBlob(node, {
      width: size.width,
      height: size.height,
      canvasWidth: size.width,
      canvasHeight: size.height,
      pixelRatio: 1,
      cacheBust: false,
      backgroundColor: '#ffffff',
    });

    if (!blob) {
      throw new Error('The poster could not be generated.');
    }

    return blob;
  } catch {
    throw new Error(
      'We could not create the PNG. Please check your connection or try another photo.',
    );
  }
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = `${fileName}.png`;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
}

export function downloadPoster(
  blob: Blob,
  format: PosterFormat,
): void {
  downloadBlob(blob, POSTER_SIZES[format].fileName);
}

export type ShareResult = 'shared' | 'cancelled' | 'unsupported' | 'failed';

export async function sharePosterBlob(
  blob: Blob,
  format: PosterFormat,
  title: string,
  text: string,
): Promise<ShareResult> {
  const file = new File([blob], `${POSTER_SIZES[format].fileName}.png`, {
    type: 'image/png',
  });

  if (
    typeof navigator.share !== 'function' ||
    typeof navigator.canShare !== 'function' ||
    !navigator.canShare({ files: [file] })
  ) {
    return 'unsupported';
  }

  try {
    await navigator.share({ files: [file], title, text });
    return 'shared';
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return 'cancelled';
    }
    return 'failed';
  }
}
