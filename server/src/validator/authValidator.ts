import { User } from "@/types/user"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const registrationValidator = (data: User) => {
    let error: any[] = []
    if(!data.firstName) error.push('First Name can not be empty.')
    if(data.firstName.length < 3) error.push('First Name has invalid length.')
    if(!data.email) error.push('Email can not be empty.')
    if(!emailRegex.test(data.email)) error.push('Invalid Email format.')
    if(!data.password) error.push('Password can not be empty.')
    if(data.password.length < 6) error.push('Password must be longer than 6 characters.')
    if(!data.role) error.push('Role can not be empty.')
    
    if(error.length) {
        return {
            pass: false,
            error
        }
    } else {
        return {
            pass: true
        }
    }
}

export const loginValidator = (data: Omit<User, "firstName" | "lastName"| "role">) => {
    let error: any[] = []
    if(!data.email) error.push('Email can not be empty.')
    if(!emailRegex.test(data.email)) error.push('Invalid Email format.')
    if(!data.password) error.push('Password can not be empty.')
    if(data.password.length < 6) error.push('Password must be longer tnan 6 characters.')
    
    if(error.length) {
        return {
            pass: false,
            error
        }
    } else {
        return {
            pass: true
        }
    }
}