export type SortDir = "asc" | "desc";

export type Page<T> = {
  items: T[];
  nextCursor: string | null;
};

export type PageQuery = {
  limit: number;
  cursor?: string;

  from?: number;
  to?: number;

  rangeField?: string;
  sortField: string;

  sortDir: SortDir;

  filters?: { [key: string]: unknown; or?: Record<string, unknown>[] };
};

export type WithTimestamps = {
  createdAt: number;
  updatedAt: number;
};

export interface ByKey<TEntity, TKey> {
  findByKey(key: TKey): Promise<TEntity | null>;
  findByKeys(keys: TKey[]): Promise<TEntity[]>;
}

export interface Pageable<TEntity extends object> {
  findPage(args: PageQuery): Promise<Page<TEntity>>;
}

export interface Countable {
  count(args?: Pick<PageQuery, "filters">): Promise<number>;
}
