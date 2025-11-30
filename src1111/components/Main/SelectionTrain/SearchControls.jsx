import React from "react";

/* ===== SEARCH CONTROLS COMPONENT ===== */
const SearchControls = ({ amount, sort, limit, onClickSorted, onClickLimit }) => {
  const hasResults = amount > 0;

  const sortOptions = [
    { label: "времени", value: "time" },
    { label: "стоимости", value: "price" },
    { label: "длительности", value: "duration" }
  ];

  const limitOptions = [5, 10, 20];

  return (
    <div className="search-controls__wrap d-flex">
      <div className="amount_block">
        <span className="amount-text">Найдено </span>
        <span className="amount-text">{amount}</span>
      </div>
      
      {hasResults && (
        <div className="search-wrap-util">
          {/* Sort Dropdown */}
          <div className="dropdown dropend">
            <button
              className="btn dropdown-toggle button-sorted-trains p-0"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              сортировать по:
            </button>
            <ul className="dropdown-menu dropdown-sorted-trains" aria-labelledby="dropdownMenuButton1">
              {sortOptions.map((option, index) => (
                <li key={option.value}>
                  <button
                    className="dropdown-item sorted-trains-item"
                    onClick={() => onClickSorted(option.value)}
                  >
                    {option.label}
                  </button>
                  {index < sortOptions.length - 1 && <div className="divider-sorted-trains-item" />}
                </li>
              ))}
            </ul>
          </div>
          
          <span className="sorted-text">{sort.text}</span>

          {/* Items Per Page Controls */}
          <div className="search-controls-puncts__wrap">
            <span className="puncts-list-text">показывать по: </span>
            <ul className="search-controls-puncts-list d-flex">
              {limitOptions.map((option) => (
                <li key={option} className="puncts-list-item">
                  <button
                    className={`btn puncts-list__btn ${limit === option ? "active-limit" : ""}`}
                    onClick={() => onClickLimit(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchControls;