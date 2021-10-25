import { useContext } from "react/cjs/react.development";
import { AuthContext } from "./AuthProvider";


export default function useAuth(params) {
    const contextvalue=useContext(AuthContext)
    return contextvalue
}