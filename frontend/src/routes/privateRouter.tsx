import { useAppSelector } from '@/redux/hooks'
import { getCurrentUser } from '@/services/authService'
import { Navigate } from 'react-router'
import { useRouter } from './hooks'
import { useEffect } from 'react'

export default function PrivatePage({requiredRole, component: Component}: {requiredRole?: string[], component: (() => JSX.Element )| React.LazyExoticComponent<() => JSX.Element>}) {
    const user = getCurrentUser()
    const userRole = useAppSelector(state => state.user.role)
    const router = useRouter()

    // Protect page based on role if requiredRole is provided
    useEffect(() => {
        if(requiredRole && !requiredRole?.includes(userRole)) {
            router.forward()
        } 
    }, [])

    return (
        user?.email? <Component /> : <Navigate to='/login' replace/>
    )
}
