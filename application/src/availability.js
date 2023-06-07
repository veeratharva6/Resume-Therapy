import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.js";

const getEmployeeScheduleRef = (uid) => doc(db, "schedules", uid);

const fetchAvailability = async (uid) => {
  const employeeScheduleRef = getEmployeeScheduleRef(uid);
  const scheduleSnapshot = await getDoc(employeeScheduleRef);
  if (scheduleSnapshot.exists()) {
    return scheduleSnapshot.data().availability || [];
  } else {
    await setDoc(employeeScheduleRef, { uid, availability: [] });
    return [];
  }
};

const addAvailability = async (uid, newSlot) => {
  const employeeScheduleRef = getEmployeeScheduleRef(uid);
  const availability = await fetchAvailability(uid);

  // Check if date is in the past
  const dateNow = new Date();
  const dateSlot = new Date(newSlot.date);
  if (dateSlot < dateNow) {
    throw new Error("You can't add a time slot in the past!");
  }

  // Check if there are conflicting appointments
  const conflict = availability.some(
    (slot) =>
      slot.date === newSlot.date &&
      ((slot.start <= newSlot.start && newSlot.start < slot.end) ||
        (slot.start < newSlot.end && newSlot.end <= slot.end))
  );
  if (conflict) {
    throw new Error("There's a conflict with another appointment!");
  }

  const updatedAvailability = [...availability, newSlot];
  await updateDoc(employeeScheduleRef, { availability: updatedAvailability });
  return updatedAvailability;
};

const updateAvailability = async (uid, index, newSlot) => {
  const employeeScheduleRef = getEmployeeScheduleRef(uid);
  const availability = await fetchAvailability(uid);

  // Check if date is in the past
  const dateNow = new Date();
  const dateSlot = new Date(newSlot.date);
  if (dateSlot < dateNow) {
    throw new Error("You can't add a time slot in the past!");
  }

  // Check if there are conflicting appointments
  const conflict = availability.some(
    (slot, idx) =>
      idx !== index &&
      slot.date === newSlot.date &&
      ((slot.start <= newSlot.start && newSlot.start < slot.end) ||
        (slot.start < newSlot.end && newSlot.end <= slot.end))
  );
  if (conflict) {
    throw new Error("There's a conflict with another appointment!");
  }

  const updatedAvailability = [...availability];
  updatedAvailability[index] = newSlot;
  await updateDoc(employeeScheduleRef, { availability: updatedAvailability });
  return updatedAvailability;
};

const removeAvailability = async (uid, index) => {
  const employeeScheduleRef = getEmployeeScheduleRef(uid);
  const availability = await fetchAvailability(uid);
  const updatedAvailability = availability.filter((_, i) => i !== index);
  await updateDoc(employeeScheduleRef, { availability: updatedAvailability });
  return updatedAvailability;
};

export {
  fetchAvailability,
  addAvailability,
  updateAvailability,
  removeAvailability,
};
