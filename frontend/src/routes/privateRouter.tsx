import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getCurrentUser } from '@/services/authService'
import { Navigate, redirect } from 'react-router'
import { useRouter } from './hooks'
import { useEffect } from 'react'
import { fetchProfileByEmail } from '@/redux/slices/userSlice'

export default function PrivatePage({requiredRole, component: Component}: {requiredRole?: string[], component: (() => JSX.Element )| React.LazyExoticComponent<() => JSX.Element>}) {
    const user = getCurrentUser()
    const userRole = useAppSelector(state => state.user.role)
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileByEmail());
    }, [])

    if(requiredRole && !requiredRole?.includes(userRole)) {
        router.back()

        return <Navigate to='/'/>
    }

    return (
        user?.email? <Component /> : <Navigate to='/login' replace/>
    )
}
