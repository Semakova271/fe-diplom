import { useEffect, useState } from "react";

export const SearchControl = ({totalCount, sort, setSort, form, setForm}) => {
    const [showList, setShowList] = useState(false);
    const [limit, setLimit] = useState(5)

    const onClickSort = (event) => {
        event.preventDefault();
        setSort(event.target.textContent);
        
    if (event.target.textContent === 'времени') {
        setForm((prevForm) => ({...prevForm, sort: 'date'}))
    }
    if (event.target.textContent === 'стоимости') {
        setForm((prevForm) => ({...prevForm, sort: 'price'}))
    }
    if (event.target.textContent === 'длительности') {
        setForm((prevForm) => ({...prevForm, sort: 'duration'}))
    }
        setShowList(!showList);
    }

    useEffect(() => {
        setForm((prevForm) => ({...prevForm, limit: limit}))
    }, [limit])

    return (
        <>
            <div className="search-control">
                <div className="amount-block">
                    <span className="amount">найдено {totalCount}</span>
                </div>
                <div className="dropdown">
                    <button className="btn dropdown-toggle button-sort"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => setShowList(!showList)}>
                        сортировать по:
                    </button>
                    <ul className={showList ? "dropdown-menu dropdown-sorted show" : "dropdown-menu dropdown-sorted"} aria-labelledby="dropdownMenuButton">
                        <li>
                            <a className="dropdown-item sort-item" href="#" onClick={onClickSort}>времени</a>
                        </li>
                        <li><hr className='dropdown-divender'/></li>
                        <li>
                            <a className="dropdown-item sort-item" href="#" onClick={onClickSort}>стоимости</a>
                        </li>
                        <li><hr className='dropdown-divender'/></li>
                        <li>
                            <a className="dropdown-item sort-item" href="#" onClick={onClickSort}>длительности</a>
                        </li>
                    </ul>
                </div>
                <span className="sort-text">{sort}</span>
                <div className="search-control-amount">
                    <span>показать по:</span>
                    <ul className="search-control-list">
                        <li className="search-control-item">
                            <button className={limit === 5 ? "btn btn-search-control active" : "btn btn-search-control"} onClick={() => setLimit(5)}>5</button>
                        </li>
                        <li className="search-control-item">
                            <button className={limit === 10 ? "btn btn-search-control active" : "btn btn-search-control"} onClick={() => setLimit(10)}>10</button>
                        </li>
                        <li className="search-control-item">
                            <button className={limit === 20 ? "btn btn-search-control active" : "btn btn-search-control"} onClick={() => setLimit(20)}>20</button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}