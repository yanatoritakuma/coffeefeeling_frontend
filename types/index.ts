export type AuthForm = {
  email: string;
  password: string;
};

export type EditedCoffee = {
  id: number;
  name: string;
  image?: string | null;
  category?: string | null;
  bitter?: number | null;
  acidity?: number | null;
  amount?: number | null;
  price?: number | null;
  place?: string | null;
};
