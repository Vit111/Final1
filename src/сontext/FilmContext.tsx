import { createContext, useContext, useState } from 'react';
import { FilmType } from '../types/film';
import { FilmContextType } from '../types/FilmContextType';

export const FilmContext = createContext<FilmContextType>({
    selectedItem: null,
    setSelectedItem: () => { }
})

const useProvideCharacter = (): FilmContextType => {
    const [selectedItem, setSelectedItem] = useState<FilmType | null>(null)

    return {
        selectedItem,
        setSelectedItem
    }
}

export const ProvideFilm = ({ children }: any): JSX.Element => {
    const value = useProvideCharacter();

    return (
        <FilmContext.Provider value={value}>{children}</FilmContext.Provider>
    )
}

export const useFilmContext = () => {
    return useContext(FilmContext)
}