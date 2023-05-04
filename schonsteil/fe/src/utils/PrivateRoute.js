import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

function isAuth() {
  let token = localStorage.getItem('refresh');
  if(token) return true;
  return false;
}
function PrivateRoute({ children }) {
  
    return isAuth ? <>{children}</> : <Navigate to="/login" />;
  }
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps)(PrivateRoute);
