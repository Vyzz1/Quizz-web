import { child, get, ref } from "firebase/database";
import { database } from "../firebase";
export const GetDetail = async (Date) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `history`));
  const response = await snapshot.val();
  const result = response.filter(
    (item) => parseInt(item.Date) === parseInt(Date)
  );

  return result;
};
