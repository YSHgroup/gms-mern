import { getCurrentUser } from "@/services/authService"
import { Navigate } from "react-router"


export function withAuthRedirect (WrappedComponent: () => JSX.Element) {
    return (props: any) => {
        const user = getCurrentUser()

        if(!!user) {
            return <Navigate to='/'/>
        }

        return <WrappedComponent {...props}/>
    }
}