import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import {
  BehaviorSubject, Observable, combineLatest,
  finalize, map, shareReplay, switchMap, tap
} from 'rxjs';

import { DataSourceBase, QueryState } from './data-source-base';

export interface ODataQuery {
  $filter?: string | null;
  $expand?: string | null;
  $orderby?: string | null;
  $top?: number | null;
  $skip?: number | null;
}

export interface ODataResultSet<T> {
  offset: number;
  count: number;
  elements: T[];
  nextLink?: string;
}

export type ODataEndpointFn<T> = (query: ODataQuery) => Observable<ODataResultSet<T>>;

function getOrderBy(sort: Sort | null): string | null {
  const { active, direction } = sort ?? {};
  return active && direction ? `${active} ${direction}` : null;
}

function getSkipIndex(page: PageEvent | null): number | undefined {
  const { pageIndex, pageSize } = page ?? {};
  if (pageIndex != null && pageSize != null) {
    return pageIndex * pageSize;
  }
  return undefined;
}

export function buildQuery(state: QueryState, sort: Sort | null, page: PageEvent | null): ODataQuery {
  const { query } = state;
  return {
    $filter: query,
    $orderby: getOrderBy(sort),
    $top: page?.pageSize,
    $skip: getSkipIndex(page)
  };
}

export function create<T>(elements: T[], top?: number | null, skip?: number | null): ODataResultSet<T> {
  return {
    offset: skip ?? 0,
    count: elements.length,
    elements: elements.slice(skip ?? 0, top ?? elements.length)
  };
}

export function convert<T, U>(l: ODataResultSet<T>, callbackfn: (value: T, index: number, array: T[]) => U): ODataResultSet<U> {
  return {
    offset: l.offset,
    count: l.count,
    elements: l.elements.filter(x => x).map(callbackfn),
    nextLink: l.nextLink
  };
}

export class ODataSource<T> extends DataSourceBase<T> {
  readonly #loading = new BehaviorSubject<boolean>(false);

  readonly loading$ = this.#loading.asObservable();

  /** @inheritdoc */
  protected readonly _entries = combineLatest([this._states, this._sort, this._page]).pipe(
    tap(() => this.#loading.next(true)),
    switchMap(state => this._endpoint(buildQuery(...state)).pipe(
      map(data => {
        this._update(data.count, state[2]);
        return data.elements;
      }),
      finalize(() => this.#loading.next(false))
    )), shareReplay(1));

  constructor(private readonly _endpoint: ODataEndpointFn<T>) {
    super();
  }
}
