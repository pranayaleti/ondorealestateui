import { Link } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";

export default function Verify() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center">
          <img className="w-20" src="/logo.png" alt="OnDo logo" />
          <p className="text-6xl font-medium font-kanit bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            OnDo
          </p>
        </div>

        <CheckCircle className="text-green-600" style={{ fontSize: 72 }} />

        <p className="text-2xl font-medium mt-2 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Email Verified
        </p>
        <p className="text-center text-gray-700 max-w-md">
          Your email has been successfully verified. You can now access your OnDo account.
        </p>

        <Link
          to="/login"
          className="bg-gradient-to-r from-orange-500 to-red-800 py-4 rounded-2xl text-white text-xl w-[20rem] text-center"
        >
          Access OnDo →
        </Link>
      </div>
    </div>
  );
}