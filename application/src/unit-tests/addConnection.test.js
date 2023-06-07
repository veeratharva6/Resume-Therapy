import { db } from "../firebase.js";
import { collection, query, getDocs, where, addDoc } from "firebase/firestore";
import { addConnection } from "../connections.js";

jest.mock("../firebase.js");
jest.mock("firebase/firestore");



describe("addConnection", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a connection successfully", async () => {
    const userid = "testUserID";
    const reviewerid = "testReviewerID";

    collection
      .mockReturnValueOnce("usersCollection")
      .mockReturnValueOnce("usersCollection")
      .mockReturnValueOnce("connectionsCollection");

    query
      .mockReturnValueOnce("userQuery")
      .mockReturnValueOnce("reviewerQuery");

    where
      .mockReturnValueOnce("whereResult")
      .mockReturnValueOnce("whereResult")
      .mockReturnValueOnce("whereResult");

    getDocs
      .mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              name: "Test User",
            }),
          },
        ],
      })
      .mockResolvedValueOnce({
        docs: [
          {
            data: () => ({
              name: "Test Reviewer",
              employee: true,
            }),
          },
        ],
      });

    addDoc.mockResolvedValue();

    await addConnection(userid, reviewerid);

    expect(collection).toHaveBeenNthCalledWith(1, db, "users");
    expect(collection).toHaveBeenNthCalledWith(2, db, "users");
    expect(collection).toHaveBeenNthCalledWith(3, db, "connections");
    expect(where).toHaveBeenCalledWith("uid", "==", userid);
    expect(where).toHaveBeenCalledWith("uid", "==", reviewerid);
    expect(query).toHaveBeenCalledWith("usersCollection", "whereResult");
    expect(query).toHaveBeenCalledWith("usersCollection", "whereResult");
    expect(getDocs).toHaveBeenCalledWith("userQuery");
    expect(getDocs).toHaveBeenCalledWith("reviewerQuery");
    expect(addDoc).toHaveBeenCalledWith("connectionsCollection", {
      username: "Test User",
      userid,
      reviewername: "Test Reviewer",
      reviewerid,
      status: "pending",
    });
  });
});