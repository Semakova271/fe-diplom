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
        
        url: `/order`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
      
    }),
  }),
});

export const { useAddSubscriberMutation, useAddOrderMutation } = other;
