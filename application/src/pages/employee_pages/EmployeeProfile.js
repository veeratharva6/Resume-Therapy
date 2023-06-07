import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { addBio } from "../../bio";

const EmployeeProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [editBioVisible, setEditBioVisible] = useState(false);

  const fetchEmployeeData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      if (!doc.empty) {
        const data = doc.docs[0].data();
        setName(data.name);
        setEmail(data.email);
        setBio(data.bio || "");
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
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
    if (!user) return;

    fetchEmployeeData();
  }, [user, loading]);

  return (
    <>
      <h1>Employee Profile</h1>
      <div>
        <h3>Name: {name}</h3>
        <h3>Email: {email}</h3>
        <h3>Bio: {bio}</h3>
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
    </>
  );
};

export default EmployeeProfile;
