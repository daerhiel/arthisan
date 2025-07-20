import {
  isTableCellValue, isTableCellContent, defineTable, defineColumn,
  TableColumn, TableDefinition, TableCellValue, TableCellContent
} from './tables';

interface Entity { value: string; }

class Dummy { }

describe('isTableCellValue', () => {
  it('should return true for cell value', () => {
    const value: TableCellValue<Entity, string> = { fit: item => item.value };
    expect(isTableCellValue(value)).toBe(true);
  });

  it('should return false for cell content', () => {
    const value: TableCellContent<Entity> = { component: Dummy, map: item => ({ value: item.value }) };
    expect(isTableCellValue(value)).toBe(false);
  });

  it('should return false for invalid value', () => {
    expect(isTableCellValue(null!)).toBe(false);
  });
});

describe('isTableCellContent', () => {
  it('should return true for cell content', () => {
    const value: TableCellContent<Entity> = { component: Dummy, map: item => ({ value: item.value }) };
    expect(isTableCellContent(value)).toBe(true);
  });

  it('should return false for cell value', () => {
    const value: TableCellValue<Entity, string> = { fit: item => item.value };
    expect(isTableCellContent(value)).toBe(false);
  });

  it('should return false for invalid value', () => {
    expect(isTableCellContent(null!)).toBe(false);
  });
});

describe('defineTable', () => {
  it('should define table', () => {
    const table: TableDefinition<Entity> = { name: 'Test', columns: [] };
    expect(defineTable(table)).toBe(table);
  });
});

describe('defineColumn', () => {
  it('should define column', () => {
    const column: TableColumn<Entity, string> = {
      id: 'value',
      displayName: 'Value',
      value: { fit: item => item.value }
    };
    expect(defineColumn<Entity, string>(column)).toBe(column);
  });
});
