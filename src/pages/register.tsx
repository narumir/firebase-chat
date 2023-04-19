import md5 from "md5";
import {
  useRef,
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
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getDatabase,
  set,
  ref,
} from "firebase/database";
import {
  firebaseApp,
} from "src/firebase";

type RegisterFormData = {
  email: string;
  name: string;
  password: string;
  password_confirm: string;
}

export default function RegisterPage() {
  const [errorFormSubmit, setErrorFormSubmit] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const password = useRef<string>();
  password.current = watch("password");
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const account = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await updateProfile(account.user, {
        displayName: data.name,
        photoURL: `https://gravatar.com/avatar/${md5(account.user.email as string)}`
      });
      await account.user.reload();
      const database = getDatabase(firebaseApp);
      set(ref(database, `users/${account.user.uid}`), {
        displayName: account.user.displayName,
        photoURL: account.user.photoURL,
      });
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
        <h3>Register</h3>
      </div>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email?.type === "required" && <p>This email field is required.</p>}

        <label>Name</label>
        <input {...register("name", { required: true, maxLength: 10 })} />
        {errors.name?.type === "required" && <p>This name field is required.</p>}
        {errors.name?.type === "maxLength" && <p>Your Input exceed maxium length</p>}

        <label>Password</label>
        <input type="password" {...register("password", { required: true, minLength: 6 })} />
        {errors.password?.type === "required" && <p>This password field is required.</p >}
        {errors.password?.type === "minLength" && <p>Password must have at least 6.</p>}

        <label>Password Confirm</label>
        <input {...register("password_confirm", { required: true, validate: (value) => value === password.current })} type="password" />
        {errors.password_confirm?.type === "required" && <p>This name field is required.</p>}
        {errors.password_confirm?.type === "validate" && <p>The password field is not math.</p>}

        {errorFormSubmit && <p>${errorFormSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/login">이미 아이디가 있다면...</Link>
      </form>
    </div>
  );
}
