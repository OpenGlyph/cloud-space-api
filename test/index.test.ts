import { describe, expect, it } from 'vitest';
import { CloudSpace } from '../src/index.js';

describe('CloudSpace', () => {
  const cs = new CloudSpace('test-token');

  it('should return table resource', () => {
    const table = cs.table('tbl_001');
    expect(table).toBeDefined();
  });

  it('should return dict resource', () => {
    const dict = cs.dict('dict_001');
    expect(dict).toBeDefined();
  });
});

describe('Table', () => {
  const cs = new CloudSpace('test-token');

  it('should provide all expected methods', () => {
    const table = cs.table('tbl_001');
    expect(typeof table.list).toBe('function');
    expect(typeof table.store).toBe('function');
    expect(typeof table.add).toBe('function');
    expect(typeof table.edit).toBe('function');
    expect(typeof table.delete).toBe('function');
    expect(typeof table.get).toBe('function');
  });
});

describe('Dict', () => {
  const cs = new CloudSpace('test-token');

  it('should provide all expected methods', () => {
    const dict = cs.dict('dict_001');
    expect(typeof dict.list).toBe('function');
    expect(typeof dict.store).toBe('function');
    expect(typeof dict.add).toBe('function');
    expect(typeof dict.edit).toBe('function');
    expect(typeof dict.remove).toBe('function');
    expect(typeof dict.getByKey).toBe('function');
    expect(typeof dict.removeByKey).toBe('function');
  });
});
