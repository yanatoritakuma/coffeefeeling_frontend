export type AuthForm = {
  email: string;
  password: string;
  name: string;
  admin: boolean;
};

export type EditedCoffee = {
  id: number;
  name: string;
  image?: string | null;
  category?: string | null;
  bitter?: number | null;
  acidity?: number | null;
  price?: number | null;
  place?: string | null;
};

export type EditedUser = {
  name: string;
  image?: string | null;
};
