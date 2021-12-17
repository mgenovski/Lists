import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext.js';

function PrivateRoute({ children }) {
    const { user } = useAuthContext();
    return user.accessToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;