import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"


function ResetPassword() {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const {register, handleSubmit } = useForm()
    const urlParams = new URLSearchParams(window.location.search);
    const userid = urlParams.get('userId');
    const secret = urlParams.get('secret');
    
    const resetPassword = async (data) =>{
        try{

            console.log(userid, secret); 
            await authService.resetPassword(userid, secret, data.password, data.password);
            navigate("/login");
            
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='flex items-center justify-center w-full p-20' >
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/90`}>
                <div className="mb-2 flex justify-center ">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Reset Password</h2>
                
                <form onSubmit={handleSubmit(resetPassword)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Enter New Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Repeat New Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Change Password</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword
