import {
    Dropdown,
    Image,
} from "react-bootstrap";
import {
    IoIosChatboxes,
} from "react-icons/io";
import {
    useSelector,
} from "react-redux";
import { RootState } from "src/store";

function UserPanel() {
    const user = useSelector((state: RootState) => state.user.currentUser);
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
                        <Dropdown.Item>로그인</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}

export default UserPanel;
