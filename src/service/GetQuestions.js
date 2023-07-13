import { child, get, ref } from "firebase/database";
import { database } from "../firebase";

export const GetQuestions = async (topicId1) => {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, `questions`));
  const response = await snapshot.val();
  const results = response.filter(
    (child) => parseInt(child.topicId) === parseInt(topicId1)
  );
  if (snapshot.exists()) {
    return results;
  }
};
