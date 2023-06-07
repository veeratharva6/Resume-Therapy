import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../../firebase";
import {
  acceptConnectionRequest,
  denyConnectionRequest,
} from "../../connections";
import { addBio } from "../../bio";
import "../user_pages/User-Dash.css";

function EmployeeDash() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [connections, setConnections] = useState([]);
  const [pendingConnections, setPendingConnections] = useState([]);
  const [bio, setBio] = useState("");
  const [editBioVisible, setEditBioVisible] = useState(false);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setBio(data.bio || "");
      if (data.employee) {
        setStatus("true");
      } else {
        setStatus("false");
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchConnections = async () => {
    try {
      const q = query(
        collection(db, "connections"),
        where("status", "==", "accepted")
      );
      const docs = await getDocs(q);
      const tempConnections = [];
      docs.forEach((doc) => {
        tempConnections.push([doc.data().username, doc.data().status]);
      });
      setConnections(tempConnections);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchPendingConnections = async () => {
    try {
      const q = query(
        collection(db, "connections"),
        where("status", "==", "pending")
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
      setPendingConnections(tempConnections);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      addBio(user.uid, bio);
      setEditBioVisible(false);
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating your profile");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="side-buttons">
          <h1>Resume Therapy</h1>
          <button className="sidebar__btn">Profile</button>
          <button className="dashboard__btn" onClick={fetchPendingConnections}>
            Pending Connections
          </button>
          <button className="dashboard__btn" onClick={fetchConnections}>
            Connections
          </button>
          <button className="sidebar__btn">Messages</button>
          <button className="sidebar__btn">Set Schedule</button>
          <button className="sidebar__btn">Virtual Call</button>
          <button className="dashboard__btn" onClick={logout}>
            {" "}
            Logout
          </button>
        </div>
      </div>

      <div className="topbar">
        <div className="dash-name">
          <h2>{name}'s Dashboard</h2>
        </div>
      </div>
      <div className="dashboard__container">
        <h2>Logged in as:</h2>
        <div>Name: {name}</div>
        <div>Email: {user?.email}</div>
        <div>UID: {user?.uid}</div>
        <div>Employee: {status}</div>
        <div>Bio: {bio}</div>
        <div>
          <button onClick={() => setEditBioVisible(!editBioVisible)}>
            Add or Edit Bio
          </button>
          {editBioVisible && (
            <form onSubmit={updateProfile}>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
              <button type="submit">Update</button>
            </form>
          )}
        </div>
        <h2>Pending Connections:</h2>
        <ul>
          {pendingConnections.map((connection) => (
            <li>
              * User: {connection[0]} ----- Status: {connection[3]} *
              <button
                onClick={() =>
                  acceptConnectionRequest(connection[1], connection[2])
                }
              >
                Accept
              </button>
              <button
                onClick={() =>
                  denyConnectionRequest(connection[1], connection[2])
                }
              >
                Deny
              </button>
            </li>
          ))}
        </ul>

        <h2>Connections:</h2>
        <ul>
          {connections.map((connection) => (
            <li>
              * User: {connection[0]} ----- Status: {connection[1]} *
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmployeeDash;
