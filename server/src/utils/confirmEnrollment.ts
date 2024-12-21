import { User } from "@/models/userModel"
import { isEmpty } from "./isEmpty"

export const checkEnrollmentUniqueness = async (newEnrollment: number) => {
    try {
        const users = await User.find({enrolment: newEnrollment})
        if(!isEmpty(users)) {
            console.log('enrollment check of users: ', users)
            return false
        }
        return true
    } catch (error) {
        console.error(error)
        return true
    }
}