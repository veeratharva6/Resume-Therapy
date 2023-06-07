import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const EmployeeConnections = () => {
  const [user] = useAuthState(auth);
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    const q = query(
      collection(db, "connections"),
      where("status", "==", "accepted"),
      where("reviewerid", "==", user.uid)
    );
    const docs = await getDocs(q);
    const tempConnections = [];
    docs.forEach((doc) => {
      tempConnections.push([doc.data().username, doc.data().status]);
    });
    setConnections(tempConnections);
  };

  useEffect(() => {
    if (user) {
      fetchConnections();
    }
  }, [user]);

  return (
    <div>
      <h2>Connections</h2>
      <ul>
        {connections.map((connection) => (
          <li key={connection[0]}>
            User: {connection[0]} - Status: {connection[1]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeConnections;
