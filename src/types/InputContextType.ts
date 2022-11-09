import { FilmType } from "./film";

export type InputContextType = {
    setInputValues: FilmType | null;
    setInputedItem: (item: FilmType) => void;
}