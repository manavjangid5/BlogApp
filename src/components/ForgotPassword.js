import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from "./index"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function ForgotPassword() {

    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const passwordRecovery = async (data) => {
        setError("")
        try {
                const passrecover = await authService.passwordRecovery(data);
                if(passrecover)
                    navigate("/login")
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full p-20'>
            <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/90`}>
                <div className="mb-2 flex justify-center ">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Fill up the required detail(s) </h2>
                
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(passwordRecovery)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Send Link</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
