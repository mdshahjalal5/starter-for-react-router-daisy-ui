import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { KeyRound, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.config";
import validator from "validator";
import { useRef, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const emailRef = useRef();

  const handleForgotPassword = () => {
    const email = emailRef?.current?.value;

    setLoginError("");
    if (!validator.isEmail(email)) {
      return setLoginError("Please enter your valid email");
    }
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        Swal.fire(
          "Password Reset",
          "Please check your email and reset the password",
          100,
        );
      })
      .catch();
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form?.email?.value;
    const password = form?.password?.value;
    setLoginError("");
    setSuccess(false);

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        if (res?.user?.emailVerified) {
          setSuccess(true);
          navigate("/");
          Swal.fire("Success!", "Login completed.", "success");
        } else {
          setLoginError("Please verify your email first");
        }
      })
      .catch((err) => {
        setLoginError(err.message);
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-sm border border-orange-400 p-6 rounded-xl mx-auto flex-1"
      >
        <h2 className="text-2xl font-semibold capitalize text-sky-400 text-center mb-4">
          Login Now
        </h2>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">Email: </span>
          </label>

          <div className="flex items-center gap-2 input input-primary">
            <Mail />

            <input
              ref={emailRef}
              type="text"
              name="email"
              placeholder="Email:"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">Password:</span>
          </label>
          <div className="flex items-center gap-2 input input-primary">
            <KeyRound />
            <input
              type="text"
              name="password"
              placeholder="Password:"
              required
            />
          </div>
        </div>
        <div className="mt-2 text-gray-500">
          <Link onClick={handleForgotPassword}>Forgot Password?</Link>
        </div>
        <div className="mt-5">
          <button className="btn btn-accent btn-wide">Login</button>
        </div>
        <div className="mt-3 flex items-center  space-x-2">
          <Link to="/register">Don't have an account? Please Register</Link>
        </div>
        {loginError && (
          <div className="mt-4 w-full ">
            <h2 className="text-red-500">{loginError}</h2>
          </div>
        )}
      </form>
      {/* Error message */}
    </div>
  );
};

export default Login;
