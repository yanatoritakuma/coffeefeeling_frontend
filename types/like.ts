import { Coffee, Likes } from "@prisma/client";

export type TLikesCoffee = {
  coffee: Coffee;
  user: {
    name: string;
    image: string;
    _count: {
      likes: number;
    };
  };
};

export type TLoginUserLikesCoffee = Likes & TLikesCoffee;
