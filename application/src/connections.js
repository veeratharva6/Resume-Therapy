import React from "react";
import { db } from "./firebase.js";
import { createConversations } from "./back-end/Message"
import {
  collection,
  query,
  getDocs,
  updateDoc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";


const addConnection = async (userid, reviewerid) => {
  try {
    //Check if connections already exists
    const alreadyExists = query(collection(db, "connections"), where("userid", "==", userid), where("reviewerid", "==", reviewerid));

    const existsDoc = await getDocs(alreadyExists);
    
    //console.log(userid);
    //console.log(reviewerid);
    console.log(existsDoc.docs);
    if(existsDoc.docs.length > 0)
    {
        console.log("Connection already exists!");
        return;
    }

    const q = query(collection(db, "users"), where("uid", "==", userid));
    const docs = await getDocs(q);
    const username = docs.docs[0].data().name;
    
    
    
    const q2 = query(collection(db, "users"), where("uid", "==", reviewerid));
    const docs2 = await getDocs(q2);
    const reviewername = docs2.docs[0].data().name;
    await addDoc(collection(db, "connections"), {
      username: username,
      userid: userid,
      reviewername: reviewername,
      reviewerid: reviewerid,
      status: "pending",
    });
  } catch (err) {
    console.error(err);
    alert("An error occured while creating connection");
  }
};

const acceptConnectionRequest = async (userid, reviewerid) => {
  try {
    const connectionsRef = collection(db, "connections");
    const q = query(
      connectionsRef,
      where("userid", "==", userid),
      where("reviewerid", "==", reviewerid)
    );
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    await updateDoc(doc.ref, { status: "accepted" });
    
    console.log("conversation created!");
    //A conversation will be automatically made between userid, and reviewerid
    createConversations(userid, reviewerid);

  } catch (err) {
    console.error(err);
    alert("An error occurred while accepting connection request");
  }
};

const denyConnectionRequest = async (userid, reviewerid) => {
  console.log("userid: " + userid);
  console.log("reviewerid: " + reviewerid);
  try {
    const connectionsRef = collection(db, "connections");
    const q = query(
      connectionsRef,
      where("userid", "==", userid),
      where("reviewerid", "==", reviewerid)
    );
    const querySnapshot = await getDocs(q);
    const doc = querySnapshot.docs[0];
    await deleteDoc(doc.ref);
  } catch (err) {
    console.error(err);
    alert("An error occurred while denying connection request");
  }
};

export { addConnection, acceptConnectionRequest, denyConnectionRequest };
