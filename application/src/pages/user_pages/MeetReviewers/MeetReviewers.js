import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { addConnection } from "../../../connections";

import { Grid, Container } from "@mui/material";

import TextField from "@mui/material/TextField";

import "./reviewers.css";
import ReviewerWidget from "../../../component/widgets/ReviewerWidget";

const MeetReviewers = () => {
  const [user, loading, error] = useAuthState(auth);
  const [reviewers, setReviewers] = useState([]);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);

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
      setfilteredConnection(tempReviewers);
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

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = reviewers;
    } else {
      newFilteredConnectons = reviewers.filter((item) =>
        item[0].includes(filterText)
      );
    }
    setfilteredConnection(newFilteredConnectons);
  }, [filterText, reviewers]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
  };

  const removeReviewer = (reviewee) => {
    const tempFilteredRev = reviewers.filter((item) => item[1] != reviewee);
    setReviewers(tempFilteredRev);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <h1> </h1>
        <h1> </h1>
        <h1 class="h1">Meet Resume Therapists</h1>

        <TextField
          id="standard-basic"
          label="Search Resume Therapists..."
          variant="standard"
          onChange={handleFilterText}
          fullWidth
        />
        <h1> </h1>
        <Grid container spacing={4}>
          {filteredConnection.map((reviewer) => (
            <Grid item xs={12} md={6} lg={4}>
              <ReviewerWidget
                title={reviewer[0]}
                bio={reviewer[2]}
                sx={{ boxShadow: 5 }}
                button={addConnection}
                userid={user.uid}
                reviewerid={reviewer[1]}
                removeFunc={removeReviewer}
              />{" "}
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MeetReviewers;
