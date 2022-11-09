import { createContext, useContext, useState } from 'react';
import { FilmType } from '../types/film';
import { PageContextType } from '../types/PageContextType';


export const PageContext = createContext<PageContextType>({
    setLastValue: null,
    setLastedItem: () => { }
})

const useProvidePage = (): PageContextType => {
    const [setLastValue, setLastedItem] = useState<FilmType | null>(null)

    return {
        setLastValue,
        setLastedItem
    }
}

export const ProvidePage = ({ children }: any): JSX.Element => {
    const value = useProvidePage();

    return (
        <PageContext.Provider value={value}>{children}</PageContext.Provider>
    )
}

export const usePageContext = () => {
    return useContext(PageContext)
}