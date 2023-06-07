import { auth, db } from '../firebase';
import { getDoc, setDoc, updateDoc } from 'firebase/firestore';

// Mock the Firebase authentication and Firestore methods
jest.mock('../firebase', () => ({
  auth: {
    currentUser: { uid: 'test-uid' },
  },
  db: {
    collection: jest.fn(),
  },
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: () => true,
    data: () => ({
      availability: [
        {
          date: '2023-05-10',
          start: '10:00',
          end: '12:00',
          booked: false,
          bookedBy: null,
        },
      ],
    }),
  }),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
}));


// Simulate the functionality of adding a schedule availability
async function addScheduleAvailability(date, start, end) {
  const user = auth.currentUser;
  const employeeScheduleRef = { parent: {}, path: { segments: ['schedules', 'test-uid'] } };
  await updateDoc(employeeScheduleRef, {
    availability: updatedAvailability,
  });

  const scheduleSnapshot = await getDoc(employeeScheduleRef);

  let availability = [];
  if (scheduleSnapshot.exists()) {
    availability = scheduleSnapshot.data().availability || [];
  } else {
    await setDoc(employeeScheduleRef, { uid: user.uid, availability: [] });
  }

  const newSlot = { date, start, end, booked: false, bookedBy: null };
  const updatedAvailability = [...availability, newSlot];

  await updateDoc(employeeScheduleRef, {
    availability: updatedAvailability,
  });

  return employeeScheduleRef;
}

async function fetchAvailability() {
  const employeeScheduleRef = { parent: {}, path: { segments: ['schedules', 'test-uid'] } };
  const scheduleSnapshot = await getDoc(employeeScheduleRef);

  let availability = [];
  if (scheduleSnapshot.exists()) {
    availability = scheduleSnapshot.data().availability || [];
  }
  return availability;
}

async function updateScheduleAvailability(index, date, start, end) {
  const employeeScheduleRef = { parent: {}, path: { segments: ['schedules', 'test-uid'] } };
  const availability = await fetchAvailability();

  const updatedSlot = { date, start, end, booked: false, bookedBy: null };
  availability[index] = updatedSlot;

  await updateDoc(employeeScheduleRef, {
    availability: availability,
  });

  return availability;
}
async function removeScheduleAvailability(index) {
  const employeeScheduleRef = { parent: {}, path: { segments: ['schedules', 'test-uid'] } };
  const availability = await fetchAvailability();

  const updatedAvailability = availability.filter((_, i) => i !== index);
  await updateDoc(employeeScheduleRef, { availability: updatedAvailability });

  return updatedAvailability;
}



describe('EmployeeAvailability Functionality', () => {
  test('creates schedule availability', async () => {
    // Call the simulated addScheduleAvailability function with sample data
    const employeeScheduleRef = await addScheduleAvailability('2023-05-10', '10:00', '12:00');
  
    // Verify that the Firestore updateDoc method was called with the correct data
    expect(updateDoc).toHaveBeenCalledWith(
      employeeScheduleRef,
      {
        availability: expect.arrayContaining([
          expect.objectContaining({
            date: '2023-05-10',
            start: '10:00',
            end: '12:00',
            booked: false,
            bookedBy: null,
          }),
        ]),
      }
    );
  });

  test('fetches availability', async () => {
    const availability = await fetchAvailability();
  
    expect(getDoc).toHaveBeenCalledWith(
      { parent: {}, path: { segments: ['schedules', 'test-uid'] } }
    );
  });
  
  test('updates schedule availability', async () => {
    const originalAvailability = await fetchAvailability();
    const indexToUpdate = 0;
    const updatedAvailability = await updateScheduleAvailability(indexToUpdate, '2023-05-11', '11:00', '13:00');
  
    expect(updateDoc).toHaveBeenCalledWith(
      { parent: {}, path: { segments: ['schedules', 'test-uid'] } },
      {
        availability: expect.arrayContaining([
          expect.objectContaining({
            date: '2023-05-11',
            start: '11:00',
            end: '13:00',
            booked: false,
            bookedBy: null,
          }),
        ]),
      }
    );
    expect(updatedAvailability[indexToUpdate].date).toBe('2023-05-11');
    expect(updatedAvailability[indexToUpdate].start).toBe('11:00');
    expect(updatedAvailability[indexToUpdate].end).toBe('13:00');
  });

  test('removes schedule availability', async () => {
    const originalAvailability = await fetchAvailability();
    const indexToRemove = 0;
    const updatedAvailability = await removeScheduleAvailability(indexToRemove);
  
    expect(updateDoc).toHaveBeenCalledWith(
      { parent: {}, path: { segments: ['schedules', 'test-uid'] } },
      {
        availability: expect.not.arrayContaining([
          originalAvailability[indexToRemove],
        ]),
      }
    );
    expect(updatedAvailability).toHaveLength(originalAvailability.length - 1);
  });
});
