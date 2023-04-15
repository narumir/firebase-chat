import {
  useCallback,
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
  clearUser,
} from "src/redux/actions/user_action";
import {
  useAppDispatch,
  useAppSelector,
} from "src/hooks/useStore";

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
          }} />
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
            <Dropdown.Item>프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
