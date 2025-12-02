import React from "react";

const SearchControls = ({
  amount,
  sort,
  limit,
  onClickSorted,
  onClickLimit,
}) => {

  return (
    <React.Fragment>
      <div className="search-controls__wrap d-flex">
        <div className="amount_block">
          <span className="amount-text">{"Найдено "} </span>
          <span className="amount-text">{amount}</span>
        </div>
       {amount>0 ? <div className="search-wrap-util">
          <div className="dropdown  dropend">
            <button
              className="btn  dropdown-toggle button-sorted-trains p-0"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              сортировать по:
            </button>
            <ul
              className="dropdown-menu dropdown-sorted-trains"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <button
                  className="dropdown-item sorted-trains-item"
                  onClick={onClickSorted}
                >
                  времени
                </button>
                <div className="divider-sorted-trains-item"></div>
              </li>
              <li>
                <button
                  className="dropdown-item sorted-trains-item"
                  onClick={onClickSorted}
                >
                  стоимости
                </button>
                <div className="divider-sorted-trains-item"></div>
              </li>
              <li>
                <button
                  className="dropdown-item sorted-trains-item"
                  onClick={onClickSorted}
                >
                  длительности
                </button>
              </li>
            </ul>
          </div>
          <span className="sorted-text">{sort.text} </span>

          <div className="search-controls-puncts__wrap">
            <span className="puncts-list-text">показывать по: </span>
            <ul className=" search-controls-puncts-list d-flex">
              <li className="puncts-list-item">
                <button
                  className={
                    limit === 5
                      ? "btn puncts-list__btn active-limit"
                      : "btn puncts-list__btn"
                  }
                  onClick={onClickLimit}
                >
                  5
                </button>
              </li>
              <li className="puncts-list-item">
                <button
                  className={
                    limit === 10
                      ? "btn puncts-list__btn active-limit"
                      : "btn puncts-list__btn"
                  }
                  onClick={onClickLimit}
                >
                  10
                </button>
              </li>
              <li className="puncts-list-item">
                <button
                  className={
                    limit === 20
                      ? "btn puncts-list__btn active-limit"
                      : "btn puncts-list__btn"
                  }
                  onClick={onClickLimit}
                >
                  20
                </button>
              </li>
            </ul>
          </div>
        </div>:null}
      </div>
    </React.Fragment>
  );
};

export default SearchControls;