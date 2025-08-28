import { Link } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

export default function PageNotFound() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center">
          <img className="w-20" src="/logo.png" alt="OnDo logo" />
          <p className="text-6xl font-medium font-kanit bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            OnDo
          </p>
        </div>

        <p className="text-2xl font-medium mt-2 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Page not found
        </p>

        <p className="text-center text-gray-700 max-w-md">
          The page you’re looking for doesn’t exist or has moved.
        </p>

        <div className="flex gap-3 w-[29rem] max-w-[90vw]">
          <Link
            to="/"
            className="bg-gradient-to-r from-orange-500 to-red-800 py-4 rounded-2xl text-white text-xl flex-1 text-center"
          >
            Go Home <ArrowForward />
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 py-4 rounded-2xl text-gray-900 text-xl flex-1 text-center hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}