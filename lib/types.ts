// lib/types.ts
export type Item = {
  id: string;
  title: string;
  kind: string; // sección/genre
  image?: string; // url
  body?: string; // preview
};

export type MonthState = { label: string; index: number };
