import { useMemo } from "react";

const Pagination = ({ total = 0, showPerPage = 12, currentPage = 1, onPageChange }: any) => {
    const allPages = useMemo(() => {
        const pagesOfShow = total / showPerPage;
        const pages = []
        for (let i = 1; i <= Math.ceil(pagesOfShow); i++) {
        pages.push(i)
        }
        return pages;
    }, [total, showPerPage])

    const pageChanged = (value: number) => {
        onPageChange(value);
    }

    const nextPage = () => pageChanged(currentPage + 1);
    const prevPage = () => pageChanged(currentPage - 1);

    return (
        <>
        <ul className='pagination'>
            {allPages.map((number) => (
            <li className='pagenumber' key={number}>
                <div className='pagelink' 
                        style={{ backgroundColor: currentPage === number ? 'rgb(31, 187, 17)' : 'rgb(187, 17, 187)', border: currentPage === number ? '1px solid firebrick' : 'none'}} 
                        onClick={() => pageChanged(number)}>
                    {number}
                </div>
            </li>
            )
            )}
        </ul>
        <button disabled={currentPage === 1} className='Prev' onClick={prevPage}>Prev</button>
        <button disabled={currentPage === allPages.length} className='Next' onClick={nextPage}>Next</button>      
        </>
    )

}

export default Pagination;