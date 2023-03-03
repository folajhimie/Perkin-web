import { useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import PulseLoader from "react-spinners/PulseLoader";
// import usePersist from "../../hooks/usePersist";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../../assets/approve.png"




const EmailSent = () => {
    // const navigate = useNavigate();
    const { userEmail } = useParams();
    const [username, setUserName] = useState(userEmail);
    // const [username, setUserName] = useState("");
    // const dispatch = useDispatch();
    console.log(setUserName);

    return (
        <div className="container justify-center flex mx-auto max-w-screen-md items-center h-screen rounded-lg">
            <ToastContainer/>
            <div className="flex flex-col w-3/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-400 mb-4 rounded-xl">
                    <h1 className="flex justify-center w-full">
                    <img src="/images/logoPic.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    <h1 className="animate-bounce mb-6">
                        <img src={Logo} alt="approve" width="80px" height="80px" style={{opacity: .8}} /> 
                        {/* style={{border: "2px solid black", backgroundColor: "green"}} */}
                    </h1>

                    <div className="flex justify-center items-center flex-col w-full bg-white p-6 rounded ">
                        <div className="text-sm text-slate-900">
                            <div className="flex justify-center items-center p-3"> Account Confirmation</div>
                            <div>An email with your account confirmation link has been sent to your email:
                            </div>
                            <div className="flex justify-start items-center p-2 m-2 rounded-full border-2 border-zinc-500">
                                <span class="rounded-full h-8 w-8 flex justify-center items-center uppercase text-white font-medium text-xl mr-6" style={{backgroundColor: "mediumturquoise"}}>{username[0]}</span>
                                <b className="text-lg font-medium flex justify-center items-center">{userEmail}</b>
                            </div>
                            <div className="flex justify-start items-center mb-5">Check your email and come back to Proceed</div>
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
            </div>
        </div>
    );
}

export default EmailSent;