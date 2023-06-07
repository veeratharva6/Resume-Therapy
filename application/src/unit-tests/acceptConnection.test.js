import { db } from "../firebase.js";
import { collection, query, getDocs, updateDoc, where } from "firebase/firestore";
import { acceptConnectionRequest } from "../connections.js";

jest.mock("../firebase.js");
jest.mock("firebase/firestore");

describe("acceptConnectionRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should accept a connection request successfully", async () => {
    const userid = "testUserID";
    const reviewerid = "testReviewerID";

    collection.mockReturnValue("connectionsCollection");
    query.mockReturnValue("connectionsQuery");
    where.mockReturnValue("whereResult");
    getDocs.mockResolvedValue({
      docs: [
        {
          ref: "docRef",
        },
      ],
    });
    updateDoc.mockResolvedValue();

    await acceptConnectionRequest(userid, reviewerid);

    expect(collection).toHaveBeenCalledWith(db, "connections");
    expect(where).toHaveBeenCalledWith("userid", "==", userid);
    expect(where).toHaveBeenCalledWith("reviewerid", "==", reviewerid);
    expect(query).toHaveBeenCalledWith("connectionsCollection", "whereResult", "whereResult");
    expect(getDocs).toHaveBeenCalledWith("connectionsQuery");
    expect(updateDoc).toHaveBeenCalledWith("docRef", { status: "accepted" });
  });
});