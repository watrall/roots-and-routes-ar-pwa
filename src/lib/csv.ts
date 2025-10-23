export type CsvRow = Record<string, string | number | boolean | null | undefined>;

/**
 * Converts a collection of records into CSV format using header inference.
 */
export const toCsv = (rows: CsvRow[]): string => {
  if (rows.length === 0) {
    return '';
  }

  const headers = Array.from(
    rows.reduce((acc, row) => {
      Object.keys(row).forEach((key) => acc.add(key));
      return acc;
    }, new Set<string>())
  );

  const csvRows = rows.map((row) =>
    headers
      .map((header) => formatCell(row[header]))
      .join(',')
  );

  return [headers.join(','), ...csvRows].join('\n');
};

const formatCell = (value: CsvRow[string]): string => {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
};
