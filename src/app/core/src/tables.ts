import { Type } from '@angular/core';

export interface I18n {
  get(key: string, ...prefixes: string[]): string;
}

export type FitterFn<T, R> = (object: T, i18n: I18n) => R;
export type MapperFn<T> = (object: T, i18n: I18n) => Record<string, unknown>;

/**
 * Represents a cell value in a table.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export interface TableCellValue<T, V = unknown> {
  fit: FitterFn<T, V>;
}

/**
 * Represents a cell content in a table.
 * @template T The type of an object mapped to the table.
 */
export interface TableCellContent<T> {
  component: Type<unknown>;
  map: MapperFn<T>;
}

/**
 * Represents additional options for a table column.
 */
export interface TableColumnOptions {
  width?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Represents a column in a table.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export interface TableColumn<T extends object, V = unknown> extends TableColumnOptions {
  id: string;
  displayName: string;
  value: TableCellValue<T, V> | TableCellContent<T>;
}

/**
 * Represents a table definition with its name and columns.
 * @template T The type of an object mapped to the table.
 */
export interface TableDefinition<T extends object> {
  name: string;
  columns: TableColumn<T>[];
};

/**
 * Checks if the provided value is a TableCellValue.
 * @param value The value to check.
 * @returns True if the value is a TableCellValue; otherwise, false.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export function isTableCellValue<T extends object, V = unknown>(value: TableCellValue<T, V> | TableCellContent<T>): value is TableCellValue<T, V> {
  return value != null && 'fit' in value;
}

/**
 * Checks if the provided value is a TableCellContent.
 * @param value The value to check.
 * @returns True if the value is a TableCellContent; otherwise, false.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export function isTableCellContent<T extends object, V = unknown>(value: TableCellValue<T, V> | TableCellContent<T>): value is TableCellContent<T> {
  return value != null && 'component' in value && 'map' in value;
}

/**
 * Defines a table with its properties.
 * @param name The name of the table.
 * @param columns The columns to be included in the table.
 * @returns The table options created.
 * @template T The type of an object mapped to the table.
 */
export function defineTable<T extends object>(name: string, ...columns: TableColumn<T>[]): TableDefinition<T> {
  return { name, columns };
}

/**
 * Defines a table column with its properties.
 * @param id The unique identifier for the column.
 * @param displayName The display name of the column.
 * @param value The value of the column, which can be a cell value or content.
 * @param options Additional options for the column, such as width and alignment.
 * @returns The defined options created.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export function defineColumn<T extends object, V = unknown>(
  id: string, displayName: string,
  value: TableCellValue<T, V> | TableCellContent<T>,
  options?: TableColumnOptions): TableColumn<T, V> {
  return { id, displayName, value, ...options ?? {} };
}
