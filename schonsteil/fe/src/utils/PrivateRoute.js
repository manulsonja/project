import { Navigate } from "react-router-dom";

function isAuth() {
  let token = localStorage.getItem('refresh');
  if(token) return true;
  return false;
}
function PrivateRoute({ children }) {
  
    return true ? <>{children}</> : <Navigate to="/login" />;
  }
  
export default PrivateRoute;
