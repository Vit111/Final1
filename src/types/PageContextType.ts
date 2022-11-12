export type PageContextType = {
    selectedPageNumber: number;
    setSelectedPageNumber: (page: number) => void;
    selectedInputValue: string;
    setSelectedInputValue: (value: string) => void;
}