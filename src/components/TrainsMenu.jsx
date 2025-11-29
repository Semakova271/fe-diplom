import { useEffect, useState } from "react"
import ReactPaginate from 'react-paginate'

export const TrainsMenu = ({count, limit, setForm}) => {

    const [pageCount, setPageCount] = useState(0);
    let offset;


    useEffect(() => {
        setPageCount(Math.ceil(count / limit))
    }, [limit, count])


    const handleChange = (event) => {
        offset = (event.selected * limit) % count;
        setForm((prevForm) => ({...prevForm, offset: offset}))
    }

    return (
        <>
            <div className="trains-menu">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    previousLabel=""
                    pageRangeDisplayed={false}
                    pageCount={pageCount}
                    onPageChange={handleChange}
                    renderOnZeroPageCount={null}
                    containerClassName="trains-menu-paginations"
                    pageClassName="trains-menu-pagination"
                    pageLinkClassName="trains-menu-pagination-link"
                    previousClassName="trains-menu-pagination"
                    previousLinkClassName="trains-menu-pagination__previous-link"
                    nextClassName="trains-menu-pagination"
                    nextLinkClassName="trains-menu-pagination__next-link"
                    breakClassName="trains-menu-pagination"
                    breakLinkClassName="trains-menu-pagination__break-link"
                    activeClassName="trains-menu-pagination-link-active"
                />
            </div>
        </>
    )
}