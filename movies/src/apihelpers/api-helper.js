import axios from "axios";

export const getAllMovies=async()=>{
    const res=await axios
    .get("/movie")
    .catch((err)=>console.log(err));

    if(res.status!==200){
        return console.log("No data");
    }
    const data=await res.data;
    return data;

}

export const sendUserAuthentication = async (data, signup) => {
  try {
    const res = await axios.post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    // Check response status
    if (res.status !== 200 && res.status !== 201) {
      console.error("Unexpected response status:", res.status);
      return null;
    }

    return res.data;
  } catch (err) {
    console.error("Error in sendUserAuthentication:", err.response?.data || err.message);
    return null;
  }
};

export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post("/admin/login", {
      email: data.email,
      password: data.password,
    });

    if (res.status !== 200 && res.status !== 201) {
      console.error("Unexpected response status:", res.status);
      return null;
    }

    return res.data;
  } catch (err) {
    console.error("Error in sendAdminAuthRequest:", err.response?.data || err.message);
    return null;
  }
};

export const getMovieDetails=async (id)=>{
  const res=await axios
  .get(`/movie/${id}`)
  .catch((err)=>console.log(err));
   if (!res || res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;

}

export const newBooking=async (data)=>{
  const res=await axios.post('/booking',{
    movie:data.movie,
    seatNumber:data.seatNumber,
    date:data.date,
    user:localStorage.getItem("userId"),
  }).catch((err)=>console.log(err));
   if (!res || res.status !== 201) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;

  
}


export const getUserBookings=async()=>{
  const id=localStorage.getItem("userId")
  const res=await axios.get(`/user/bookings/${id}`)
  .catch((err)=>console.log(err));
  if (!res || res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;
}

export const deleteBooking=async (id)=>{
  //const id=localStorage.getItem("userId")
  const res=await axios
  .delete(`/booking/${id}`)
  .catch((err)=>console.log(err));
  if ( res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;
}

export const getUserDetails= async ()=>{
  const id=localStorage.getItem("userId");
  const res=await axios
  .get(`/user/${id}`)
  .catch((err)=>console.log(err));
  if ( res.status !== 200) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;
}

export const addMovie =async (data)=>{
  const res=await  axios
  .post("/movie",{
    title:data.title,
    description:data.description,
    releaseDate:data.releaseDate,
    posterUrl:data.posterUrl,
    featured:data.featured,
    actors:data.actors,
    admin:localStorage.getItem("adminId"),
  },{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    }
  }).catch((err)=>console.log(err))

  if ( res.status !== 201) {
    return console.log("Unexpected error");
  }
  const resData=await res.data;
  return resData;
}


export const getadminById = async () => {
  if (typeof window === "undefined") {
    console.error("localStorage is not available in Node.js");
    return;
  }

  const adminId = localStorage.getItem("adminId");
  console.log(adminId);
  
  try {
    const res = await axios.get(`/admin/${adminId}`);
    if (res.status !== 200) {
      console.log("Unexpected error");
      return;
    }
    const resData=await res.data;
    return resData;
  } catch (err) {
    console.error("Error fetching admin by ID:", err);
  }
};


