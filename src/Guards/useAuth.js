import {useSelector} from 'react-redux';
import { getTokenFromLocalStorage } from '../Services/LocalStorageService';

export default function useAuth() {
    const token  = getTokenFromLocalStorage();
    const token_store = useSelector(state => state.userToken);
  
    return [token, token_store];
}