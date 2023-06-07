import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import {
  fetchAvailability,
  addAvailability,
  updateAvailability,
  removeAvailability,
} from "../../../availability.js";
import { Grid, Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./availability.css";
import Button from "@mui/material/Button";

function EmpAvailability() {
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

    // Check if date is in the past
    const dateNow = new Date();
    const dateSlot = new Date(date);
    if (dateSlot < dateNow) {
      alert("You can't add a time slot in the past!");
      return;
    }

    // Check if there are conflicting appointments
    const conflict = availability.some(
      (slot) =>
        slot.date === date &&
        ((slot.start <= start && start < slot.end) ||
          (slot.start < end && end <= slot.end))
    );
    if (conflict) {
      alert("There's a conflict with another appointment!");
      return;
    }

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
      <Container maxWidth="xl" class="available">
        <h1></h1>
        <h1></h1>
        <h1 class="h1">Availability</h1>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <h1></h1>

            <form onSubmit={handleSubmit}>
              <h3>Pick a Day</h3>
              <label>
                <TextField
                  type="date"
                  id="standard-helperText"
                  defaultValue="Default Value"
                  helperText="Date"
                  variant="standard"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <br />
              </label>

              <h3>Pick a Start Time </h3>
              <label>
                <TextField
                  type="time"
                  id="standard-helperText"
                  defaultValue="Default Value"
                  helperText="Start Time"
                  variant="standard"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />{" "}
                <br />
              </label>

              <h3>Pick a End Time </h3>
              <label>
                <TextField
                  type="time"
                  id="standard-helperText"
                  defaultValue="Default Value"
                  helperText="End Time"
                  variant="standard"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />{" "}
                <br />
              </label>

              <button type="submit">
                {editing ? "Update" : "Add"} Time Slot
              </button>
            </form>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <ul>
              <h2 class="h1">Current Availability</h2>
              <h1></h1>

              {availability.map((slot, index) => (
                <li key={index}>
                  {slot.date} {slot.start} - {slot.end}
                  {slot.booked ? (
                    <p>Slot is booked by {slot.bookedByName}</p>
                  ) : (
                    <p>Slot is available</p>
                  )}
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                  <Button onClick={() => handleRemove(index)}>Remove</Button>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default EmpAvailability;
