import { useRouter } from "next/router";
import React from "react";
import { useQueryCoffeeSearch } from "../../hooks/useQueryCoffeeSearch";

const SearchResults = () => {
  const router = useRouter();

  const coffeeSearchReq = {
    name: String(router.query.name),
  };
  console.log(router.query.name);

  const { status, data, refetch } = useQueryCoffeeSearch(coffeeSearchReq);
  return <div>SearchResults</div>;
};

export default SearchResults;
