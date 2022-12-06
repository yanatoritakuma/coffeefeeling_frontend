import { Coffee, Likes } from "@prisma/client";

type TLikesUser = {
  user: {
    name: string;
    image: string;
  };
};

export type TLikesCoffee = {
  coffee: Coffee & TLikesUser;
  user: {
    _count: {
      likes: number;
    };
  };
};

export type TLoginUserLikesCoffee = Likes & TLikesCoffee;
