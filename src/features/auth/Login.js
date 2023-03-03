import { useRef, useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import usePersist from "../../hooks/usePersist";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../../index';



const Login = () => {


    const userRef = useRef()
    const errRef = useRef()
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [persist, setPersist] = usePersist();

    // const { userEmail } = useParams();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation();

    const isInvalid = password === "" || username === "";

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }))
            setUserName('')
            setPassword('')
            console.log("Login don happen...");
            toast.success("Login successfully");
            navigate('/dashboard')
        } catch (error) {
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
            } else if(error.status) {
                setErrMsg("No Server Response")
                toast.error("No Server Response");
            } else {
                setErrMsg(error.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUserName(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen";

    if (isLoading) {
        return <PulseLoader color={"#FFF"} />
    }


    return (
        <div className="container justify-center flex mx-auto max-w-screen-md items-center h-screen rounded-lg">
            {/* <header>
                <h1>Employee Login</h1>
            </header> */}
            {/* <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div> */}

            <ToastContainer />
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-400 mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logoPic.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                    {/* {errMsg && <p className="mb-4 text-xs text-red-primary">{errMsg}</p>} */}

                    <form className="form" onSubmit={handleSubmit}>
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
                            onChange={handleUserInput}
                            autoComplete="on"
                            required
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
                            value={password}
                            onChange={handlePwdInput}
                            autoComplete="off"
                            required
                        />

                        <div className="flex items-center mb-4">
                            <input
                                className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                type="checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            <label 
                            htmlFor="persist" 
                            className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                            >
                                Trust This Device
                            </label> 
                        </div>

                        {/* <div className="flex items-center mb-4">
                            <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="link-checkbox" className="ml-2 text-sm font-semibold text-gray-900 dark:text-gray-300">Default checkbox</label>
                        </div> */}

                        {/* <label class="contain">Two
                            <input type="checkbox"/>
                            <span class="checkmark"></span>
                        </label> */}

                        <button
                            disabled={isInvalid}
                            type="submit"

                            className={`flex justify-center items-center flex-col text-center bg-blue-600 text-black w-full rounded h-2 font-medium py-6 px-5 my-2
                            ${isInvalid && 'opacity-50'}`}
                        >
                            Sign In
                        </button>
                        <Link to="/forgot-password" style={{ color: "rgb(37 99 235)" }} className="text-sm font-medium text-blue-600">
                            Forgot Password?
                        </Link>
                    </form>


                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-400">
                    <p className="text-sm text-slate-900">
                        You don't have an account?{` `}
                        <Link to="/register" style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                            Sign Up
                        </Link>
                        {/* color: rgb(37 99 235) */}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;