import { signal, Signal } from '@angular/core';

import {
  isTableCellValue, isTableCellContent,
  defineTable, defineColumn, referValue, referColumns,
  TableColumn, TableDefinition, TableCellValue, TableCellContent
} from './tables';

interface Container { entity: Entity; }
interface Dynamic { entity: Signal<Entity>; }

interface Entity { value: string; }

class Dummy { }

describe('isTableCellValue', () => {
  it('should return true for cell value', () => {
    const value: TableCellValue<Entity> = { fit: item => item.value };
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
    const value: TableCellValue<Entity> = { fit: item => item.value };
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
    const column: TableColumn<Entity> = { id: 'value', displayName: 'Value', value: { fit: item => item.value } };
    expect(defineColumn<Entity>(column)).toBe(column);
  });
});

describe('referValue', () => {
  const i18n = { get: (key: string) => key };

  it('should wrap cell value for nested property', () => {
    const value = referValue<Container, Entity>('entity', { fit: item => item.value });
    expect(isTableCellValue(value)).toBeTrue();
    if (isTableCellValue(value)) {
      expect(value.fit({ entity: { value: 'test' } }, i18n)).toEqual('test');
    }
  });

  it('should wrap cell content for nested signal property', () => {
    const value = referValue<Dynamic, Entity>('entity', { fit: item => item.value });
    expect(isTableCellValue(value)).toBeTrue();
    if (isTableCellValue(value)) {
      expect(value.fit({ entity: signal({ value: 'test' }) }, i18n)).toEqual('test');
    }
  });

  it('should wrap cell content for nested property', () => {
    const value = referValue<Container, Entity>('entity', { component: Dummy, map: item => ({ value: item.value }) });
    expect(isTableCellContent(value)).toBeTrue();
    if (isTableCellContent(value)) {
      expect(value.component).toBe(Dummy);
      expect(value.map({ entity: { value: 'test' } }, i18n)).toEqual({ value: 'test' });
    }
  });

  it('should wrap cell content for nested signal property', () => {
    const value = referValue<Dynamic, Entity>('entity', { component: Dummy, map: item => ({ value: item.value }) });
    expect(isTableCellContent(value)).toBeTrue();
    if (isTableCellContent(value)) {
      expect(value.component).toBe(Dummy);
      expect(value.map({ entity: signal({ value: 'test' }) }, i18n)).toEqual({ value: 'test' });
    }
  });

  it('should throw for invalid value', () => {
    expect(() => referValue<Container, object>('entity', null!)).toThrowError(/invalid value type/i);
  });
});

describe('referColumns', () => {
  it('should map columns and wrap values', () => {
    const columns = referColumns<Container, Entity>('entity',
      { id: 'value', displayName: 'Value', width: '100%', align: 'center', value: { fit: item => item.value } }
    );
    expect(columns.map(x => x.id)).toEqual(['entity.value' as keyof Container]);
    expect(columns.map(x => x.displayName)).toEqual(['Value']);
    expect(columns.map(x => x.width)).toEqual(['100%']);
    expect(columns.map(x => x.align)).toEqual(['center']);
    expect(columns.map(x => isTableCellValue(x.value))).toEqual([true]);
  });
});
