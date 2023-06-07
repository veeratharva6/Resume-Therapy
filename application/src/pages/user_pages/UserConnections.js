import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const UserConnections = () => {
  const [user, loading, error] = useAuthState(auth);
  const [connections, setConnections] = useState([]);
  const [reviewerBios, setReviewerBios] = useState([]);

  const fetchConnections = async () => {
    try {
      const q = query(
        collection(db, "connections"),
        where("userid", "==", user?.uid)
      );
      const docs = await getDocs(q);
      const tempConnections = [];
      const tempReviewerBios = [];

      for (const doc of docs.docs) {
        const reviewerUid = doc.data().reviewerid;
        const reviewerData = (
          await getDocs(
            query(collection(db, "users"), where("uid", "==", reviewerUid))
          )
        ).docs[0].data();

        tempConnections.push([doc.data().reviewername, doc.data().status]);
        tempReviewerBios.push(reviewerData.bio || "");
      }

      setConnections(tempConnections);
      setReviewerBios(tempReviewerBios);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchConnections();
    }
  }, [user, loading]);

  return (
    <div>
      <h2>User Connections</h2>
      <ul>
        {connections.map((connection, index) => (
          <Card>
            <li>
              * Reviewer: {connection[0]} ----- Status: {connection[1]} *
              <br /> Bio: {reviewerBios[index]}
            </li>
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default UserConnections;
