import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, firebaseStorage } from "../../configs/firebase";
import { User } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const usersCollection = collection(db, "users");

// get user by id
export const getUser = async (id: string): Promise<User> => {
  const user = await getDoc(doc(usersCollection, id));
  const result = user.data();
  return result as User;
};

// get user by account
export const getUserByAccount = async (
  account: string
): Promise<User | undefined> => {
  let result: User[] = [];

  let docs = await getDocs(
    query(usersCollection, where("account", "==", account))
  );

  console.log(`Result: ${JSON.stringify(docs.docs.map((val) => val.data()))}`)

  if (docs.empty) {
    return;
  }

  docs.docs.forEach((user) => {
    const converted = user.data() as User;

    if (converted.account === account) {
      result.push(converted);
    }
  });

  return result[0];
};

// update lecturer in lecturers collection in firestore database
export const updateUser = async (
  id: string,
  data: {
    updateFile: boolean;
    user: Partial<User>;
    profileImg?: File;
    userId: string;
  }
): Promise<void> => {
  const { updateFile, user, profileImg, userId } = data;
  // if updateFile is true, then upload new image file to storage and update imageUrl in lecturer object
  if (updateFile) {
    const { photo, ...restOfUser } = user; // remove id from lecturer object
    const newImageUrl = await uploadImage(profileImg!, userId);
    const newLecturerData = {
      ...restOfUser,
      photo: newImageUrl,
    };
    await updateDoc(doc(usersCollection, id), newLecturerData);
  } else {
    await updateDoc(doc(usersCollection, id), user);
  }
};

// upload image
export const uploadImage = async (
  image: File,
  uid: string
): Promise<string> => {
  // update lecturerStorageRef path with uid
  const storageRef = ref(firebaseStorage, `/users/${uid}`);

  const imageRef = uploadBytes(storageRef, image);
  const url = getDownloadURL((await imageRef).ref);
  return url;
};
