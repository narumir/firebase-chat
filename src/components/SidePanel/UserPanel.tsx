import {
  ChangeEvent,
  useCallback,
  useRef,
} from "react";
import {
  Dropdown,
  Image,
} from "react-bootstrap";
import {
  IoIosChatboxes,
} from "react-icons/io";
import {
  getAuth,
} from "firebase/auth";
import {
  getDownloadURL,
} from "firebase/storage";
import {
  clearUser, setUser,
} from "src/redux/actions/user_action";
import {
  useAppDispatch,
  useAppSelector,
} from "src/hooks/useStore";
import {
  uploadImage,
} from "src/storage-util";
import {
  getCurrentUser,
  reloadUserProfile,
  updateUserProfile,
} from "src/auth-util";
import {
  updateUserInfo,
} from "src/db-util";

function UserPanel() {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const logout = useCallback(async () => {
    if (window.confirm("정말로 로그아웃 하겠습니까?")) {
      const auth = getAuth();
      await auth.signOut();
      dispatch(clearUser());
    }
  }, [dispatch]);
  const onOpenImage = useCallback(() => {
    openImageRef.current?.click();
  }, []);
  const handleProfileImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files?.length === 0 || target.files == null || user == null) {
      return;
    }
    try {
      const file = target.files[0];
      const uploadedFile = await uploadImage(file, `/user_image/${user.uid}`);
      const newPhotoURL = await getDownloadURL(uploadedFile.ref);
      await updateUserProfile({ photoURL: newPhotoURL });
      await updateUserInfo(user.uid, { photoURL: newPhotoURL });
      await reloadUserProfile();
      const newUserProfile = getCurrentUser();
      if (newUserProfile == null) {
        return;
      }
      const dsaf = {
        email: newUserProfile.email ?? "",
        displayName: newUserProfile.displayName ?? "",
        photoURL: newUserProfile.photoURL ?? "",
        uid: newUserProfile.uid ?? "",
      }
      dispatch(setUser(dsaf))
    } catch (e) {

    }
  }, [user, dispatch]);
  const openImageRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes />
        &nbsp;
        Chat App
      </h3>

      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          roundedCircle
          src={user && user.photoURL}
          style={{
            width: "30px",
            height: "30px",
            marginTop: "3px",
          }}
        />
        <input
          accept="image/jpeg, image/png"
          style={{ display: "none" }}
          type="file"
          ref={openImageRef}
          onChange={handleProfileImageChange} />
        <Dropdown>
          <Dropdown.Toggle
            style={{
              background: "transparent",
              border: 0,
            }}
          >
            {user && user.displayName}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={onOpenImage}>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
