"use client"
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../src/Redux/featchers/auth/authApi";

function Register() {
  const [registerData] = useRegisterMutation()
  const { register, handleSubmit } = useForm();
  const onSubmit = async(data) => {
   console.log(data)
    const information = {
      // userName:data.userName,
      email : data.email,
      password : data.password,
      role:'User'
    }
  const res = await  registerData(information)
  console.log(res)
}



  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] max-w-md p-8 rounded-lg shadow-lg">
        <h3 className="text-center text-bold text-2xl underline mb-4">Welcome</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="text-center">
          {/* <input type="text" placeholder="User Name" className="w-full p-2 mb-2 border rounded-lg" {...register("userName", { required: true, maxLength: 20 })}/> <br /> */}
          <input type="email" placeholder="User Email" className="w-full p-2 mb-2 border rounded-lg" {...register("email", { required: true, maxLength: 20 })}/> <br />
          <input type="password" placeholder="User Password" className="w-full p-2 mb-2 border rounded-lg" {...register("password", { required: true, maxLength: 20 })}/> <br />
          <br />
          <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </form>
      </div>
    </div>
  );
}

export default Register;
