/* eslint-disable no-unused-vars */
import { Route } from 'react-router-dom';
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { useIsAuthenticated } from '@azure/msal-react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from 'src/config';

const ProtectedRoutes = ({ auth, render: Component, ...rest }) => {
  const dispatch = useDispatch();
  const [token, token_store] = useAuth();
  const isAuthenticated = useIsAuthenticated();
  const pathdetails = { ...rest }
  const { instance } = useMsal();

  const handleLogin = (loginType) =>{
    instance.loginRedirect(loginRequest).catch(e =>{
     console.log(e);
    })
 }
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
            return <Component {...props} />;
        }
        else if(!isAuthenticated) {
          handleLogin();
        }
      }}
    />
  )
}


export default ProtectedRoutes;
