import React, { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { Coffee } from "@prisma/client";

export const useQueryFeelingCoffees = () => {
  const [feelingData, setFeelingData] = useState([{}]);
  const getFeelingCoffees = async (coffee: AxiosRequestConfig<any>) => {
    console.log("coffee", coffee.data.coffee);
    const data = await axios.get<Coffee[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/coffee/${coffee.data.coffee}`
    );

    return setFeelingData(data.data);
  };

  return { getFeelingCoffees, feelingData };
};
