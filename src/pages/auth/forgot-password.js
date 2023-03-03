import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const emailInput = useRef();
    // const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        emailInput.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [email]);

    const forgot = async (e) => {
        e.preventDefault();
        if (!email) {
            setErrMsg("Please enter an email");
            return toast.error("Please enter an email")
        }

        if (!validateEmail(email)) {
            setErrMsg("Please enter a valid email");
            return toast.error("Please enter a valid email");
        }

        const userData = {
            email,
        };

        // await forgotPassword(userData);
        // setEmail("");

        const BACKEND_URL = "http://localhost:8080";

        try {
            const response = await axios.post(
                `${BACKEND_URL}/user/forgot-password`,
                userData
            );
            console.log("responding...", response.data);
            const resetToken = response.data.data
            toast.success(response.data.message);
            setEmail("");
            if (response.data.status === true) {
                navigate(`/send-otp/${resetToken}`);
                return;
            }
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                
            toast.error(message);
            setErrMsg(message);
        }
        // errRef.current.focus();


    };

    const handleUserInput = (e) => setEmail(e.target.value);

    return (
        <div className="container justify-center flex mx-auto max-w-screen-md items-center h-screen rounded-lg">
        <ToastContainer />
        <div className="flex flex-col w-12/12">
            <h1 className="flex justify-center w-full mb-6">
                <img src="/images/logoPic.png" alt="space box" className="mt-2 w-5/12 mb-4" />
            </h1>
            <h1 className="font-medium text-2xl text-black mb-4 flex justify-center items-center w-full"> Reset your password</h1>
            <h3 className="font-extralight text-base text-black mb-10 flex justify-center items-center w-full">
                Please enter your email address for us to send you OTP
            </h3>
            <div className="shadow-lg flex flex-col items-center bg-white p-4 mb-4 rounded">

                {/* <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p> */}
                {/* {errMsg && <p className="mb-4 text-xs text-red-primary">{errMsg}</p>} */}

                <form className="form w-4/5" onSubmit={forgot}>
                    <label
                        className="opacity-50 text-sm text-black mr-3 py-3 h-2 mb-2 font-medium"
                        htmlFor="email"
                    >Enter email:</label>
                    <input
                        id="email"
                        aria-label="Enter Email"
                        ref={emailInput}
                        name="email"
                        value={email}
                        type="text"
                        placeholder="Enter Your Email"
                        className="outline-none text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                        onChange={handleUserInput}
                        required
                    />
                    {errMsg && <p className="mb-4 text-sm text-red-700 ">{errMsg}</p>}

                    <button
                        type="submit"
                        className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-6 px-5 mt-8 mb-2 opacity-100"
                    >
                        Send me OTP
                    </button>
                    {/* <Link to="/forgot-password" style={{ color: "rgb(37 99 235)" }} className="text-sm font-medium text-blue-600">
                        Forgot Password?
                    </Link> */}
                </form>

            </div>
           
        </div>
    </div>
    );
};

export default ForgotPassword;
