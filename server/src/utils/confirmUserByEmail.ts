import { User } from "@/models/userModel"

export const confirmUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email: email})
        if(!user) {
            throw new Error(`User ${email} not found`)
        }
        return { user: user, confirmed: true }
    } catch (error: any) {
        return { confirmed: false, msg: error?.message ?? 'Error finding user' }
    }
}