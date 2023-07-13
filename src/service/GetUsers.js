import { child, get, ref } from "firebase/database";
import { database } from "../firebase";
export const GetUsers = async () => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `users`));
  const response = await snapshot.val();

  if (snapshot.exists()) {
    return response;
  }
};
