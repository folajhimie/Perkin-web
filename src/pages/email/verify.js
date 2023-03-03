import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/verified-icon.gif";
import Error from "../../assets/error.gif";
import axios from "axios";







const VerifiedOnlyRoute = () => {
    const { userId, uniqueString } = useParams();
    console.log(userId, "help me..", uniqueString, "father Me");
    const [dataLife, setData] = useState("");

    const selectHandle = async () => {
        const BACKEND_URL = "http://localhost:8080";
        try {
            const response = await axios.get(`${BACKEND_URL}/user/verify/${userId}/${uniqueString}`);
            console.log("object..", response.data);
            setData(response.data.userProfile[0])
            console.log(userId, uniqueString);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    }

    useEffect(() => {
        selectHandle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex flex-col items-center bg-white p-4 border border-gray-400 mb-4 rounded-xl">
            <h1 className="flex justify-center w-full">
                <img src="/images/logoPic.png" alt="Instagram" className="mt-2 w-3/12 mb-4" />
            </h1>

            <h1 className="flex flex-row justify-center items-center mb-6">
                <img src={Logo} alt="approve" width="80px" height="80px" style={{ opacity: 1 }} />
                <span
                    className="text-2xl text-slate-900 w-full mr-3 py-5 px-4 h-10 rounded mb-8"
                >Verified Account</span>
                {/* style={{border: "2px solid black", backgroundColor: "green"}} */}
            </h1>

            <div className="flex justify-center items-center flex-col w-full bg-white p-6 rounded ">
                <div className="text-sm text-slate-900">
                    <div className="flex justify-start items-center mb-4">Dear {dataLife.username},</div>
                    <div>Congratulations, Your account has been successfully verified.
                    </div>
                    <div className="flex flex-col justify-start my-4">
                        <div className="text-black font-medium text-sm mr-4 mb-1">
                            User Email Address:
                        </div>
                        <div className="text-blue-700 underline">
                            {dataLife.email}
                        </div>

                        <div className="my-3">
                            <div className=" text-black font-medium text-sm mr-4 mb-1">
                                User Mobile:
                            </div>
                            <div>
                                {dataLife.mobile}
                            </div>
                        </div>

                        <div className="my-1">
                            <div className=" text-black font-medium text-sm mr-4 mb-1">
                                User Role:
                            </div>
                            <div>
                                {dataLife.roles}
                            </div>
                        </div>
                        {/* <b className="text-lg font-medium flex justify-center items-center">{userEmail}</b> */}
                    </div>
                    <div className="flex justify-start items-center mb-5">Kindly click on the Link below to Login</div>
                    {/* <div class="rounded-full h-8 w-8 flex justify-center items-center uppercase text-white font-medium text-xl" style={{backgroundColor: "mediumturquoise"}}>{username[0]}</div> */}
                </div>
                <Link to="/login" style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                    Proceed
                </Link>

                {/* <Link to={`/login/${userEmail}`} style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                            Proceed
                        </Link> */}
                {/* <div className="d-none">{{setUserName}}</div> */}
            </div>
        </div>
    );
};


const Verify = () => {
    // const navigate = useNavigate();
    const { userId, uniqueString } = useParams();
    // console.log(userId, "help me..", uniqueString, "father Me");
    const [errMsg, setErrMsg] = useState("");
    const [isStatus, setIsStatus] = useState(false);
    const [dataLife, setDataLife] = useState("");
    // const dispatch = useDispatch();

    const submitHandler = async () => {
        const BACKEND_URL = "http://localhost:8080";

        try {
            const response = await axios.get(`${BACKEND_URL}/user/verify/${userId}/${uniqueString}`);

            console.log("object..", response.data);
            setDataLife(response.data)
            console.log("hello..", dataLife.status , dataLife.message);
            if (dataLife.status === false) {
                setIsStatus(true)
                setErrMsg(dataLife.message)
                console.log("Together with you..", errMsg, isStatus);
            }
            // console.log(response.data.userProfile[0]);
            console.log(userId, uniqueString);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
        }
    }

    useEffect(() => {
        submitHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container justify-center flex mx-auto max-w-screen-md items-center h-screen rounded-lg">
            <ToastContainer />
            <div className="flex flex-col w-4/5">
                {!isStatus ?
                    <VerifiedOnlyRoute /> 
                 : 
                    <div className="flex flex-col items-center bg-white p-4 border border-gray-400 mb-4 rounded-xl">
                        <h1 className="flex justify-center w-full">
                            <img src="/images/logoPic.png" alt="Instagram" className="mt-2 w-9/12 mb-4" />
                        </h1>

                        <h1 className="flex flex-row justify-center items-center mb-6">
                            <img src={Error} alt="approve" width="80px" height="80px" style={{ opacity: 1 }} />
                            <span
                                className="text-2xl text-slate-900 w-full mr-3 py-5 px-4 h-10 rounded mb-8"
                            >An Error Occured</span>
                            {/* style={{border: "2px solid black", backgroundColor: "green"}} */}
                        </h1>

                        <div className="flex justify-center items-center flex-col w-full bg-white p-6 rounded ">
                            <div className="text-sm text-slate-900">
                                <div className="text-lg text-slate-900 flex justify-start items-start mb-4 font-medium">{errMsg}</div>
                                {/* <div className="flex flex-col justify-start my-4">

                                </div> */}
                                <div className="flex justify-start items-center mb-5 my-4">Kindly click on the Link below to Login</div>
                                {/* <div class="rounded-full h-8 w-8 flex justify-center items-center uppercase text-white font-medium text-xl" style={{backgroundColor: "mediumturquoise"}}>{username[0]}</div> */}
                            </div>
                            <Link to="/login" style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                                Proceed
                            </Link>

                            {/* <Link to={`/login/${userEmail}`} style={{ color: "rgb(37 99 235)" }} className=" font-medium text-blue-600">
                                Proceed
                            </Link> */}
                            {/* <div className="d-none">{{setUserName}}</div> */}
                        </div>
                    </div>
                 }
                {/* <VerifiedOnlyRoute /> */}
            </div>
        </div>
    );
}

export default Verify;