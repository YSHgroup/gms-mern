import { getCurrentUser } from '@/services/authService'
import { Navigate } from 'react-router'

export default function PrivatePage({component: Component}: {component: () => JSX.Element | JSX.Element}) {
    const user = getCurrentUser()
    
    return (
        user? <Component /> : <Navigate to='/login' replace/>
    )
}
