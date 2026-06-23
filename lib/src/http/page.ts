export type Page<T> = {
  items: T[];
  cursor: string | null;
};
