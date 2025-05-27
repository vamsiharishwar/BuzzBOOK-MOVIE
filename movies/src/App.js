import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Movie from "./components/Movie/Movie";
import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Booking/Booking";
import UserProfile from "./components/profile/UserProfile";
import AdminProfile from "./components/profile/AdminProfile";
import AddMovie from "./components/Movie/AddMovie";

function App() {
  const dispatch = useDispatch();
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    } else if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Movies" element={<Movie />} />
        {!isuserLoggedIn && !isadminLoggedIn && (
        <>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Auth" element={<Auth />} />
        </>
      )}
          
          {isuserLoggedIn&& !isadminLoggedIn && (<><Route path="/Booking/:id" element={<Booking />} />

           <Route path="/User" element={<UserProfile />} /></>)}


           {isadminLoggedIn&& !isuserLoggedIn && (<><Route path="/UserAdmin" element={<AdminProfile />} />
           <Route path="/Add" element={<AddMovie />} /> </>)}

          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
