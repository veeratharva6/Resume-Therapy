import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import "./appointments/appointments.css";

function BookAppointment() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [connections, setConnections] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchConnections(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchConnections = async (userId) => {
    const q = query(
      collection(db, "connections"),
      where("userid", "==", userId),
      where("status", "==", "accepted")
    );
    const connectionsSnapshot = await getDocs(q);
    const connectionsData = connectionsSnapshot.docs.map(
      (doc) => doc.data().reviewerid
    );
    setConnections(connectionsData);
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

    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", auth.currentUser.uid)
    );
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.error("No user found with uid:", auth.currentUser.uid);
      return;
    }

    const name = userSnapshot.docs[0].data().name;

    const userAppointmentsQuery = query(
      collection(db, "schedules"),
      where("bookedBy", "==", auth.currentUser.uid)
    );
    const userAppointmentsSnapshot = await getDocs(userAppointmentsQuery);
    const userAppointments = userAppointmentsSnapshot.docs.flatMap((doc) =>
      doc
        .data()
        .availability.filter((slot) => slot.bookedBy === auth.currentUser.uid)
    );

    const selectedSlotStart = new Date(
      selectedSlot.date + " " + selectedSlot.start
    );
    const selectedSlotEnd = new Date(
      selectedSlot.date + " " + selectedSlot.end
    );

    const conflicts = userAppointments.some((appointment) => {
      const appointmentStart = new Date(
        appointment.date + " " + appointment.start
      );
      const appointmentEnd = new Date(appointment.date + " " + appointment.end);

      return (
        (selectedSlotStart >= appointmentStart &&
          selectedSlotStart < appointmentEnd) ||
        (selectedSlotEnd > appointmentStart &&
          selectedSlotEnd <= appointmentEnd) ||
        (selectedSlotStart <= appointmentStart &&
          selectedSlotEnd >= appointmentEnd)
      );
    });

    if (conflicts) {
      alert("You have a conflicting appointment already!");
      return;
    }

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
      <h1> </h1>
      <h1 class="h1">Book Appointment</h1>

      <h3>Select an employee:</h3>
      <ul>
        {employees.map((employee, index) => (
          <li key={index}>
            <button onClick={() => handleEmployeeSelection(employee)}>
              {employee.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedEmployee && (
        <div>
          <h3>Select a time slot:</h3>
          <ul>
            {selectedEmployee.availability
              .filter((slot) => !slot.booked)
              .map((slot, index) => (
                <li key={index}>
                  {slot.date} {slot.start} - {slot.end}
                  <button onClick={() => handleSlotSelection(slot)}>
                    Select
                  </button>
                </li>
              ))}
          </ul>
          {selectedSlot && (
            <div>
              <h3>Meeting Details:</h3>
              <p>Date: {selectedSlot.date}</p>
              <p>Start Time: {selectedSlot.start}</p>
              <p>End Time: {selectedSlot.end}</p>
              <p>Therapist: {selectedEmployee.name}</p>
            </div>
          )}
        </div>
      )}
      <button onClick={bookAppointment}>Book Appointment</button>
    </div>
  );
}

export default BookAppointment;
