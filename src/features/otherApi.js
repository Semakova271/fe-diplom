import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const other = createApi({
  reducerPath: "other",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://students.netoservices.ru/fe-diplom/",
    tagTypes: ["Order", "Subscriber"],
  }),
  endpoints: (builder) => ({
    addSubscriber: builder.mutation({
      queryFn: async (data) => {
        console.log(data, "data");
        const { email, ...body } = data;
        try {
          let response = await fetch(`subscribe?email=${email}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          console.log(response, "response");
        } catch {
          console.log("error");
        }
      },
    }),
    addOrder: builder.mutation({
      query: ({ body }) => ({
        //это работает
        url: `/order`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
      /*queryFn: async (data) => {// а это работает некорректно
        console.log(data, "data");
        const { ...body } = data;
        try {
          let response = await fetch(`/order`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body), // Добавление заказа
          });
          console.log(response, "response");
        } catch {
          console.log("error");
        }
      },
      invalidatesTags: ["Order"],*/
    }),
  }),
});

export const { useAddSubscriberMutation, useAddOrderMutation } = other;
/**    */

/**      */

/**     /* async onQueryStarted({body}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
            other.util.updateQueryData('getOrder',  (draft) => Object.assign(draft, body)))
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },*/
