import React from "react";

import Authform from "./Authform";
import { sendUserAuthentication } from "../../apihelpers/api-helper";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
import { useNavigate } from "react-router-dom";
const Auth=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onResRecived=(data)=>{
        console.log(data);
        dispatch(userActions.login())
        localStorage.setItem("userId",data.id)
        navigate("/")

    }
    const getData=(data)=>{
        console.log("Auth",data);
        sendUserAuthentication(data.inputs,data.signup)
        .then(onResRecived)
        .catch((err)=>console.log(err));
    }
    return(<div>
        <Authform onSubmit={getData} isAdmin={false} />
    </div>
)
};
export default Auth;