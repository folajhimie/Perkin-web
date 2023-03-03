import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "./authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setRegistration } from "./authSlice";
// import axios from "axios";



const Register = () => {

    const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    // const { userEmail } = useParams();
    // const [persist, setPersist] = usePersist();

    const [register, { isLoading }] = useRegisterMutation();
    // const [usernames , setUserName] = useState('')
    var [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        email: "",
    });

    // create a ref for the email input field
    const emailInput = useRef();

    // create a ref for the password input field
    const passwordInput = useRef();

    // create a ref for the confirm password input field
    const confirmPasswordInput = useRef();

    const mobileInput = useRef();

    var { username, password, confirmPassword, email, mobile } = formData;

    const isInvalid = confirmPassword === "" || mobile === "" || password === "" || email === "" || username === "";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        userRef.current.focus();
        emailInput.current.focus();
        passwordInput.current.focus();
        confirmPasswordInput.current.focus();
        mobileInput.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("")
    }, [username, password, confirmPassword, email, mobile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("error");
            toast.error("Password does not match");
        }

        // const userInpt = userRef.current.value;
        // const emailInpt = emailInput.current.value;
        // const passwrd = passwordInput.current.value;
        // const cPassword = confirmPasswordInput.current.value;
        // const mobileInpt = mobileInput.current.value;



        try {
            // const { data } = await register
            const { token, status, message } = await register({ username, password, confirmPassword, email, mobile }).unwrap();
            // const { status , message } = await register();
            // console.log("status is LIFE..", register().unwrap());
            console.log("token api..", status, message);
            console.log("created for Eterenality..", username, email);
            dispatch(setRegistration(token))
            if (status === "Pending") {
                console.log(status, "message");
                toast.success("Created Successfully");
                navigate(`/emailsent/${email}`);
                return;
            }
            console.log("only user..", token, status)
            // username = "";
            // password = "";
            // confirmPassword = "";
            // mobile = "";
            // email = "";
            console.log("SUCCESSFULLY..");
            toast.success("User successfully Created");
            navigate("/login")
        } catch (error) {
            // const { message } = await register();
            console.log("Apparently the Message..", error.data.message);
            console.log("email Response...", error.data.message.toLowerCase().includes("username"));
            if (error.status === 400) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.data.message.toLowerCase().includes("email")) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.data.message.toLowerCase().includes("username")) {
                setErrMsg(error.data.message);
                toast.error(error.data.message);
            } else if (error.status === 401) {
                setErrMsg("UnAuthorized");
                toast.error("UnAuthorized");
            } else if (error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            errRef.current.focus();
        }

    }

    // const selectHandle = async () => {
    //     const BACKEND_URL = "http://localhost:8080";
    //     let dating = Date.now();
    //     try {
    //         const response = await axios.get(`${BACKEND_URL}/user/verify/63a5daab95ee7945c9e65e25/02ff77cf-3c23-49cb-9f0e-1316e2e1026363a5daab95ee7945c9e65e25`);
    //         let showDate = dating + 18000;
    //         console.log("object..", response.data, showDate);
    //         return response.data;
    //     } catch (error) {
    //         const message =
    //             (error.response && error.response.data && error.response.data.message) ||
    //             error.message ||
    //             error.toString();
    //         toast.error(message);
    //     }
    // }

    useEffect(() => {
        document.title = 'Sign Up - Perkin';
    }, []);

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }

    // const handleUserInput = (e) => setUserName(e.target.value);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <ToastContainer />
            <div className="boldline flex w-3/5 ">
                <img src="/images/auth-banner-padded-min.png" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5 mt-12">
                <div className="mt-12 flex flex-col items-center bg-white p-4 border border-gray-300 mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logoPic.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    {errMsg && <p className="mb-4 text-xs text-red-primary">{errMsg}</p>}

                    <form onSubmit={handleSubmit} method="POST">
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="username"
                        >Username:</label>
                        <input
                            id="username"
                            aria-label="Enter your username"
                            ref={userRef}
                            name="username"
                            value={username}
                            type="text"
                            placeholder="Username"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            required
                        />
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="email"
                        >Email Address:</label>
                        <input
                            name="email"
                            aria-label="Enter your email address"
                            type="text"
                            placeholder="Email address"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            ref={emailInput}
                            value={email}
                        />
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="password"
                        >Password:</label>
                        <input
                            name="password"
                            type="password"
                            aria-label="Enter your Password"
                            placeholder="Enter your Password"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            ref={passwordInput}
                            value={password}
                        />
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="confirmPassword"
                        >Confirm Password:</label>
                        <input
                            aria-label="Enter your Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter your Confirm Password"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            ref={confirmPasswordInput}
                            value={confirmPassword}
                        />
                        <label
                            className="text-lg text-black mr-3 py-5 h-2 mb-2 font-medium"
                            htmlFor="mobile"
                        >Mobile:</label>
                        <input
                            aria-label="Enter your Phone Number"
                            name="mobile"
                            type="text"
                            placeholder="Enter your Phone Number"
                            className="text-sm text-slate-900 w-full mr-3 py-5 px-4 h-2 border border-gray-300 rounded mb-2"
                            onChange={handleChange}
                            ref={mobileInput}
                            value={mobile}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"

                            className={`flex justify-center items-center flex-col text-center bg-blue-600 text-black w-full rounded h-2 font-medium py-6 px-5 my-8
                            ${isInvalid && 'opacity-50'}`}
                        >
                            Sign Up
                        </button>


                        {/* <button
                            onClick={selectHandle}
                            type="submit"

                            className="flex justify-center items-center flex-col text-center bg-blue-600 text-black w-full rounded h-2 font-medium py-6 px-5 my-8"

                        >
                            Fire Up
                        </button> */}
                    </form>
                </div>
                <div className="mb-12 flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-300">
                    <p className="text-sm text-slate-900">
                        Have an account?{` `}
                        <Link to="/login" style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                            Login
                        </Link>
                        {/* color: rgb(37 99 235) */}
                    </p>
                </div>
            </div>
        </div>
    );


}


export default Register;