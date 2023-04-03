
export default function LoginPage() {
    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Login</h3>
            </div>
            <form>
                <label>Email</label>
                <input name="email" type="email" />
                <label>Password</label>
                <input name="password" type="password" />
                <input type="submit" />
            </form>
        </div>
    );
}
