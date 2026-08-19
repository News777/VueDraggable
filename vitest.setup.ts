import { afterEach } from 'vitest';
import { enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

Object.defineProperty(globalThis, 'requestAnimationFrame', {
  writable: true,
  configurable: true,
  value: (callback: FrameRequestCallback) => setTimeout(() => callback(0), 0)
});

Object.defineProperty(globalThis, 'cancelAnimationFrame', {
  writable: true,
  configurable: true,
  value: (id: number) => clearTimeout(id)
});
