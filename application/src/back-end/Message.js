import {
  query,
  collection,
  getDocs,
  getDoc,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export async function createConversations(theUser, user) {
  let user1 = theUser;
  let user2 = user;
  try {
    const conversationRef = collection(db, "conversation");

    const userQuery = query(collection(db, "users"), where("uid", "==", user1));

    const metaUserList = await getDocs(userQuery);

    let metaUser;
    if (metaUserList.empty) {
      throw new Error("no such user found, hacked");
    } else {
      let docRef = metaUserList.docs[0].ref;
      metaUser = await getDoc(docRef);
    }

    let isEmployeeCheck = metaUser?.data().employee;

    let toLookup;
    let toList;
    if (isEmployeeCheck == false) {
      toLookup = user1;
      toList = user2;
    } else {
      toLookup = user2;
      toList = user1;
    }

    addDoc(conversationRef, {
      clientid: toLookup,
      reviewerid: toList,
    }).then((docRef) => {
      let alohaMessage = "Connection created! Say Hello to your reviewer!";
      let authenticate = {
        uid: user1,
      };
      console.log(docRef.id);
      addMessage(authenticate, docRef.id, alohaMessage);

      return true;
    });
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function ListConversations(auth) {
  let user = auth;
  try {
    if (user == null) {
      return [];
    }

    let toLookup;
    let toList;

    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", user?.uid)
    );

    const metaUserList = await getDocs(userQuery);

    let metaUser;
    if (metaUserList.empty) {
      throw new Error("no such user found, hacked");
    } else {
      let docRef = metaUserList.docs[0].ref;
      metaUser = await getDoc(docRef);
    }

    let isEmployeeCheck = metaUser?.data().employee;
    const listConnection = [];
    if (isEmployeeCheck == false) {
      toLookup = "clientid";
      toList = "reviewerid";
    } else {
      toLookup = "reviewerid";
      toList = "clientid";
    }

    const q = query(
      collection(db, "conversation"),
      where(toLookup, "==", metaUser.data().uid)
    );

    const qSnapshot = await getDocs(q);
    const promiseArray = [];
    qSnapshot.docs.forEach(async (doc) => {
      if (doc && doc.data()) {
        let name;
        if (isEmployeeCheck == 0) {
          let nameQuery = query(
            collection(db, "users"),
            where("uid", "==", doc.data().reviewerid)
          );
          promiseArray.push(
            getDocs(nameQuery).then((nameDocs) => {
              name = nameDocs.docs[0].ref;
              return getDoc(name);
            })
          );
        } else {
          let nameQuery = query(
            collection(db, "users"),
            where("uid", "==", doc.data().clientid)
          );
          promiseArray.push(
            getDocs(nameQuery).then((nameDocs) => {
              name = nameDocs.docs[0].ref;
              return getDoc(name);
            })
          );
        }
      }
    });
    const resolvedPromises = await Promise.allSettled(promiseArray);

    resolvedPromises.forEach((promiseResult, index) => {
      if (promiseResult.status === "fulfilled") {
        const nameData = promiseResult.value.data();

        listConnection.push({
          ref: qSnapshot.docs[index].ref,
          docRef: qSnapshot.docs[index].ref.id,
          id: nameData.name,
        });
      }
    });

    return listConnection;
  } catch (err) {
    console.error(err);
    alert(
      "An error occured while fetching connections in conversation collection"
    );
  }
}

export const ListMessages = (auth, docRef, callback) => {
  let user = auth;
  try {
    if (user == null) {
      return [];
    }

    console.info(docRef);
    const unsubscribe = onSnapshot(
      collection(db, "conversation", docRef, "messages"),
      async (snapshot) => {
        const messagesPromise = snapshot.docs.map(async (doc) => {
          const data = await getDoc(doc.ref);

          let timestamp = data.data().sent;

          if (data.data().sent != undefined) {
            timestamp = timestamp.toMillis();
          }
          return {
            id: data.ref.id,
            message: data.data().message,
            senderId: data.data().senderId,
            senderName: data.data().name,
            sent: timestamp,
          };
        });

        const messageData = await Promise.all(messagesPromise);

        messageData.sort((a, b) => a.sent - b.sent);

        callback(messageData);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error(err);
  }
};

export async function addMessage(auth, docRef, Message) {
  let user = auth;
  try {
    if (user == null) {
      return false;
    }

    const messageRef = collection(db, "conversation", docRef, "messages");

    let name;

    let nameQuery = query(
      collection(db, "users"),
      where("uid", "==", user?.uid)
    );
    let documento = await getDocs(nameQuery);
    let theName = documento.docs[0];
    name = theName.data().name;

    if (name == undefined) {
      name = "unknown";
    }

    addDoc(messageRef, {
      message: Message,
      senderId: user?.uid,
      name: name,
      sent: serverTimestamp(),
    }).then(() => {
      return true;
    });
  } catch (err) {
    console.error(err);
  }
}
