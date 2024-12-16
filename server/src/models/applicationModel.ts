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
    reviewer: {
        type: Boolean,
        default: false,
    },
    col_dean: {
        type: Boolean,
        default: false,
    },
    grant_dep: {
        type: Boolean,
        default: false,
    },
    grant_dir: {
        type: Boolean,
        default: false,
    }
})

export const Application = model('Application', ApplicationSchema);