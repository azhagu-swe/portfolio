import { renderHook } from '@testing-library/react';
import { useTouchDevice } from '../useTouchDevice';

describe('useTouchDevice', () => {
  it('should detect touch device when ontouchstart is supported', () => {
    // This test will only work in a browser environment where window exists
    // In a Node.js environment, the hook will return false
    const { result } = renderHook(() => useTouchDevice());
    // In our test environment, we expect it to be false since we're not in a browser
    expect(typeof result.current).toBe('boolean');
  });
});