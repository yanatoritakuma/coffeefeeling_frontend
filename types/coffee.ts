import { Coffee } from "@prisma/client";

type TUser = {
  user_name: string;
  user_image: string;
};

export type TCoffee = Coffee & TUser;

export type TBestCoffee = {
  acidityBest: TCoffee[];
  bitterBest: TCoffee[];
};

export type TUserId = {
  userId: number;
};

type TUserCoffee = {
  user: {
    name: string;
    image: string;
    _count: {
      coffee: number;
    };
  };
  likes: TUserId[];
};

export type TCoffeeUser = Coffee & TUserCoffee;
