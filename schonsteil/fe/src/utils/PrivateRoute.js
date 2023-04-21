import { Navigate } from "react-router-dom";

function isAuth() {
  let token = localStorage.getItem('refresh_token');
  if(token) return true;
  return false;
}
function PrivateRoute({ children }) {
  
    return isAuth() ? <>{children}</> : <Navigate to="/login" />;
  }
  
export default PrivateRoute;
