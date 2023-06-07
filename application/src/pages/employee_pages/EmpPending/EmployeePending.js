import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import {
  acceptConnectionRequest,
  denyConnectionRequest,
} from "../../../connections";

import { Grid, Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import EmpPendingWidget from "../../../component/widgets/EmpPendingWidget";
import Button from "@mui/material/Button";

const EmployeePendingConnections = () => {
  const [user] = useAuthState(auth);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);

  const fetchPendingConnections = async () => {
    const q = query(
      collection(db, "connections"),
      where("status", "==", "pending"),
      where("reviewerid", "==", user.uid)
    );
    const docs = await getDocs(q);
    const tempConnections = [];
    docs.forEach((doc) => {
      tempConnections.push([
        doc.data().username,
        doc.data().userid,
        doc.data().reviewerid,
        doc.data().status,
      ]);
    });
    setfilteredConnection(tempConnections);
    setPendingConnections(tempConnections);
  };

  useEffect(() => {
    if (user) {
      //console.log("It's been called son")
      fetchPendingConnections();
    }
  }, [user]);

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = pendingConnections;
    } else {
      newFilteredConnectons = pendingConnections.filter((item) =>
        item[0].includes(filterText)
      );
    }
    //console.log(newFilteredConnectons);
    setfilteredConnection(newFilteredConnectons);
    console.log("TEST");
  }, [filterText, pendingConnections]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
    //Change connections list here
  };

  //connection1 is user that we want to delete
  const removeRequest = (reviewee) => {
    const tempFilteredRev = pendingConnections.filter(
      (item) => item[1] != reviewee
    );
    setPendingConnections(tempFilteredRev);
  };

  const handleAcceptConnections = (user, reviewer) => {
    acceptConnectionRequest(user, reviewer);
    removeRequest(user);
  };

  const handleDeclineConnections = (user, reviewer) => {
    denyConnectionRequest(user, reviewer);
    removeRequest(user);
  };

  return (
    <div>
      <Container maxWidth="xl" className="available">
        <h1></h1>
        <h1></h1>
        <h1 className="h1">Pending Connections...</h1>

        <TextField
          id="standard-basic"
          label="Search Pending Connection..."
          value={filterText}
          onChange={handleFilterText}
          variant="standard"
          fullWidth
        />
        <h1> </h1>
        <Grid container spacing={4}>
          {filteredConnection.map((connection) => (
            <Grid item xs={12} md={6} lg={6}>
              <li key={`${connection[1]}_${connection[2]}`}>
                <h1 class="h1"> User: {connection[0]} </h1>
                <h3> Status: {connection[3]} </h3>

                <Button
                  variant="outlined"
                  onClick={() =>
                    handleAcceptConnections(connection[1], connection[2])
                  }
                >
                  {" "}
                  Accept{" "}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleDeclineConnections(connection[1], connection[2])
                  }
                >
                  {" "}
                  Deny{" "}
                </Button>
              </li>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default EmployeePendingConnections;
