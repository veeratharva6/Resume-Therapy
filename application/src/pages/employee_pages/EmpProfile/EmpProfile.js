import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { addBio } from "../../../bio";
import UserConnections from "../../user_pages/UserConnections";

import EditProfilePopup from "../../../component/popups/EditProfilePopup";
import UploadResumePopup from "../../../component/popups/UploadResumePopup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { Grid, Container, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import "./profile.css";

import ConnectionsWidget from "../../../component/widgets/ConnectionsWidget";
import ProfileWidget from "../../../component/widgets/ProfileWidget";
import MessagesWidget from "../../../component/widgets/MessagesWidget";
import CalendarWidget from "../../../component/widgets/CalendarWidget";
import UploadResumeWidget from "../../../component/widgets/UploadResumeWidget";

function EmpProfile() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [resumePopup, setResumePopup] = useState(false);

  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const imageListRef = ref(storage, `resumes/users/${user?.uid}/`);

  useEffect(() => {
    let isMounted = true;

    const fetchUserName = async () => {
      try {
        const q = query(
          collection(db, "users"),
          user?.uid ? where("uid", "==", user.uid) : undefined
        );

        const doc = await getDocs(q);
        const data = doc.docs[0]?.data();
        if (data && isMounted) {
          setName(data.name);
          setBio(data.bio || "");
          if (data.user) {
            setStatus("true");
            logout();
          } else {
            setStatus("false");
          }
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching user data");
      }
    };

    if (!loading && !user) {
      navigate("/");
    } else {
      fetchUserName();
    }

    return () => {
      isMounted = false;
    };
  }, [user, loading, navigate]);

  useEffect(() => {
    let isMounted = true;

    if (!user) return;

    listAll(imageListRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => {
            if (isMounted) setImage(url);
          })
        );

        Promise.all(promises).catch((err) => {
          console.error(err);
          alert("An error occurred while fetching resume data");
        });
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while fetching resume data");
      });

    return () => {
      isMounted = false;
    };
  }, [imageListRef, user]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleBioSubmit = async () => {
    if (!user) return;
    await addBio(user.uid, bio);
  };

  const handleWrapperBioTrigger = async () => {
    await handleBioSubmit();
    setButtonPopup(false);
  };

  const handleUploadImage = () => {
    if (!imageUpload) return;
    const imageRef = ref(storage, `resumes/users/${user?.uid}/resume`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref.fullPath))
          .then((url) => {
            setImage(url);
          })
          .catch((err) => {
            console.error(err);
            alert("An error occurred while fetching resume data");
          });
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while uploading resume data");
      });
  };

  const handleImageChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  return (
    <div>
      <div>
        <Container maxWidth="xl">
          <h1></h1>
          <h1></h1>
          <h1 className="h1">Hi, Welcome back!</h1>

          <h1> </h1>

          <Grid container spacing={4}>
            <Grid item xs={12} md={9} lg={9}>
              <ProfileWidget
                title={name}
                bio={bio}
                icon={"ant-design:apple-filled"}
                sx={{ boxShadow: 15 }}
              />{" "}
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <Button variant="outlined" onClick={() => setButtonPopup(true)}>
                Edit profile
              </Button>
            </Grid>
          </Grid>

          <h1> </h1>
          <h1> </h1>

          <Grid container spacing={6}>
            <Grid item xs={12} sm={3} md={3}>
              <UploadResumeWidget
                title="Upload Resume"
                total={714}
                sx={{ boxShadow: 5 }}
                onClick={() => setResumePopup(true)}
              />{" "}
              {/*insert number of connections here*/}
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <CalendarWidget
                title="Calendar"
                total={714}
                sx={{ boxShadow: 5 }}
                onClick={() => navigate("/reviewer-dash/book-appointment")}
              />{" "}
              {/*insert number of connections here*/}
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <MessagesWidget
                title="Messages"
                total={0}
                sx={{ boxShadow: 5 }}
                onClick={() => navigate("/reviewer-dash/messages")}
              />{" "}
              {/*insert number of connections here*/}
            </Grid>
          </Grid>
        </Container>
      </div>

      <UploadResumePopup trigger={resumePopup} setTrigger={setResumePopup}>
        <Button variant="contained" component="label">
          {" "}
          Choose File
          <input
            type="file"
            accept="image/*, application/pdf"
            onChange={handleImageChange}
            hidden
          />
        </Button>
        <Button
          variant="contained"
          compononet="label"
          onClick={() => handleUploadImage()}
        >
          Upload
        </Button>

        <div>
          {image && (
            <div className="resume">
              <img src={image} class="img" alt="Resume preview" />
            </div>
          )}
        </div>
      </UploadResumePopup>

      <EditProfilePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={5}
            value={bio}
            onChange={handleBioChange}
            placeholder="Write a brief description about yourself..."
          />

          <Button variant="outlined" onClick={() => handleWrapperBioTrigger()}>
            Update Bio
          </Button>
        </div>
      </EditProfilePopup>
    </div>
  );
}

export default EmpProfile;
