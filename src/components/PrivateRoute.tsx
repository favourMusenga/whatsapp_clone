import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { rootState } from '../store/rootReducer';

interface PrivateRouteProps extends RouteProps {}
const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { isRegistered } = useSelector((state: rootState) => state.userInfo);

  if (isRegistered) {
    return <Route {...props} />;
  } else {
    const RedirectComponent = () => <Redirect to='/intro' />;
    return (
      <Route {...props} render={undefined} component={RedirectComponent} />
    );
  }
};
export default PrivateRoute;
