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
import {
  AuthWrapperContainer,
  AuthWarperError,
  AuthWarperTitle,
  AuthWarperInput,
  AuthWarperLabel,
  AuthWarperForm,
  AuthWarperTitleContainer,
} from "src/components/AuthWarper";

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
      await signInWithEmailAndPassword(auth, data.email, data.password)
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
    <AuthWrapperContainer className="auth-wrapper">
      <AuthWarperTitleContainer style={{ textAlign: "center" }}>
        <AuthWarperTitle>Login</AuthWarperTitle>
      </AuthWarperTitleContainer>
      <AuthWarperForm onSubmit={onSubmit}>
        <AuthWarperLabel>Email</AuthWarperLabel>
        <AuthWarperInput type="email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
        {errors.email?.type === "required" && <AuthWarperError>This email field is required.</AuthWarperError>}

        <AuthWarperLabel>Password</AuthWarperLabel>
        <AuthWarperInput type="password" {...register("password", { required: true })} />
        {errors.password?.type === "required" && <AuthWarperError>This password field is required.</AuthWarperError >}

        {errorFormSubmit && <p>${errorFormSubmit}</p>}
        <AuthWarperInput type="submit" disabled={loading} />
        <Link style={{ color: "gray", textDecoration: "none" }} to="/register">아직 회원이 아니라면...</Link>
      </AuthWarperForm>
    </AuthWrapperContainer>
  );
}
