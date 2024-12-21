import { User } from "@/models/userModel"
import { isEmpty } from "./isEmpty"

export const checkEnrollmentUniqueness = async (newEnrollment: number) => {
    try {
        const users = await User.find({enrolment: newEnrollment})
        if(!isEmpty(users)) {
            return true
        }
        return false
    } catch (error) {
        console.error(error)
        return true
    }
}