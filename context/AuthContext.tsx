"use client";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "@/utils/firebase";

firebase.initializeApp(firebaseConfig);

interface AuthContextType {
  user: firebase.User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => setUser(user));
    return () => {
      unsubscribe();
    };
  }, []);

  const value: AuthContextType = { user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
