import { useLocation, useHistory } from "react-router-dom";
import { updateURL } from "../common_helper";
export default function useURL() {
  const history = useHistory();
  const location = useLocation();
  const queryParameters = new URLSearchParams(location?.search);
  const getURLData = (name) => queryParameters?.get(name) || "";
  const setURLData = (name, value) => history.push(updateURL(name, value));
  return { getURLData, setURLData };
}
