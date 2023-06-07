import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { addConnection } from "../../connections";

const MeetReviewers = () => {
  const [user, loading, error] = useAuthState(auth);
  const [reviewers, setReviewers] = useState([]);

  const fetchReviewers = async () => {
    try {
      const q = query(collection(db, "users"), where("employee", "==", true));
      const q2 = query(
        collection(db, "connections"),
        where("userid", "==", user?.uid)
      );
      const docs = await getDocs(q);
      const docs2 = await getDocs(q2);

      const tempConnections = [];
      docs2.forEach((doc) => {
        tempConnections.push(doc.data().reviewerid);
      });

      const tempReviewers = [];
      docs.forEach((doc) => {
        const reviewerUid = doc.data().uid;
        if (!tempConnections.includes(reviewerUid)) {
          tempReviewers.push([
            doc.data().name,
            reviewerUid,
            doc.data().bio || "",
          ]);
        }
      });
      setReviewers(tempReviewers);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchReviewers();
    }
  }, [user, loading]);

  return (
    <div>
      <h2>Meet Resume Therapists</h2>
      <ul>
        {reviewers.map((reviewer) => (
          <li>
            * {reviewer[0]} *
            <br />
            Bio: {reviewer[2]}
            <br />
            <button
              onClick={() => {
                addConnection(user.uid, reviewer[1]);
              }}
            >
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeetReviewers;
