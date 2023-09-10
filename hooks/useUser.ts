"use client";
import { db } from "@/utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const useUser = async (userId: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef);
  const data = await getDocs(q);
};
