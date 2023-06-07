import { db } from "../firebase.js";
import { collection, query, getDocs, updateDoc, where } from "firebase/firestore";
import { addBio } from "../bio.js";

jest.mock("../firebase.js");
jest.mock("firebase/firestore");



describe("addBio", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the user's bio successfully", async () => {
    const userid = "testUserID";
    const bio = "This is my new bio.";

    collection.mockReturnValue("usersCollection");
    query.mockReturnValue("userQuery");
    where.mockReturnValue("whereResult");
    getDocs.mockResolvedValue({
      empty: false,
      docs: [
        {
          ref: "docRef",
        },
      ],
    });
    updateDoc.mockResolvedValue();

    await addBio(userid, bio);

    expect(collection).toHaveBeenCalledWith(db, "users");
    expect(where).toHaveBeenCalledWith("uid", "==", userid);
    expect(query).toHaveBeenCalledWith("usersCollection", "whereResult");
    expect(getDocs).toHaveBeenCalledWith("userQuery");
    expect(updateDoc).toHaveBeenCalledWith("docRef", { bio });
  });
});