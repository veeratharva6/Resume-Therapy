import React from "react";
import { db } from "./firebase.js";
import {
  collection,
  query,
  getDocs,
  updateDoc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const addBio = async (userid, bio) => {
  try {
    console.log("SUBMITTED", bio);
    const connectionsRef = collection(db, "users");
    const q = query(connectionsRef, where("uid", "==", userid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.error("No matching user found");
      alert("An error occurred while updating bio.");
      return;
    }
    const doc = querySnapshot.docs[0];
    await updateDoc(doc.ref, { bio: bio });
  } catch (err) {
    console.error(err);
    alert("An error occurred while updating bio.");
  }
};

export { addBio };
