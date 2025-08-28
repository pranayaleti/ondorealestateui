import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useApiRequest from "../hooks/useApiRequest";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
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

export default function Register() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormType>({ resolver: zodResolver(formSchema) });

  const navigate = useNavigate();
  const USER_SERVICE_BASEURL = import.meta.env.VITE_USER_BASEURL;
  const { request, loading } = useApiRequest();

  const onSubmit = async (body: FormType) => {
    const data = await request<{ status?: string; message?: string }>({
      url: `${USER_SERVICE_BASEURL}/auth/signup`,
      method: "POST",
      body,
    });
    if (data?.status === "success") {
      toast.success("Account created. Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center">
          <img className="w-20" src="/logo.png" alt="OnDo logo" />
          <p className="text-6xl font-medium font-kanit bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            OnDo
          </p>
        </div>

      <p className="text-2xl font-medium mt-5 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        Create your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-[29rem]">
        <TextField
          {...register("name")}
          error={!!errors.name?.message}
          helperText={errors.name?.message}
          label="Full Name"
          sx={inputActiveStyle}
        />
        <TextField
          {...register("email")}
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          type="email"
          label="Company Email"
          sx={inputActiveStyle}
        />
        <TextField
          {...register("password")}
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          type="password"
          label="Password"
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
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  </div>
  );
}