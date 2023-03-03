import { Outlet, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content 
  if (!persist) {
    console.log("No Persist");
    content = <Outlet/>
  }else if(isLoading){
    console.log("Loading");
    content = <PulseLoader color={"#FFF"}/>
  }else if(isError){
    console.log("error");
    content = (
        <p className="errmsg">
            {`${error?.data?.message} - `}
            <Link to="/login">Please Login Again</Link>
        </p>
    )
  }else if(isSuccess && trueSuccess){
    console.log("success");
    content = <Outlet/>
  }else if(token && isUninitialized){
    console.log(isUninitialized);
    content = <Outlet/> 
  }

  return content
};

export default PersistLogin
