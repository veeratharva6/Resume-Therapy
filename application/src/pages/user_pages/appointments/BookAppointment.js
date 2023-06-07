import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import "./appointments.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Grid, Container } from "@mui/material";

function BookAppointment() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [connections, setConnections] = useState([]);
  const [name, setName] = useState(null);

  const fetchConnections = async () => {
    const q = query(
      collection(db, "connections"),
      where("userid", "==", auth.currentUser.uid),
      where("status", "==", "accepted")
    );
    const connectionsSnapshot = await getDocs(q);
    const connectionsData = connectionsSnapshot.docs.map(
      (doc) => doc.data().reviewerid
    );
    setConnections(connectionsData);
  };

  const fetchName = async () => {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (userDoc.exists()) {
      console.log("name: " + userDoc.data().name);
      setName(userDoc.data().name);
    } else {
      console.log("No such document!");
    }
  };

  const fetchEmployees = async () => {
    const schedulesSnapshot = await getDocs(collection(db, "schedules"));
    const employeesData = await Promise.all(
      schedulesSnapshot.docs
        .filter((scheduleDoc) => connections.includes(scheduleDoc.data().uid))
        .map(async (scheduleDoc) => {
          const userDoc = await getDocs(
            query(
              collection(db, "users"),
              where("uid", "==", scheduleDoc.data().uid)
            )
          );
          const userData = userDoc.docs[0].data();
          return { ...scheduleDoc.data(), name: userData.name };
        })
    );
    setEmployees(employeesData);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (connections.length > 0) {
      fetchEmployees();
    }
  }, [connections]);

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployee(employee);
    setSelectedSlot(null);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const bookAppointment = async () => {
    if (!selectedEmployee || !selectedSlot) return;
    fetchName();
    const updatedAvailability = selectedEmployee.availability.map((slot) =>
      slot === selectedSlot
        ? {
            ...slot,
            booked: true,
            bookedBy: auth.currentUser.uid,
            bookedByName: name,
            meetingId:
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15),
          }
        : slot
    );

    const employeeScheduleRef = doc(db, "schedules", selectedEmployee.uid);
    await updateDoc(employeeScheduleRef, { availability: updatedAvailability });

    setSelectedEmployee(null);
    setSelectedSlot(null);
    fetchEmployees();
  };

  return (
    <div>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>
      <Container maxWidth="xl">
        <h1 class="h1">Book Appointments</h1>
        <TextField
          id="standard-basic"
          label="Search Resume Therapists..."
          variant="standard"
          fullWidth
        />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              {employees.map((employee, index) => (
                <li class="li" key={index}>
                  <div class="appointments">
                    <h1 className="h1"> {employee.name}</h1>
                    <div class="icon">
                      <CalendarMonthIcon
                        variant="outlined"
                        onClick={() => handleEmployeeSelection(employee)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <h1></h1>
            <h1></h1>

            {selectedEmployee && (
              <div>
                <h2>Select a time slot with: </h2>
                <h3>{selectedEmployee.name}</h3>
                <ul>
                  {selectedEmployee.availability
                    .filter((slot) => !slot.booked)
                    .map((slot, index) => (
                      <li key={index}>
                        {slot.date} : {slot.start} - {slot.end} :
                        <Button onClick={() => handleSlotSelection(slot)}>
                          {" "}
                          Select{" "}
                        </Button>
                      </li>
                    ))}
                </ul>
                {selectedSlot && (
                  <div class="schedule">
                    <h3>Meeting Details:</h3>
                    <p>Date: {selectedSlot.date}</p>
                    <p>Start Time: {selectedSlot.start}</p>
                    <p>End Time: {selectedSlot.end}</p>
                    <p>Employee: {selectedEmployee.name}</p>
                    <p>Meeting Token: {selectedSlot.meetingToken}</p>
                  </div>
                )}
                <Button variant="contained" onClick={bookAppointment}>
                  Book Appointment
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BookAppointment;
