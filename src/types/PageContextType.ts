import { FilmType } from "./film";

export type PageContextType = {
    setLastValue: FilmType | null;
    setLastedItem: (item: FilmType) => void;
}