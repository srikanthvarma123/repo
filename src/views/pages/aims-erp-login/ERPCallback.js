/* eslint-disable no-useless-escape */
import { useEffect } from 'react';
import { CContainer, CRow, CCol, CSpinner } from '@coreui/react';
import { LoginService_GetToken } from '../../../Services/Login.service';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { storeUserDetailsToLocalStorage, deleteUserDetails, getUserLoginPrefixFromLocalStorage } from '../../../Services/LocalStorageService';

export default function ERPCallback() {
    const history = useHistory();
    // const menuItems = navigations;
    const dispatch = useDispatch();
    useEffect(() => {
        getTokenAndDetails();
    });
   
    function getTokenAndDetails() {
        // let clientKey = localStorage.getItem('accountName');
        let currentUrl = window.location.href;
        let urlParams = new URLSearchParams(currentUrl);
        let securityCode = currentUrl.split("&")[0].split("?")[1].split("=")[1];
        let zone = urlParams.get("zone");
        let loginURL = urlParams.get("loginURL"); 
        let logoutURL = loginURL;
        if(loginURL.includes('/#/')){
            logoutURL = logoutURL.replace('/#/', '/');
        }

        let loginAccountCode = "";
        loginAccountCode = urlParams.get("prefix");
        
        // if (`${process.env.REACT_APP_IS_DEVMODE}` === 'true') {
        //     loginAccountCode = "";
        // }else{
           
        // }

       

        LoginService_GetToken(securityCode, zone).then(res => {
            if (res?.data?.statusCode === 200) {
                //Construct logged in user object
                let data = res?.data?.tokenInformaiton;
                const UserDetails = {
                    UserName: data?.userName,
                    UserAccount: data?.account,
                    UserToken: data?.accessToken,
                    Zone: data?.zone,
                    AppVersion: res?.data?.appVersion,
                    LoginURL: loginURL,
                    Firstname: data?.userFirstName,
                    LastName: data?.userLastName,
                    CompanyName: data?.companyName,
                    Database: data?.databaseName,
                    LoginAccountCode : loginAccountCode,
                    access : res?.data?.accessList
                };
                //Update user details to local storage
                storeUserDetailsToLocalStorage(UserDetails);
                dispatch({ type: 'set', userLoginDetails: UserDetails });

                //Get User login account code
                const clientAccount = `loginprefix=${getUserLoginPrefixFromLocalStorage()}`;
                //If API response says user maintance, Display maintance page.
                if (res?.data?.isUnderMaintenance) {
                    const maintenanceURL = `/undermaintenance?${clientAccount}`;
                    history.push(maintenanceURL);
                } else {
                    //If API says security code was valid, navigage to the additional routes if available.
                    //If No additional routes was available navigate to dashboard.
                    let additionalRoutes = urlParams.get("addtionalroutes");
                        if (additionalRoutes === '' || additionalRoutes === null || additionalRoutes === '/') {
    
                            const dashURL = `/dashboard?${clientAccount}`;
                            history.push(dashURL);
                        } else {
                            additionalRoutes = getAdditionalRoutesWithAccountParam(additionalRoutes);
                            history.push(additionalRoutes);
                        }
                }
            } else {        
                deleteUserDetails();        
                window.location.replace(logoutURL);
                console.log('Login failed');
            }
        }).catch(e => {      
            deleteUserDetails();       
            window.location.replace(logoutURL);          
            console.log(e);
        });       
    }
   
    function getAdditionalRoutesWithAccountParam(additionalRoutes){
        //Get User login account code
        const clientAccount = `loginprefix=${getUserLoginPrefixFromLocalStorage()}`;        
        if(additionalRoutes?.includes('?')){
            additionalRoutes = `${additionalRoutes}&${clientAccount}`;
        }else{
            additionalRoutes = `${additionalRoutes}?${clientAccount}`;
        } 
        return additionalRoutes;
    }

    return (
        <>
            <div className="c-app c-default-layout flex-row align-items-center">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md="5 text-center">
                            <CSpinner className="text-primary" component="span" size="lg" aria-hidden="true" />
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </>
    )
}
