import React from "react";
import { getDataFromLocalStorage } from '../common_helper';

export default function useLocalStorage(key, value) { 
    const [storageValue, setStorageValue] = React.useState(() => getDataFromLocalStorage(key, value));
    React.useEffect(() => localStorage.setItem(key, JSON.stringify(storageValue)), [key, storageValue, value]);
    return [storageValue, setStorageValue]
}
