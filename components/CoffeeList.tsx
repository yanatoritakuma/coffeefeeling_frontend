import { useQueryCoffees } from "../hooks/useQueryCoffees";
import { List, ThemeIcon, Loader } from "@mantine/core";
import { IconCircleDashed } from "@tabler/icons";
import { CoffeeItem } from "./CoffeeItem";

export const CoffeeList = () => {
  const { data: coffees, status } = useQueryCoffees();
  if (status === "loading") return <Loader my="lg" color="cyan" />;
  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {coffees?.map((coffee) => (
        <CoffeeItem
          key={coffee.id}
          id={coffee.id}
          name={coffee.name}
          image={coffee.image}
          category={coffee.category}
          bitter={coffee.bitter}
          acidity={coffee.acidity}
          amount={coffee.amount}
          price={coffee.price}
          place={coffee.place}
          likes={coffee.likes}
        />
      ))}
    </List>
  );
};
