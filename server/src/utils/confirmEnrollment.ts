import { User } from "@/models/userModel"
import { isEmpty } from "./isEmpty"

export const checkEnrollmentUniqueness = async (newEnrollment: number) => {
    try {
        const users = await User.find({enrollment: newEnrollment})
        if(!isEmpty(users)) {
            return true
        }
        console.log('user: ', newEnrollment, users)
        return false
    } catch (error) {
        console.error(error)
        return true
    }
}