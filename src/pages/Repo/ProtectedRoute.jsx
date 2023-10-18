import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useGlobalContext } from '../../context';

const ProtectedRoute = ({ children }) => {
  const { user } = useGlobalContext();

    
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
