import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]  p-3">
      <div className="border-2 border-sky-500 p-12 rounded-md spayce-y-4">
        <p className="text-3xl text-red-500 capitalize">something goes wrong</p>
        <Link to="/" className="btn btn-accent btn-wide mt-3">
          Go home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
