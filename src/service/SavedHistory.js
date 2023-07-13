import { child, ref, set } from "firebase/database";
import { database } from "../firebase";
export const SavedHistory = (body, length) => {
  const db = ref(database);
  let { Date, Topic, TopicId, answers, count, user_id } = body;
  set(child(db, `history/${length}`), {
    Date: Date,
    Topic: Topic,
    TopicId: TopicId,
    answers: answers,
    count: count,
    user_id: user_id,
  });
};
