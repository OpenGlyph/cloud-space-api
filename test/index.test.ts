import { describe, expect, it } from 'vitest';
import { hello } from '../src/index.js';

describe('hello', () => {
  it('should return greeting', () => {
    expect(hello()).toBe('Hello, Cloud Space API!');
  });
});
