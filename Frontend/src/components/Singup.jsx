import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F0F8FF] p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg flex flex-col gap-5 p-6 w-full max-w-md bg-white rounded-lg"
      >
        <div className="my-2">
          <h1 className="text-center text-lg font-bold">LOGO</h1>
          <p className="font-['serif'] font-semibold mt-2 text-center text-[1.25rem]">
            Signup to see photos and videos from your friends
          </p>
        </div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            className="focus-visible:ring-transparent w-full"
            id="username"
            type="text"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            className="focus-visible:ring-transparent w-full"
            id="email"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            className="focus-visible:ring-transparent w-full"
            id="password"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>
        <Button type="submit" className="w-full">
          Signup
        </Button>
        <Link className="text-center text-sm px-4 py-2 font-semibold font-mono bg-blue-500" to="/login ">Signup-now</Link>

      </form>
    </div>
  );
};

export default Signup;
