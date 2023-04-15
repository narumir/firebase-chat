import {
  getAuth,
  updateProfile,
} from "firebase/auth";

type Profile = {
  displayName?: string;
  photoURL?: string;
}

export const updateUserProfile = (data: Profile) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user == null) {
    throw new Error("Please login before update profile");
  }
  return updateProfile(user, data);
};

export const reloadUserProfile = () => {
  const auth = getAuth();
  return auth.currentUser?.reload();
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
}