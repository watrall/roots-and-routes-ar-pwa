import { describe, expect, test } from 'vitest';
import { toCsv } from '../lib/csv';

describe('toCsv', () => {
  test('returns empty string for empty input', () => {
    expect(toCsv([])).toBe('');
  });

  test('serializes rows with inferred headers', () => {
    const csv = toCsv([
      { id: 1, name: 'Coffee', note: 'Origin: Ethiopia' },
      { id: 2, name: 'Maize', extra: 'Staple crop' }
    ]);

    expect(csv.split('\n')[0]).toBe('id,name,note,extra');
    expect(csv).toContain('1,Coffee,Origin: Ethiopia,');
    expect(csv).toContain('2,Maize,,Staple crop');
  });
});
