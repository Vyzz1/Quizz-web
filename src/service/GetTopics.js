import { child, get, ref } from "firebase/database";
import { database } from "../firebase";

export const GetTopics = async (id) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `topics`));
  const response = await snapshot.val();
  const results = response.filter(
    (child) => parseInt(child.id) === parseInt(id)
  );
  if (snapshot.exists()) {
    return results;
  }
};
