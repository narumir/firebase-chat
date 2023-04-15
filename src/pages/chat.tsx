import MainPanel from "src/components/MainPanel/MainPanel";
import SidePanel from "src/components/SidePanel/SidePanel";

function ChatPage() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ width: "300px" }}>
                <SidePanel />
            </div>
            <div style={{ width: "100%" }}>
                <MainPanel />
            </div>
        </div>
    );
}

export default ChatPage;
