import React, { useState, useRef } from "react";
import "./SearchControls.css";

const SearchControls = ({
  amount,
  sort,
  limit,
  onClickSorted,
  onClickLimit,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "time", label: "времени" },
    { value: "price", label: "стоимости" },
    { value: "duration", label: "длительности" },
  ];

  const handleSortSelect = (value, label) => {
    onClickSorted(value);
    setDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleItemClick = (value, label, e) => {
    e.stopPropagation(); // Очень важно - предотвращаем всплытие
    handleSortSelect(value, label);
  };

  return (
    <React.Fragment>
      <div className="search-controls__wrap d-flex">
        <div className="amount_block">
          <span className="amount-text">{"Найдено: "} </span>
          <span className="amount-text">{amount}</span>
        </div>
        {amount > 0 ? (
          <div className="search-wrap-util">
            <div className="sort-dropdown" ref={dropdownRef}>
              <button
                className="sort-dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
                aria-expanded={dropdownOpen}
              >
                <span className="sort-dropdown-label">Сортировать по:</span>
                <span className="sort-dropdown-arrow">
                  {dropdownOpen ? "▲" : "▼"}
                </span>
              </button>
              
              {dropdownOpen && (
                <div className="sort-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`sort-dropdown-item ${
                        sort.type === option.value ? "active" : ""
                      }`}
                      onClick={(e) => handleItemClick(option.value, option.label, e)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="selected-sort">
              <span className="selected-sort-text">
                {sortOptions.find(opt => opt.value === sort.type)?.label || "времени"}
              </span>
            </div>

            <div className="search-controls-puncts__wrap">
              <span className="puncts-list-text">показывать по: </span>
              <ul className="search-controls-puncts-list d-flex">
                <li className="puncts-list-item">
                  <button
                    className={
                      limit === 5
                        ? "btn puncts-list__btn active-limit"
                        : "btn puncts-list__btn"
                    }
                    onClick={() => onClickLimit(5)}
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
                    onClick={() => onClickLimit(10)}
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
                    onClick={() => onClickLimit(20)}
                  >
                    20
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SearchControls;