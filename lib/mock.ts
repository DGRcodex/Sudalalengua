// lib/mock.ts
import type { Item } from "./types";

export const MOCK_ITEMS: Item[] = [
  { id: "cronica", title: "Crónica del mes", kind: "Crónica" },
  { id: "arte", title: "Serie visual", kind: "Arte" },
  { id: "poesia", title: "Poemas ultramar", kind: "Poesía" },
  { id: "musica", title: "Sesión en vivo", kind: "Música" },
  { id: "archivo", title: "Archivo del mes", kind: "Archivo" },
  { id: "suplemento", title: "Suplemento", kind: "Especial" },
  { id: "opinion", title: "Opinión", kind: "Opinión" },
  { id: "cine", title: "Cine y memoria", kind: "Cine" },
  { id: "entrevista", title: "Entrevista", kind: "Entrevista" },
];
