import { Signal, Type } from "@angular/core";

export type GetterFn<T, R> = (item: T) => R;
export type MapperFn<T> = (item: T) => Record<string, unknown>;

export interface TableCellValue<T> {
  get: GetterFn<T, unknown>;
}

export interface TableCellContent<T> {
  component: Type<unknown>;
  inputs: MapperFn<T>;
}

export interface TableColumn<T> {
  id: keyof T;
  displayName: string;
  width?: string;
  value: TableCellValue<T> | TableCellContent<T>;
}

export interface TableDefinition<T> {
  name: string;
  columns: TableColumn<T>[];
  data: Signal<T[]>;
};
