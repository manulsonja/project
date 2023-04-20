import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function PrivateRoute({ children }) {
	let { name } = useContext(AuthContext);
    console.log(name);
    return name ? <>{children}</> : <Navigate to="/login" />;
  }
  
export default PrivateRoute;
