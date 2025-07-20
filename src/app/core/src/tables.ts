import { Signal, Type } from '@angular/core';

export interface I18n {
  get(key: string, ...prefixes: string[]): string;
}

export type FitterFn<T, R> = (item: T, i18n: I18n) => R;
export type MapperFn<T> = (item: T, i18n: I18n) => Record<string, unknown>;

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
 * Represents a column in a table.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export interface TableColumn<T extends object, V = unknown> {
  id: keyof T;
  displayName: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
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
 * @param definition The table options to be defined.
 * @returns The table options created.
 * @template T The type of an object mapped to the table.
 */
export function defineTable<T extends object>(definition: TableDefinition<T>): TableDefinition<T> {
  return definition;
}

/**
 * Defines a table column with its properties.
 * @param column The column to be defined.
 * @returns The defined options created.
 * @template T The type of an object mapped to the table.
 * @template V The type of the value in the column.
 */
export function defineColumn<T extends object, V = unknown>(column: TableColumn<T, V>): TableColumn<T, V> {
  return column;
}

/**
 * Wraps a cell value or content to refer to a nested property.
 * @param id The id of the property to refer to.
 * @param value The value or content to wrap.
 * @returns The wrapped value or content.
 * @template T The type of an object mapped to the table.
 * @template R The type of the nested property.
 * @template V The type of the value in the column.
 * @throws Will throw an error if the value is not supported.
 */
export function referValue<T extends object, R extends object, V = unknown>(id: keyof T, value: TableCellValue<R, V> | TableCellContent<R>): TableCellValue<T, V> | TableCellContent<T> {
  if (isTableCellValue(value)) {
    return {
      fit: (item: T, i18n: I18n) => {
        const prop = item[id] as R | Signal<R>;
        return value.fit(prop instanceof Function ? prop() : prop, i18n);
      }
    };
  }
  if (isTableCellContent(value)) {
    return {
      component: value.component,
      map: (item: T, i18n: I18n) => {
        const prop = item[id] as R | Signal<R>;
        return value.map(prop instanceof Function ? prop() : prop, i18n);
      }
    };
  }
  throw new Error('Invalid value type');
}

/**
 * Wraps a column as a property of a parent object.
 * @param id The id of the property to refer to.
 * @param column The column to wrap.
 * @returns The wrapped column.
 * @template T The type of an object mapped to the table.
 * @template R The type of the nested property.
 * @template V The type of the value in the column.
 */
export function referColumn<T extends object, R extends object, V = unknown>(id: keyof T, column: TableColumn<R, V>): TableColumn<T, V> {
  return {
    ...column,
    id: `${String(id)}.${String(column.id)}` as keyof T,
    value: referValue(id, column.value)
  };
}

/**
 * Wraps a set of columns as a property of a parent object.
 * @param id The id of the property to refer to.
 * @param columns The columns to wrap.
 * @returns The wrapped columns.
 * @template T The type of an object mapped to the table.
 * @template R The type of the nested property.
 */
export function referColumns<T extends object, R extends object>(id: keyof T, ...columns: TableColumn<R>[]): TableColumn<T>[] {
  return columns.map(column => referColumn(id, column));
}
