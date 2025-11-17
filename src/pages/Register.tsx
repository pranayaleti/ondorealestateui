import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useApiRequest from "../hooks/useApiRequest";
import { getLogoPath } from "@/lib/logo";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Min 6 characters" }),
});

type FormType = z.infer<typeof formSchema>;


export default function Register() {
  const { register, handleSubmit, formState: { errors } } =
    useForm<FormType>({ resolver: zodResolver(formSchema) });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { request, loading } = useApiRequest();

  const onSubmit = async (body: FormType) => {
    const data = await request<{ status?: string; message?: string }>({
      url: `/auth/signup`,
      method: "POST",
      body,
    });
    if (data?.status === "success") {
      toast({
        title: "Success",
        description: "Account created. Please login.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-center">
          <img className="w-20 h-auto" src={getLogoPath()} alt="Ondo Real Estate logo" />
          <p className="text-6xl font-medium font-kanit bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            Ondo Real Estate
          </p>
        </div>

      <p className="text-2xl font-medium mt-5 bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
        Create your account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-[29rem]">
        <div className="w-full">
          <Label htmlFor="name">Full Name</Label>
          <Input
            {...register("name")}
            id="name"
            placeholder="Enter your full name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div className="w-full">
          <Label htmlFor="email">Company Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Enter your email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Enter your password"
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-red-800 py-4 rounded-2xl text-white text-xl w-full"
        >
          Submit <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

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