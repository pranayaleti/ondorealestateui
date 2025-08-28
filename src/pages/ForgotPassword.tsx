// NOTE: If your backend doesn't expose this endpoint yet, this page may 404. Adjust the path in the code when ready.
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useApiRequest from "../hooks/useApiRequest";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type FormType = z.infer<typeof formSchema>;

const inputActiveStyle = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "0.75rem",
    "& fieldset": { borderRadius: "0.75rem" },
    "&.Mui-focused fieldset": { borderColor: "black" },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "black" },
};

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormType>({ resolver: zodResolver(formSchema) });

  const USER_SERVICE_BASEURL = import.meta.env.VITE_USER_BASEURL;
  const { request, loading } = useApiRequest();

  const onSubmit = async (body: FormType) => {
    const data = await request<{ status?: string; message?: string }>({
      url: `${USER_SERVICE_BASEURL}/auth/forgot-password`,
      method: "POST",
      body: { ...body, url: location.origin + "/reset-password" },
    });
    if (data?.status === "success") toast.success(data?.message || "Reset link sent");
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center">
          <img className="w-20" src="/logo.png" alt="OnDo logo" />
          <p className="text-6xl font-medium font-kanit bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">OnDo</p>
        </div>

        <p className="text-2xl font-medium mt-5 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          Forgot Password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-[29rem]">
          <TextField
            {...register("email")}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            type="email"
            label="Company Email"
            sx={inputActiveStyle}
          />
          <button
            disabled={loading}
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-red-800 py-4 rounded-2xl text-white text-xl w-full"
          >
            Submit <ArrowForward />
          </button>

          <p className="text-center">
            Ready to login?{" "}
            <Link to={"/login"} className="underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}