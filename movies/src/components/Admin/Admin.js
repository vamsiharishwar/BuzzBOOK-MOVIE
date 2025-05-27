import React from "react";
import Authform from "../Auth/Authform";
import { sendAdminAuthRequest } from "../../apihelpers/api-helper";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";
const Admin=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const onResRecived =(data)=>{
        console.log(data);
        dispatch(adminActions.login())
        localStorage.setItem("adminId",data.id);
        localStorage.setItem("token",data.token);
        navigate("/")

    }

    const getData=(data)=>{
        console.log("Admin",data);
        sendAdminAuthRequest(data.inputs)
        .then(onResRecived)
        
        .catch((err)=>console.log(err));
        
    }
    return <div>
        <Authform onSubmit={getData} isAdmin={true}/>
    </div>
};
export default Admin;