import {
    useState,
} from "react";
import {
    useForm,
} from "react-hook-form";
import {
    Link,
} from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";

type LoginFormData = {
    email: string;
    password: string;
}

export default function RegisterPage() {
    const [errorFormSubmit, setErrorFormSubmit] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const onSubmit = handleSubmit(async (data) => {
        setLoading(true);
        try {
            const auth = getAuth();
            const account = await signInWithEmailAndPassword(auth, data.email, data.password)
            console.log(account)
			
            setLoading(false);
        } catch (e) {
            const err = e as Error;
            setErrorFormSubmit(err.message)
            setLoading(false);
            setTimeout(() => {
                setErrorFormSubmit("");
            }, 5000);
        }
    });

    return (
        <div className="auth-wrapper">
            <div style={{ textAlign: "center" }}>
                <h3>Login</h3>
            </div>
            <form onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email?.type === "required" && <p>This email field is required.</p>}

                <label>Password</label>
                <input type="password" {...register("password", { required: true })} />
                {errors.password?.type === "required" && <p>This password field is required.</p >}

                {errorFormSubmit && <p>${errorFormSubmit}</p>}
                <input type="submit" disabled={loading} />
                <Link style={{ color: "gray", textDecoration: "none" }} to="/register">아직 회원이 아니라면...</Link>
            </form>
        </div>
    );
}
