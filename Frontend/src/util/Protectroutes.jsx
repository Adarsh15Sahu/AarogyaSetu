
import { Navigate , useNavigate} from "react-router-dom"
import { getAuth } from "./auth"
// import { Children } from "react"

const ProtectedRoute = ({ children, allowedRole }) =>{
    const { token, role } = getAuth();
    const navigate = useNavigate();
    if (!token) {
        // alert("login");
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && allowedRole !== role) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default ProtectedRoute;