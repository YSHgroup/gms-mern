import { Schema, model } from 'mongoose';

const ApplicationSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    application: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    }
})

export const Application = model('Application', ApplicationSchema);