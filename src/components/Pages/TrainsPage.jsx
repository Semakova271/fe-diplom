import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Banner from "../common/Banner.jsx";
import MainForm from "../layout/Home/MainForm.jsx";
import SideBar from "../layout/SideBar/SideBar.jsx";
import ProgressBar from "../common/ProgressBar.jsx";
import SearchFilters from "../modules/SelectionTrain/SearchFilters.jsx";
import TrainsMenu from "../modules/SelectionTrain/TrainsMenu.jsx";
import Loader from "../common/Loader.jsx";
import Info from "../common/Info.jsx";
import banner3 from "../../img/banner3.png";
import "../modules/SelectionTrain/TrainSearch.css";

import PaginatedItems from "../common/ReactPaginate.jsx";

import {
  setParameters,
  upDateCatalog,
} from "../../features/catalogTrainsSlice.js";
import {
  parsedUrlString,
  getUrlSearch,
  formattedFormData,
} from "../../utils/trainSelectionUtils.js";
import { useGetTrainsListQuery } from "../../features/myApi.js";

const TrainsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Добавляем лог для отладки
  console.log('TrainsPage загружен:', {
    pathname: location.pathname,
    search: location.search,
    полныйURL: window.location.href
  });

  // Парсим параметры из URL
  let upData = {};
  let formData = {};
  
  try {
    upData = parsedUrlString(location.search);
    formData = formattedFormData(upData);
    console.log('Данные из URL:', { upData, formData });
  } catch (error) {
    console.error('Ошибка парсинга URL:', error);
  }

  // Запрашиваем список поездов только если есть параметры в URL
  const {
    data = {},
    isLoading,
    isError,
  } = useGetTrainsListQuery(upData, { 
    refetchOnMountOrArgChange: true,
    skip: !location.search // Пропускаем запрос если нет параметров
  });

  useEffect(() => {
    // Обновляем состояние Redux при изменении параметров
    if (location.search) {
      console.log('Обновляем Redux с данными из URL:', { formData, upData });
      dispatch(
        upDateCatalog({
          data: {
            formData,
            trainsParameters: upData.parameters || {},
            parameters: upData.filter || {},
          },
        })
      );
    }
  }, [dispatch, location, formData, upData]);

  // Обработчики для сортировки
  const onClickSorted = (event) => {
    event.preventDefault();
    let type;
    if (event.target.textContent === "времени") type = "date";
    if (event.target.textContent === "стоимости") type = "min_price";
    if (event.target.textContent === "длительности") type = "duration";

    dispatch(setParameters({ sort: { type, text: event.target.textContent } }));
    
    if (upData.filter) {
      upData.filter.sort = type;
    }

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

  // Обработчик для количества отображаемых элементов
  const onClickLimit = (event) => {
    event.preventDefault();
    dispatch(
      setParameters({ limit: Number(event.target.textContent), offset: 0 })
    );
    
    if (upData.filter) {
      upData.filter.limit = Number(event.target.textContent);
    }

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

  // Закрытие информационных сообщений
  const onClickInfo = (type) => {
    if (type === "info") {
      document.querySelector(".info_card")?.classList.remove("active");
    } else {
      document.querySelector(".error_card")?.classList.remove("active");
    }
  };

  // Если нет параметров поиска в URL, показываем только форму
  if (!location.search) {
    console.log('Нет параметров поиска, показываем только форму');
    return (
      <React.Fragment>
        <Banner className="banner banner-tickets" banner={banner3} />
        <div className="selection-train_wrapper">
          <MainForm className="search-tickets_form" />
          <div className="selection-train_content">
            <Info
              type={"info"}
              text={"Введите параметры поиска для просмотра поездов"}
              onClick={() => onClickInfo("info")}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  console.log('Есть параметры поиска, показываем результаты:', data);

  return (
    <React.Fragment>
      {/* Баннер */}
      <Banner className="banner banner-tickets" banner={banner3} />
      
      {/* Основной контейнер */}
      <div className="selection-train_wrapper">
        {/* Форма поиска (сверху) */}
        <MainForm className="search-tickets_form" />
        
        <div className="selection-train_content">
          {/* Загрузка */}
          {isLoading && <Loader />}
          
          {/* Ошибка */}
          {isError && (
            <Info
              type={"error"}
              text={"Что-то пошло не так..."}
              onClick={() => onClickInfo("error")}
            />
          )}

          {/* Прогресс бар */}
          {!isLoading && <ProgressBar />}
          
          {/* Боковая панель с фильтрами */}
          {!isLoading && <SideBar />}

          {/* Основной контент */}
          {!isLoading && !isError && data.items ? (
            <section className="trains-menu-wrap d-flex" id="trains-menu">
              {/* Панель управления поиском */}
              <SearchFilters
                amount={data.total_count}
                sort={data.sort || {}}
                limit={data.limit || 5}
                onClickSorted={onClickSorted}
                onClickLimit={onClickLimit}
              />
              
              {/* Список поездов */}
              {data.items.length > 0 ? (
                <PaginatedItems
                  itemsPerPage={data.limit || 5}
                  items={[...Array(data.total_count).keys()]}
                  listItems={data.items}
                  Component={TrainsMenu}
                />
              ) : (
                <Info
                  type={"info"}
                  text={"По вашему запросу ничего не найдено"}
                  onClick={() => onClickInfo("info")}
                />
              )}
            </section>
          ) : (
            // Если данные загружены, но items пустые
            !isLoading && !isError && (
              <Info
                type={"info"}
                text={"Загрузка данных..."}
                onClick={() => onClickInfo("info")}
              />
            )
          )}

          {/* Сообщение об ошибке от API */}
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

export default TrainsPage;