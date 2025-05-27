import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Link } from "react-router-dom";
const labelStyle={mt:0.5,mb:0.5}
const Authform=({onSubmit,isAdmin})=>{

    const[inputs,setinputs]= useState({
        name:"",
        email:"",
        password:""
    });
    const [isSignup,setSignup]= useState(false);
    
    const handleChange=(e)=>{
        setinputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,

        }));

    }
    const handleSubmit=(e)=>{
        e.preventDefault(); 
        onSubmit({inputs,signup:isAdmin?false:isSignup}); 
    };




    return <Dialog PaperProps={{style:{borderRadius:20}}} open={true} >
        <Box sx={{ml:"auto",padding:1}} >
            <IconButton LinkComponent={ Link} to="/" > <CancelRoundedIcon/></IconButton>
        </Box>
        <Typography
        variant="h4"
        textAlign={"center"} >
             {!isSignup? "Login":"Signup"}
        </Typography>
        <form onSubmit={handleSubmit} >
            <Box display={"flex"}
            padding={6}
            justifyContent={"center"}
            flexDirection={"column"}
            width={400}
            margin={"auto"}
            alignContent={"center"} >
                {!isAdmin && isSignup&&(
                    <><FormLabel sx={labelStyle}  > <b>Name</b></FormLabel>
                <TextField
                value={inputs.name} 
                onChange={handleChange}
                margin="normal" variant="standard" type="text" name="name" /></>
                )}
                
                
                <FormLabel sx={labelStyle}  > <b>Email</b></FormLabel>
                <TextField 
                value={inputs.email} 
                onChange={handleChange}
                margin="normal" variant="standard" type="email" name="email" />
                
                
                
                <FormLabel><b>Password</b></FormLabel>
                <TextField
                value={inputs.password} 
                onChange={handleChange}
                 margin="normal" variant="standard" sx={labelStyle}  type="password" name="password"/>
                <Button sx={{mt:2,borderRadius:10,bgcolor:"green", color:"white"}} 
                type="submit" 
                fullWidth 
                variant="contained">
                    {!isSignup? "Login":"Signup"}
                </Button>
                {!isAdmin&& <Button onClick={()=>setSignup(!isSignup)} sx={{mt:2,borderRadius:10, color:"white"}} 
                
                fullWidth 
                variant="contained">
                    Switch To {isSignup? "Login":"Signup"}
                </Button>}

            </Box>
        </form>
    </Dialog>
};
export default Authform;