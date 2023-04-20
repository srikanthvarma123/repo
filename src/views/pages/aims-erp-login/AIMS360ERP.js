import { useEffect, useState } from 'react';
import { CSpinner } from '@coreui/react';
import { CContainer, CRow, CCol } from '@coreui/react';
import { LoginService_GetClientCode } from '../../../Services/Login.service';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux'

export default function AIMS360ERP() {

    const [error, setError] = useState(false);
    const [clientKey, setClientKey] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        getClientIdByCode();
    })

    function getClientIdByCode() {
        let baseUrl = (window.location.href);
        if (`${process.env.REACT_APP_IS_DEVMODE}` === 'true') {
            console.log("development mode enabled")
            setClientKey('JR365')
            dispatch({ type: 'set', accountName: clientKey });
            localStorage.setItem("accountName", clientKey);
        }
        else {
            var currentKey =  baseUrl.split('//')[1].split('.')[0].toUpperCase()
            if(currentKey?.includes("-")){
                currentKey = currentKey.split('-')[1];
            }
            setClientKey(currentKey);
            dispatch({ type: 'set', accountName: clientKey });
            localStorage.setItem("accountName", clientKey);
        }
            if (localStorage.getItem("BaseUrl") === null) {
                localStorage.setItem('BaseUrl', baseUrl);
            }
        if (clientKey) {
            LoginService_GetClientCode(clientKey).then(res => {
                let clientId = "";
                if (res?.data?.statusCode === 200) {
                    clientId = res?.data?.clientCode;
                    navigateToAimsLogin(clientId);
                }
            }).catch(e => {
                console.log("error");
                console.log(e);
                setError(true);
            });
        }
    }

    function navigateToAimsLogin(clientId) {
        let baseURL = localStorage.getItem('BaseUrl');
        baseURL = baseURL + 'clientcode';
        var erpLoginUrl = process.env.REACT_APP_ERP_AIMS_LOGIN;
        erpLoginUrl = erpLoginUrl.replace("[CLIENT_ID]", clientId).replace("[REDIRECT_URL]", baseURL);
        window.location.replace(erpLoginUrl);
    }
    return (
        <>
            <div className="c-app c-default-layout flex-row align-items-center">
                {
                    error ? <Redirect to="/" />
                        : <CContainer>
                            <CRow className="justify-content-center">
                                <CCol md="5 text-center">
                                    <CSpinner className="text-primary" component="span" size="lg" aria-hidden="true" />
                                </CCol>
                            </CRow>
                        </CContainer>
                }
            </div>
        </>
    )
}