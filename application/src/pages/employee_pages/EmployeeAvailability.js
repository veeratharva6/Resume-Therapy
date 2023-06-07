import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import {
  fetchAvailability,
  addAvailability,
  updateAvailability,
  removeAvailability,
} from "../../availability.js";

function EmployeeAvailability() {
  const [user] = useAuthState(auth);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);

      if (!doc.empty) {
        const data = doc.docs[0].data();
        setName(data.name);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAvailability(user.uid).then(setAvailability);
      fetchName();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !start || !end) return;

    const newSlot = {
      name,
      date,
      start,
      end,
      booked: false,
      bookedBy: null,
      bookedByName: null,
    };

    if (editing) {
      const updatedAvailability = await updateAvailability(
        user.uid,
        editingIndex,
        newSlot
      );
      setAvailability(updatedAvailability);
      setEditing(false);
      setEditingIndex(null);
    } else {
      const updatedAvailability = await addAvailability(user.uid, newSlot);
      setAvailability(updatedAvailability);
    }

    setDate("");
    setStart("");
    setEnd("");
  };

  const handleEdit = (index) => {
    setEditing(true);
    setEditingIndex(index);
    setDate(availability[index].date);
    setStart(availability[index].start);
    setEnd(availability[index].end);
  };

  const handleRemove = async (index) => {
    const updatedAvailability = await removeAvailability(user.uid, index);
    setAvailability(updatedAvailability);
  };

  return (
    <div>
      <h2>Manage Video Call Availability</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <button type="submit">{editing ? "Update" : "Add"} Time Slot</button>
      </form>
      <br />
      <ul>
        Current Availability:
        {availability.map((slot, index) => (
          <li key={index}>
            {slot.date} {slot.start} - {slot.end}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeAvailability;
