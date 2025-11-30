import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import queryString from "query-string";
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://students.netoservices.ru/fe-diplom/routes/",
  }),
  endpoints: (builder) => ({
    getCityesName: builder.query({
      query: (arg) => `cities?name=${arg}`,
      providesTags: (result, error, arg) => [
        { type: "dataSearchCityes", name: arg },
      ],
    }),
    getTrainsList: builder.query({
      query: (arg) => {
      console.log(arg, "trainParams");

        const requestObj = {
          ...arg.search,
          ...arg.formData,
          ...arg.parameters,
          ...arg.filter,
        };
console.log(requestObj,'requestObj')
        for (let key in requestObj) {
          if (requestObj[key] === false) requestObj[key] = undefined;
        }

        const params = queryString.stringify(requestObj, {
          skipNull: true,
          skipEmptyString: true,
        });

        return `?${params}`;
      },
      providesTags: (result, error, arg) => [
        { type: "dataSearchTrains", list: arg },
      ],
    }),
    getTrainId: builder.query({
      query: (arg) => `${arg}/seats`,
    }),
    getLastTickets: builder.query({
      query: () => `last`,
    }),
  }),
});

export const {
  useGetCityesNameQuery,
  useGetTrainsListQuery,
  useGetTrainIdQuery,
  useGetLastTicketsQuery,
} = api;
/* providesTags: (result, error, arg) => [{type: "dataSearchTrains", data: arg}],*/
/**    */
