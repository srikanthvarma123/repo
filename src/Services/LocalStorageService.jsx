const storeUserDetailsToLocalStorage =(value) =>{
    localStorage.setItem('UserDetails', JSON.stringify(value));
};


const getUserDetailsFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('UserDetails'));
};

const getTokenFromLocalStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    if(userInfo != null){
        return userInfo?.tokenInformaiton?.accessToken;
    }else{
        return null;
    }
    
}

const getZoneFromLocalStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    if(userInfo != null){
        return userInfo.Zone;
    }else{
        return null;
    }
}

const getUserAccountFromLocalStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    if(userInfo != null){
        return userInfo?.tokenInformaiton?.account;
    }else{
        return null;
    }
}

const getUserNameFromLocalStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    if(userInfo != null){
        return userInfo.UserAccount;
    }else{
        return null;
    }
}

const getUserFLnameFromLocalStorage = () =>{
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    if (userInfo != null ) {
        return userInfo?.tokenInformaiton?.userFirstName +" "+ userInfo?.tokenInformaiton?.userLastName;
    }
    else{
        return null;
    }
}

const getUserNameFromSessonStorage = () =>{
    let userInfo = JSON.parse( sessionStorage.getItem("b97b6ba0-f6f7-4ff5-b57d-31ec4220c3b8.b5b66d0f-c562-4c91-bb19-e59a13317aab-login.windows.net-28408e06-9b09-43c5-9ad6-10808914b282"));
    if (userInfo !== null) {
        return userInfo?.idTokenClaims?.name;
    }
    else{
        return null;
    }
}

const setWarehouseDetails =(object)=>{
    localStorage.setItem('warehouseData',JSON.stringify(object))
}

const getWarehouseDetails =()=>{
 let warehousedetails = JSON.parse(localStorage.getItem('warehouseData'))
 return warehousedetails;
}

const getUserLoggedInURLFromLocalStorage = () => {
    let userInfo = JSON.parse(localStorage.getItem('UserDetails'));
    return userInfo.LoginURL;
}

const deleteUserDetails = () =>{
    localStorage.removeItem('UserDetails');
}

export {
    getWarehouseDetails,
    setWarehouseDetails,
    storeUserDetailsToLocalStorage,
    getUserDetailsFromLocalStorage,
    getTokenFromLocalStorage,
    getZoneFromLocalStorage,
    getUserAccountFromLocalStorage,
    getUserNameFromLocalStorage,
    getUserLoggedInURLFromLocalStorage,
    deleteUserDetails,
    getUserFLnameFromLocalStorage,
    getUserNameFromSessonStorage
    }