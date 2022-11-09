import { createContext, useContext, useState } from 'react';
import { FilmType } from '../types/film';
import { InputContextType } from '../types/InputContextType';


export const InputContext = createContext<InputContextType>({
    setInputValues: null,
    setInputedItem: () => { }
})

const useProvideInput = (): InputContextType => {
    const [setInputValues, setInputedItem] = useState<FilmType | null>(null)

    return {
        setInputValues,
        setInputedItem
    }
}

export const ProvideInput = ({ children }: any): JSX.Element => {
    const value = useProvideInput();

    return (
        <InputContext.Provider value={value}>{children}</InputContext.Provider>
    )
}

export const usePageContext = () => {
    return useContext(InputContext)
}