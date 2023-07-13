import { child, get, ref } from "firebase/database";
import { database } from "../firebase";
export const GetHistory = async (id) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `history`));
  const response = await snapshot.val();
  const result = response.filter(
    (item) => parseInt(item.user_id) === parseInt(id)
  );

  return result;
};
