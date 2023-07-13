import { child, ref, set } from "firebase/database";
import { database } from "../firebase";
export const CreateUsers = async (body, length) => {
  const db = ref(database);
  let { email, fullName, password, token } = body;
  set(child(db, `users/${length}`), {
    email: email,
    fullName: fullName,
    id: length + 1,
    password: password,
    token: token,
  });
};
