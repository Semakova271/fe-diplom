import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import TrainsMenu from "../Main/SelectionTrain/TrainsMenu/TrainsMenu";
import { setParameters } from "../../features/catalogTrainsSlice";
import { parsedUrlString, getUrlSearch } from "../../utils/trainSelectionUtils";

const PaginatedItems = ({ itemsPerPage, items, listItems }) => {
  const [currentItems, setCurrentItems] = useState(listItems);
  const [pageCount, setPageCount] = useState(0);
  const itemOffset = useSelector(
    (state) => state.catalogTrains.searchData.parameters.offset
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let upData = parsedUrlString(location.search);
  let newOffset;

  useEffect(() => {
    // Fetch items from another resources.
    // const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(listItems);

    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [location, items, listItems, itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    newOffset = (event.selected * itemsPerPage) % items.length;

    dispatch(setParameters({ offset: newOffset }));
    upData.filter.offset = newOffset;
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({ search: `${urlSearchString}` });
  };

  return (
    <>
      <TrainsMenu currentItems={currentItems} />
      <ReactPaginate
        nextLabel=""
        onPageChange={handlePageClick}
        pageRangeDisplayed={false}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel=""
        pageClassName="trains-menu-pagination__item"
        pageLinkClassName="trains-menu-pagination__item-link"
        previousClassName="trains-menu-pagination__item"
        previousLinkClassName="trains-menu-pagination__previus-item-link"
        nextClassName="trains-menu-pagination__item"
        nextLinkClassName="trains-menu-pagination__next-item-link"
        breakLabel="..."
        breakClassName="trains-menu-pagination__item"
        breakLinkClassName="trains-menu-pagination__item-link"
        containerClassName="selection-trains-pagination"
        activeClassName="trains-menu-pagination_active-link"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default PaginatedItems;