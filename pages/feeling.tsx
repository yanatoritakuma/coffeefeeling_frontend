import React from "react";
import { useQueryCoffees } from "../hooks/useQueryCoffees";
import { Loader } from "@mantine/core";

const Feeling = () => {
  const { data: coffees, status } = useQueryCoffees();
  if (status === "loading") return <Loader my="lg" color="cyan" />;

  console.log("coffees", coffees);

  return (
    <div>
      feeling
      {coffees?.map((coffee) => (
        <div key={coffee.id}>
          <h2>{coffee.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Feeling;
