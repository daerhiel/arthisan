import { Type } from "@angular/core";

export interface I18n {
  get(key: string, ...prefixes: string[]): string;
}

export type FitterFn<T, R> = (item: T, i18n: I18n) => R;
export type MapperFn<T> = (item: T, i18n: I18n) => Record<string, unknown>;

export interface TableCellValue<T> {
  fit: FitterFn<T, unknown>;
}

export interface TableCellContent<T> {
  component: Type<unknown>;
  map: MapperFn<T>;
}

export interface TableColumn<T extends object> {
  id: keyof T;
  displayName: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  value: TableCellValue<T> | TableCellContent<T>;
}

export interface TableDefinition<T extends object> {
  name: string;
  columns: TableColumn<T>[];
};

/**
 * Checks if the provided value is a TableCellValue.
 * @param value The value to check.
 * @returns True if the value is a TableCellValue; otherwise, false.
 */
export function isTableCellValue<T extends object>(value: TableCellValue<T> | TableCellContent<T>): value is TableCellValue<T> {
  return value != null && 'fit' in value;
}

/**
 * Checks if the provided value is a TableCellContent.
 * @param value The value to check.
 * @returns True if the value is a TableCellContent; otherwise, false.
 */
export function isTableCellContent<T extends object>(value: TableCellValue<T> | TableCellContent<T>): value is TableCellContent<T> {
  return value != null && 'component' in value && 'map' in value;
}

/**
 * Defines a table with its properties.
 * @param definition The table options to be defined.
 * @returns The table options created.
 * @template T The type of the items in the table.
 */
export function defineTable<T extends object>(definition: TableDefinition<T>): TableDefinition<T> {
  return definition;
}

/**
 * Defines a table column with its properties.
 * @param column The column to be defined.
 * @returns The defined options created.
 * @template T The type of the items in the column.
 */
export function defineColumn<T extends object>(column: TableColumn<T>): TableColumn<T> {
  return column;
}

/**
 * Wraps a cell value or content to refer to a nested property.
 * @param id The id of the property to refer to.
 * @param value The value or content to wrap.
 * @returns The wrapped value or content.
 * @template T The type of the items in the table.
 * @template R The type of the nested property.
 */
export function referValue<T extends object, R extends object>(id: keyof T, value: TableCellValue<R> | TableCellContent<R>): TableCellValue<T> | TableCellContent<T> {
  if (isTableCellValue(value)) {
    return {
      fit: (item: T, i18n: I18n) => value.fit(item[id] as R, i18n)
    };
  }
  if (isTableCellContent(value)) {
    return {
      component: value.component,
      map: (item: T, i18n: I18n) => value.map(item[id] as R, i18n)
    };
  }
  throw new Error('Invalid value type');
}

/**
 * Wraps a set of columns as a property of a parent object.
 * @param id The id of the property to refer to.
 * @param columns The columns to wrap.
 * @returns The wrapped columns.
 * @template T The type of the items in the table.
 * @template R The type of the nested property.
 */
export function referColumns<T extends object, R extends object>(id: keyof T, ...columns: TableColumn<R>[]): TableColumn<T>[] {
  return columns.map(column => ({
    ...column,
    id: `${String(id)}.${String(column.id)}` as keyof T,
    value: referValue(id, column.value)
  }));
}
