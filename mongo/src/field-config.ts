export type FieldConfig = Record<
  string,
  {
    dbField: string;
    toDb?: (v: string) => unknown;
  }
>;

export const padTokenId = (v: string) => v.padStart(78, "0");
