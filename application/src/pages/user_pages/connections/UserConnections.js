import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-chat-elements/dist/main.css";
import { auth } from "../../../firebase";

import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { db, storage } from "../../../firebase";

import "./connections.css";
import { Grid, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import ConnectionsWidget from "../../../component/widgets/ConnectionsWidget";
import ViewConnectionPopup from "../../../component/popups/ViewConnectionPopup";

const UserConnections = () => {
  const [user, loading, error] = useAuthState(auth);
  const [connections, setConnections] = useState([]);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [activeConnection, setActiveConnection] = useState(null);
  const [bio, setBio] = useState(null);
  const [image, setImage] = useState("");

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
        tempConnections.push([
          doc.data().reviewername,
          `Status: ${doc.data().status}`,
          doc.data().reviewerid,
          reviewerData.bio || "",
        ]);
      }

      setConnections(tempConnections);
      setfilteredConnection(tempConnections);
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

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = connections;
    } else {
      newFilteredConnectons = connections.filter((item) =>
        item[0].includes(filterText)
      );
    }
    setfilteredConnection(newFilteredConnectons);
  }, [filterText]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
  };

  useEffect(() => {
    if (activeConnection == null) {
      setImage("");
      setBio("");
      return;
    }
    let imageListRef = ref(storage, `resumes/users/${activeConnection[2]}/`);

    let isMounted = true;

    listAll(imageListRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => {
            if (isMounted) setImage(url);
            console.log(image);
          })
        );

        Promise.all(promises).catch((err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    setBio(`Bio: ${activeConnection[3]}`);

    return () => {
      isMounted = false;
    };
  }, [activeConnection]);

  const handlePopupWindow = (connection) => {
    setActiveConnection(connection);
    setButtonPopup(true);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <h1> </h1>
        <h1> </h1>
        <h1> </h1>
        <h1> </h1>
        <h1 class="h1">Your Connections</h1>

        <TextField
          id="standard-basic"
          label="Search Connection..."
          variant="standard"
          onChange={handleFilterText}
          fullWidth
        />
        <h1> </h1>
        <Grid container spacing={4}>
          {filteredConnection.map((connection) => (
            <Grid item xs={12} md={6} lg={4}>
              <ConnectionsWidget
                title={connection[0]}
                bio={connection[1]}
                sx={{ boxShadow: 5 }}
                color={
                  connection[1] == "Status: pending" ? "warning" : "primary"
                }
                popUpHandle={handlePopupWindow}
                connecto={connection}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ViewConnectionPopup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        setActiveTrigger={setActiveConnection}
      >
        <div>
          {image ? (
            <div className="resume">
              <img src={image} class="img" alt="Resume preview" />

              {bio == "Bio: " ? (
                <div className="resume-div">
                  <h2>This user has not currently set up a bio!</h2>
                </div>
              ) : (
                <div className="resume-div">
                  <h2>{bio}</h2>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1 className="h1">This user did not upload a resume!</h1>

              {bio == "Bio: " ? (
                <div className="resume-div">
                  <h2>This user has not currently set up a bio!</h2>
                </div>
              ) : (
                <div className="resume-div">
                  <h2>{bio}</h2>
                </div>
              )}
            </div>
          )}
        </div>
      </ViewConnectionPopup>
    </div>
  );
};

export default UserConnections;
