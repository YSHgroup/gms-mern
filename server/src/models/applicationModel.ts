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
    signed: {
        type: Boolean, String,
        default: 'pending',
    },
    reviewer: {
        type: Boolean, String,
        default: 'pending',
    },
    col_dean: {
        type: Boolean, String,
        default: 'pending',
    },
    grant_dep: {
        type: Boolean, String,
        default: 'pending',
    },
    grant_dir: {
        type: Boolean, String ,
        default: 'pending',
    },
    accepted: {
        type: Boolean, String,
        default: 'pending',
    },
})

export const Application = model('Application', ApplicationSchema);