"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "vm";

export interface UserContextProps {
  user: UserContextType;
  setUser: Dispatch<SetStateAction<UserContextType>>;
}

export type UserContextType = {
  bio?: string;
  displayName: string;
  email?: string;
  photoURL: string;
  providerId?: string;
  username: string;
  uid: string;
  website?: string;
};

const defaultState = {
  user: {
    bio: "",
    displayName: "",
    email: "",
    photoURL: "",
    providerId: "",
    username: "",
    uid: "",
    website: "",
  },
  setUser: (user: UserContextType) => {},
} as UserContextProps;

export const UserContext = createContext(defaultState);

type UserProviderProps = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextType>({
    bio: "",
    displayName: "",
    email: "",
    photoURL: "",
    providerId: "",
    username: "",
    uid: "",
    website: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
