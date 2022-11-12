import { createContext, useContext, useState } from 'react';
import { PageContextType } from '../types/PageContextType';


export const PageContext = createContext<PageContextType>({
    selectedPageNumber: 1,
    setSelectedPageNumber: () => {},
    selectedInputValue: '',
    setSelectedInputValue: () => {}
})

const useProvidePage = (): PageContextType => {
    const [selectedPageNumber, setSelectedPageNumber] = useState<number>(1);
    const [selectedInputValue, setSelectedInputValue] = useState<string>('');

    return {
        selectedPageNumber,
        setSelectedPageNumber,
        selectedInputValue,
        setSelectedInputValue,
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