import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MovableBox from './MovableBox.vue';

const flushFrame = () => new Promise(resolve => setTimeout(resolve, 0));

describe('MovableBox', () => {
  const makeProps = (overrides: Record<string, any> = {}) => ({
    modelValue: {
      left: 10,
      top: 20,
      width: 120,
      height: 80,
      zIndex: 1
    },
    draggable: true,
    resizable: true,
    limitAreaForParent: false,
    ...overrides
  });

  it('renders the initial rect and exposes the active state style', async () => {
    const wrapper = mount(MovableBox, {
      props: makeProps(),
      slots: {
        default: '<div class="content">content</div>'
      }
    });

    await nextTick();

    const element = wrapper.get('.auto-draggable');
    expect(element.element).toBeTruthy();
    expect(element.attributes('style')).toContain('left: 10px');
    expect(element.attributes('style')).toContain('top: 20px');
    expect(element.attributes('style')).toContain('width: 120px');
    expect(element.attributes('style')).toContain('height: 80px');
  });

  it('updates the model when dragging the box', async () => {
    const wrapper = mount(MovableBox, {
      props: makeProps(),
      attachTo: document.body
    });

    const root = wrapper.get('.auto-draggable');

    await root.trigger('mousedown', { clientX: 100, clientY: 200 });
    document.documentElement.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 170, clientY: 260, bubbles: true })
    );
    await flushFrame();
    document.documentElement.dispatchEvent(
      new MouseEvent('mouseup', { clientX: 170, clientY: 260, bubbles: true })
    );

    await nextTick();
    const dragPayload = wrapper.emitted('drag')?.at(-1)?.[0] as
      | { left: number; top: number; width: number; height: number }
      | undefined;

    expect(dragPayload).toMatchObject({
      left: 80,
      top: 80,
      width: 120,
      height: 80
    });
    expect(wrapper.props('modelValue')).toMatchObject({
      left: 80,
      top: 80,
      width: 120,
      height: 80
    });
  });

  it('resizes from the bottom-right handle without shrinking below the minimum size', async () => {
    const wrapper = mount(MovableBox, {
      props: makeProps({
        minWidth: 40,
        minHeight: 40,
        handles: ['br']
      }),
      attachTo: document.body
    });

    const handle = wrapper.get('.handle-br');

    await handle.trigger('mousedown', { clientX: 100, clientY: 200 });
    document.documentElement.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 180, clientY: 260, bubbles: true })
    );
    await flushFrame();
    document.documentElement.dispatchEvent(
      new MouseEvent('mouseup', { clientX: 180, clientY: 260, bubbles: true })
    );

    await nextTick();
    const resizePayload = wrapper.emitted('resize')?.at(-1)?.[0] as
      | { width: number; height: number }
      | undefined;

    expect(resizePayload).toMatchObject({
      width: expect.any(Number),
      height: expect.any(Number)
    });
    expect(resizePayload!.width).toBeGreaterThanOrEqual(40);
    expect(resizePayload!.height).toBeGreaterThanOrEqual(40);
    expect(wrapper.props('modelValue')).toMatchObject({
      width: expect.any(Number),
      height: expect.any(Number)
    });
    expect(wrapper.props('modelValue').width).toBeGreaterThanOrEqual(40);
    expect(wrapper.props('modelValue').height).toBeGreaterThanOrEqual(40);
  });
});
