import { FilmType } from "./film";

export type FilmContextType = {
    selectedItem: FilmType | null;
    setSelectedItem: (item: FilmType) => void;
}
