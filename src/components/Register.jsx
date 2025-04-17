import { Camera, Eye, EyeOff, FolderPen, KeyRound, Mail } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form?.name?.value;
    const photoURL = form?.photoURL?.value;
    const email = form?.email?.value;
    const password = form?.password?.value;

    const terms = form?.terms?.checked;
    const passwordValidation =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*\s]{6,}$/;
    setErrorMessage("");

    if (password.length < 6) {
      return setErrorMessage("Password must be at least 6 characters");
    }
    // checking terms accepted
    if (!terms) {
      return setErrorMessage("Please accept our terms and conditions");
    }
    if (!passwordValidation.test(password)) {
      return setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
    }
    createUserWithEmailAndPassword(auth, email, password)
      //user successfully created
      .then((res) => {
        Swal.fire(
          "Success!",
          `${res?.user?.displayName ? res.user.displayName : "Hello"}, account created successfully`,
          "success",
        );
        setSuccess(true);

        sendEmailVerification(auth.currentUser)
          //verification email sent
          .then((res) => {
            setErrorMessage("Please check your email for verification");

            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photoURL,
            })
              .then((res) => {
                console.log(`res`, res);
                navigate("/login");
              })
              .catch((err) => {
                console.log(`err`, err);
              });
          })

          // failed to send verification email
          .cath((err) => {
            console.log(`err`, err);
          });
      }) // failed  to create user
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-sm border border-orange-400 p-6 rounded-xl mx-auto flex-1"
      >
        <h2 className="text-2xl font-semibold capitalize text-sky-400 text-center mb-4">
          Please Register
        </h2>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">Name:</span>
          </label>
          <div className="flex items-center gap-2 input input-primary">
            <FolderPen />
            <input type="text" placeholder="Name:" name="name" required />
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">PhotoURL:</span>
          </label>
          <div className="flex items-center gap-2 input input-primary">
            <Camera />
            <input
              name="photoURL"
              type="text"
              placeholder="PhotoURL:"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">Email: </span>
          </label>
          <div className="flex items-center gap-2 input input-primary">
            <Mail />
            <input
              name="email"
              type="text"
              placeholder="Email:"
              className="w-full"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-1">
          <label>
            <span className="text-gray-600">Password:</span>
          </label>
          <div className="flex items-center justify-between gap-2 input input-primary">
            <div className="flex items-center gap-2">
              <KeyRound />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password:"
                name="password"
                className=""
                required
              />
            </div>
            <Link onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </Link>
          </div>{" "}
        </div>
        <div className="mt-5 flex items-center space-x-2">
          <input
            type="checkbox"
            name="terms"
            className="checkbox border-indigo-400 bg-indigo-50 checked:bg-orange-400 checked:text-orange-800 checked:border-orange-500 "
          />
          <p className="text-gray-500">
            Accept our <Link to="/terms">terms and conditions</Link>
          </p>
        </div>
        <button className="btn mt-6 btn-accent btn-wide uppercase">
          Register
        </button>

        {/* Error message */}
        {errorMessage && (
          <div className="mt-4 w-full ">
            <h2 className="text-red-500 text-lg ">{errorMessage}</h2>
          </div>
        )}
        <div className="mt-3 flex items-center space-x-2">
          <Link to="/login">Already have an account? Please Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
