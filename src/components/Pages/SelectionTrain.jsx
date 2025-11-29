import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../Molecules/Banner";
import banner3 from "../../img/banner/banner3.png";
import MainForm from "../Forms/MainForm";
import SideBar from "../SideBar/SideBar";
import ProgressBar from "../Molecules/ProgressBar";
import Loader from "../Molecules/Loader";
import SearchControls from "../Main/SelectionTrain/SearchControls";
import PaginatedItems from "../Molecules/ReactPaginate";
import {
  setParameters,
  upDateCatalog,
} from "../../features/catalogTrainsSlice";
import Info from "../Molecules/Info";
import { useGetTrainsListQuery } from "../../features/myApi";
import "../Main/SelectionTrain/selectionTrain.css";
import {
  parsedUrlString,
  getUrlSearch,
  formattedFormData,
} from "../../utils/trainSelectionUtils";

const SelectionTrain = () => {
  const { parameters } = useSelector((state) => state.catalogTrains.searchData);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  let cardInfo = document.querySelector(".info_card");

  let upData = parsedUrlString(location.search);
  const formData = formattedFormData(upData);

  const {
    data = [],
    isLoading,

    isError,
  } = useGetTrainsListQuery(
    upData,
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (!data.length && cardInfo) cardInfo.classList.add("active");

    dispatch(
      upDateCatalog({
        data: {
          formData,
          trainsParameters: upData.parameters,
          parameters: upData.filter,
        },
      })
   
    );

   
    // eslint-disable-next-line
  }, [dispatch, location, cardInfo]);

  if (isError) console.log(isError, "error!!!");

  const onClickSorted = (event) => {
    event.preventDefault();
    let type;
    if (event.target.textContent === "времени") type = "date";
    if (event.target.textContent === "стоимости") type = "min_price";
    if (event.target.textContent === "длительности") type = "duration";

    dispatch(setParameters({ sort: { type, text: event.target.textContent } }));
    upData.filter.sort = type;
 
    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({
      search: `${urlSearchString}`,
    });
  };

  const onClickLimit = (event) => {
    event.preventDefault();

    dispatch(
      setParameters({ limit: Number(event.target.textContent), offset: 0 })
    );

    upData.filter.limit = Number(event.target.textContent);

    const urlSearchString = getUrlSearch(
      upData.optionsName,
      upData.formData,
      upData.filter,
      upData.parameters
    );

    navigate({
      search: `${urlSearchString}`,
    });
  };
  const onClickInfo = (type) => {
    if (type === "info") {
      document.querySelector(".info_card").classList.remove("active");
    } else {
      document.querySelector(".error_card").classList.remove("active");
    }
  };

  return (
    <React.Fragment>
      <Banner className="banner banner-tickets" banner={banner3} />
      <div className="selection-train_wrapper">
        <MainForm className="search-tickets_form" />
        <div className="selection-train_content">
          {isLoading && <Loader />}
          {isError && (
            <Info
              type={"error"}
              text={"Что-то пошло не так..."}
              onClick={() => onClickInfo("error")}
            />
          )}

          {!isLoading && <ProgressBar />}
          {!isLoading && <SideBar />}

          {!isLoading && !isError && data.items ? (
            <section className="trains-menu-wrap d-flex" id="trains-menu">
              <SearchControls
                amount={data.total_count}
                sort={parameters.sort}
                limit={Number(parameters.limit)}
                onClickSorted={onClickSorted}
                onClickLimit={onClickLimit}
              />
              {data.items.length > 0 && !isLoading ? (
                <PaginatedItems
                  itemsPerPage={parameters.limit}
                  items={[...Array(data.total_count).keys()]}
                  listItems={data.items}
                />
              ) : (
                <Info
                  type={"info"}
                  text={"По вашему запросу ничего не найдено"}
                  onClick={() => onClickInfo("info")}
                />
              )}
            </section>
          ) : null}
          {!isLoading && data.error && (
            <div className="error__wrapper">
              <Info
                type={"error"}
                text={data.error}
                onClick={() => onClickInfo("error")}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SelectionTrain;