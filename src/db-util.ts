import {
  getDatabase,
  ref,
  set,
} from "firebase/database";

type Profile = {
  displayName?: string;
  photoURL?: string;
}
export const updateUserInfo = (uid: string, data: Profile) => {
  const database = getDatabase();
  return set(ref(database, `users/${uid}`), data);
}
