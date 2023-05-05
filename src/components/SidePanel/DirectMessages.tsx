
import {
  FaRegSmile,
} from "react-icons/fa";
import { UserState } from "src/redux/reducers";
import { useAppDispatch, useAppSelector } from "src/redux/useStore";

function DirectMessages() {
  // const users = useAppSelector((state) => state.db.users);
  return (
    <div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <FaRegSmile style={{ marginRight: "3px" }} />
        DIRECT MESSAGES (1)
      </span>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {/* {users.map((val) => (
          <li key={val.uid}>{val.displayName}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default DirectMessages;
