import React, { createContext } from "react";
import { useQueryUser } from "../hooks/useQueryUser";

export const UserContext = createContext({});

export const Userprovider = (props: any) => {
  const { children } = props;
  const { data: user } = useQueryUser();

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
