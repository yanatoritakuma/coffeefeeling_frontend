import { Coffee, Likes } from "@prisma/client";

export type TLikesCoffee = {
  coffee: Coffee;
  user: {
    name: string;
    image: string;
  };
};

export type TLoginUserLikesCoffee = Likes & TLikesCoffee;
