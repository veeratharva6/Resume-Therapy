import { db } from "../firebase.js";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
} from "firebase/firestore";
import { denyConnectionRequest } from "../connections.js";

jest.mock("../firebase.js");
jest.mock("firebase/firestore");

describe("denyConnectionRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should deny a connection request successfully", async () => {
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
    deleteDoc.mockResolvedValue();

    await denyConnectionRequest(userid, reviewerid);

    expect(collection).toHaveBeenCalledWith(db, "connections");
    expect(where).toHaveBeenCalledWith("userid", "==", userid);
    expect(where).toHaveBeenCalledWith("reviewerid", "==", reviewerid);
    expect(query).toHaveBeenCalledWith(
      "connectionsCollection",
      "whereResult",
      "whereResult"
    );
    expect(getDocs).toHaveBeenCalledWith("connectionsQuery");
    expect(deleteDoc).toHaveBeenCalledWith("docRef");
  });
});
