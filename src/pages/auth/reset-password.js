/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";




const ResetPassword = () => {


    // const errRef = useRef();
    const { resetToken } = useParams();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [isNumberValid, setIsNumberValid] = useState(false);
    const [isLowerValid, setIsLowerValid] = useState(false);
    const [isUpperValid, setIsUpperValid] = useState(false);
    const [isDigit, setIsDigit] = useState(false);
    const [isToggle, setIsToggle] = useState(true);
    const [isBackToggle, setIsBackToggle] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    // create a ref for the password input field
    const passwordInput = useRef();

    // create a ref for the confirm password input field
    const confirmPasswordInput = useRef();

    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const changeToggle = () => setIsToggle(!isToggle);
    const changeBackToggle = () => setIsBackToggle(!isBackToggle);
    // const handleUserInput = (e) => setPassword(e.target.value);
    const handleUserPassword = (e) => setConfirmPassword(e.target.value);



    useEffect(() => {
        passwordInput.current.focus();
        confirmPasswordInput.current.focus();
    }, []);



    function passwordVerify(e) {

        setPassword(e.target.value);
    
        if (password.length >= 8) {
            console.log("what is going on..", password);
            setIsNumberValid(true)
        }
    
        if (/[0-9]/.test(password)) {
            setIsDigit(true)
        }
    
        if (/[A-Z]/.test(password)) {
            setIsUpperValid(true)
        }
    
        if (/[a-z]/.test(password)) {
            setIsLowerValid(true)
        }
       
    
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setIsLoading(true)


        
        if (password !== confirmPassword) {
            console.log("error message..", errMsg)
            toast.error("Password does not match");
            setTimeout(() => {
                // Do something after the timeout
                window.location.reload();
            }, 8000);
        }

        if (!isNumberValid) {
            console.log("what is going on..", password);
            toast.error("At least 8 total characters");
            return;
        }
        if (!isLowerValid) {
            console.log("what is going on..", password);
            toast.error("At least 1 lower case character");
            return;
        }
        if (!isUpperValid) {
            console.log("what is going on..", password);
            toast.error("At least 1 upper case character");
            return;
        }
        if (!isDigit) {
            console.log("what is going on..", password);
            toast.error("At least 1 digit character");
            return;
        }



        const userData = {
            password,
            confirmPassword
        };

        const BACKEND_URL = "http://localhost:8080";
        try {
            const response = await axios.post(
                `${BACKEND_URL}/user/reset-password/${resetToken}`,
                userData
            );
            console.log("responding...", response.data);
            // const tokenCode = response.data.data;
            toast.success(response.data.message);
            console.log("Login in the Pattern..");
            
            // toast.success("User successfully Created");
            // setEmail("");
            if (response.data.status === true) {
                // setIsLoading(false)
                navigate("/login")
                
                return;
            }
            // if (status === "Pending") {
            //     console.log(status, "message");
            //     toast.success("Created Successfully");
            //     // navigate(`/emailsent/${email}`);
            //     return;
            // }

        } catch (error) {
            // const { message } = await register();
            console.log("Apparently the Message..", error.message);
            if (error.status === 400) {
                setErrMsg(error.message);
                toast.error(error.message);
            } else if (error.status === 401) {
                setErrMsg("UnAuthorized");
                toast.error("UnAuthorized");
            } else if (error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            // errRef.current.focus();
        }

    }

    useEffect(() => {
        document.title = 'Reset Password - Space Box';
    }, []);

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }

    return (
        <div className="h-9/12">
            <ToastContainer />
            <div className="h-9/12">

                <div className="flex flex-row">
                    <div className="bg-purple-800 px-6 py-5 basis-2/4">
                        <div className="px-4 sm:px-0">
                            {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3> */}
                            <h1 className="flex justify-center w-full animate-pulse mb-6">
                                <img src="/images/onBoarding.png" alt="space box" className="mt-2 w-12/12 mb-4" />
                            </h1>
                        </div>
                    </div>
                    <div className="w-9/12 px-6 py-5 mb-6 basis-2/4">
                        <div className="space-y-6 flex flex-col items-center justify-center">
                            <h1 className="font-medium text-2xl text-black mb-2 flex justify-center items-center w-full"> Change  your password</h1>
                            <h3 className="font-extralight text-base text-black mb-6 flex justify-center items-center w-full">
                                Please create new password below
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className="shadow sm:overflow-hidden sm:rounded-md">
                                    <h1 className="flex justify-center w-full pt-3 bg-white">
                                        <img src="/images/logoPic.png" alt="space box" className=" w-6/12" />
                                    </h1>
                                    <div className="space-y-1 bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-1 gap-2">
                                            <label
                                                className="opacity-50 text-sm text-black mr-3 py-3 h-2 mb-2 font-light"
                                                htmlFor="password"
                                            >Enter new password</label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    id="password"
                                                    aria-label="Password"
                                                    ref={passwordInput}
                                                    name="password"
                                                    value={password}

                                                    type={`${isToggle ? "password" : "text"}`}
                                                    placeholder="Password"
                                                    className="outline-none text-sm text-slate-900 w-full mr-3 py-6 px-4 h-2 border border-gray-300 rounded mb-2"
                                                    onChange={passwordVerify}
                                                    required
                                                />

                                                <div className="flex mt-3 flex-col h-6"
                                                    onClick={changeToggle}
                                                    style={{
                                                        position: 'relative',
                                                        width: "30px",
                                                        right: "45px",
                                                        lineHeight: "20px",
                                                    }}
                                                >
                                                    {
                                                        isToggle ?
                                                            <div className="cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                                </svg>
                                                            </div>

                                                            :
                                                            <div className="cursor-pointer"
                                                                style={{
                                                                    position: 'absolute',
                                                                    width: "40px",
                                                                    height: "40px",


                                                                    lineHeight: "20px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                    }
                                                </div>


                                            </div>
                                            {/* <div className="col-span-3 sm:col-span-2">
                                                
                                            </div> */}
                                        </div>

                                        <div className="grid grid-cols-1 gap-2">
                                            <label
                                                className="opacity-50 text-sm text-black mr-3 py-3 h-2 mb-2 font-light"
                                                htmlFor="confirmPassword"
                                            >Confirm Password</label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    id="confirmPassword"
                                                    aria-label="confirmPassword"
                                                    ref={confirmPasswordInput}
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    type={`${isBackToggle ? "password" : "text"}`}
                                                    placeholder="Confirm Password"
                                                    className="outline-none text-sm text-slate-900 w-full mr-3 py-6 px-4 h-2 border border-gray-300 rounded mb-2"
                                                    onChange={handleUserPassword}
                                                    required
                                                />

                                                <div className="flex mt-3 flex-col h-6"
                                                    onClick={changeBackToggle}
                                                    style={{
                                                        position: 'relative',
                                                        width: "30px",
                                                        right: "45px",
                                                        lineHeight: "20px",
                                                    }}
                                                >
                                                    {
                                                        isBackToggle ?
                                                            <div className="cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                                </svg>
                                                            </div>

                                                            :
                                                            <div className="cursor-pointer"
                                                                style={{
                                                                    position: 'absolute',
                                                                    width: "40px",
                                                                    height: "40px",


                                                                    lineHeight: "20px",
                                                                }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex justify-start w-full my-2">
                                                {
                                                    isLowerValid ?
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            </svg>

                                                            <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 lower case character
                                                            </span>

                                                        </div>
                                                        :
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 lower case character
                                                            </span>
                                                        </div>
                                                }

                                            </div>
                                            <div className="flex justify-start w-full my-2">
                                                {
                                                    isUpperValid ?
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            </svg>

                                                            <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 upper-case character
                                                            </span>
                                                        </div>
                                                        :
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 upper case character
                                                            </span>
                                                        </div>
                                                }
                                                {/* className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-6 px-5 mt-8 mb-2 opacity-100" */}
                                            </div>
                                            <div className="flex justify-start w-full my-2">
                                                {
                                                    isNumberValid

                                                        ?
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            </svg>

                                                            <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 8 total characters
                                                            </span>
                                                        </div>
                                                        :
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>

                                                            <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 8 total characters
                                                            </span>
                                                        </div>
                                                }

                                                {/* className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-6 px-5 mt-8 mb-2 opacity-100" */}
                                            </div>
                                            <div className="flex justify-start w-full my-2">
                                                {
                                                    isDigit

                                                        ?
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-teal-900">
                                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                            </svg>

                                                            <span className="text-teal-900 flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 digit character
                                                            </span>
                                                        </div>
                                                        :
                                                        <div className="flex justify-start w-full my-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7 text-gray-400">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>

                                                            <span className="flex justify-center items-center flex-col text-center h-2 font-light text-base ml-5 mt-2 mb-1 opacity-100">
                                                                At least 1 digit character
                                                            </span>
                                                        </div>
                                                }

                                                {/* className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-6 px-5 mt-8 mb-2 opacity-100" */}
                                            </div>
                                        </div>

                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700">Photo</label>
                                            <div className="mt-1 flex items-center">
                                                <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </span>
                                                <button
                                                    type="button"
                                                    className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </div> */}

                                        {/* <div>
                                            <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                                <div className="space-y-1 text-center">
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="file-upload"
                                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="bg-gray-50 px-4 py-5 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-4 px-6 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            {/* className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-6 px-5 mt-8 mb-2 opacity-100" */}
                                            Create new password
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default ResetPassword;