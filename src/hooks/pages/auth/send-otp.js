import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const SendOTP = () => {

    const navigate = useNavigate();
    const { resetToken } = useParams();
    const RE_DIGIT = new RegExp(/^\d+$/);
    const [errMsg, setErrMsg] = useState(""); 
    const valueLength = 4;
    const [otp, setOtp] = useState('');

    const valueItems = useMemo(() => {
        const valueArray = otp.split('');
        const items = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [otp, valueLength]);

    const focusToNextInput = (target) => {
        const nextElementSibling =
            target.nextElementSibling;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target) => {
        const previousElementSibling =
            target.previousElementSibling;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const onChange = (value) => setOtp(value);

    const inputOnChange = (
        e,
        idx
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling;

        // only delete digit if next input element has no value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                otp.substring(0, idx) + targetValue + otp.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };
    const inputOnKeyDown = (e) => {
        const { key } = e;
        const target = e.target;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }

        focusToPrevInput(target);
    };
    const inputOnFocus = (e) => {
        const { target } = e;

        // keep focusing back until previous input
        // element has value
        const prevInputEl =
            target.previousElementSibling;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };


    const verifyCode = async (e) => {
        e.preventDefault();
        const userData = {
            code: otp
        }
        

        const BACKEND_URL = "http://localhost:8080";

        try {
            const response = await axios.post(
                `${BACKEND_URL}/user/get-code`, 
                userData
            );
            console.log("responding...", response.data);
            toast.success(response.data.message);
            // const resetToken = response.data.data
            const tokenCode = response.data.code;
            console.log("happy Code...", tokenCode);
            // setEmail("");
            if (tokenCode === otp) {
                navigate(`/reset-password/${resetToken}`);
                console.log("Login in to the world", );
                toast.success(response.data.message);
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

    const sendCode = async (e) => {
        e.preventDefault();
        

        const BACKEND_URL = "http://localhost:8080";

        try {
            const response = await axios.put(
                `${BACKEND_URL}/user/send-otp/${resetToken}`,
                otp
            );
            console.log("responding...", response.data);
            // const resetToken = response.data.data
            toast.success(response.data.message);
            // setEmail("");
            // if (response.data.status === true) {
            //     navigate(`/send-otp/${resetToken}`);
            //     return;
            // }
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



    return (
        <div className="container justify-center flex mx-auto max-w-screen-md items-center h-screen rounded-lg">
            <ToastContainer />
            {/* {otp} */}
            <div className="flex flex-col w-10/12">
                <h1 className="flex justify-center w-full mb-6">
                    <img src="/images/logoPic.png" alt="space box" className="mt-2 w-3/12 mb-4" />
                </h1>
                <div className="shadow-lg flex flex-col items-center bg-white p-4 mb-4 rounded">

                    <h1 className="font-medium text-lg text-blue-700 mb-4 flex justify-center items-center w-full"> Reset my password</h1>
                    <h3 className="font-extralight text-base text-black flex justify-center items-center w-full">
                        Enter the code sent to your email address to reset
                    </h3>
                    <div className="font-extralight text-base text-black mb-10 flex justify-center items-center w-full">your password.</div>

                    <form className="form w-4/5" onSubmit={verifyCode}>
                        <div className="flex justify-center items-center space-x-3">
                            {valueItems.map((digit, index) => {
                                return (

                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="one-time-code"
                                        pattern="\d{1}"
                                        maxLength={valueLength}
                                        value={digit}
                                        className="w-16 h-16 border-2 rounded bg-sky-50 outline-none text-center font-semibold text-xl spin-button-none border-gray-100 focus:border-blue-700 focus:text-gray-700 text-gray-700 transition"
                                        onChange={(e) => inputOnChange(e, index)}
                                        onKeyDown={inputOnKeyDown}
                                        onFocus={inputOnFocus}

                                    />
                                );
                            })}
                        </div>

                        {errMsg && <p className="mb-4 text-sm text-red-700 ">{errMsg}</p>}

                        <button
                            onClick={verifyCode}
                            type="submit"
                            className="flex justify-center items-center flex-col text-center bg-blue-600 text-white w-full rounded h-2 font-medium text-base py-7 px-5 mt-8 mb-2 opacity-100"
                        >
                            Reset my password
                        </button>
                       
                    </form>
                    <div className="mb-6 flex justify-center items-center flex-col w-full bg-white p-4 rounded">
                        <p className="font-extralight text-sm text-slate-900">
                            Didn’t get OTP?{` `}
                            <button
                                type="submit"
                                onClick={sendCode}
                                style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600"
                            >
                                Resend OTP
                            </button>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}



export default SendOTP;