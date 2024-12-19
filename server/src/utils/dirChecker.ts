import express from 'express'
import fs from 'fs'
import path from 'path'

const dirPath_1 = path.resolve(__dirname, '..', 'public', 'applications');
const dirPath_2 = path.resolve(__dirname, '..', 'public', 'images');

// Check if the directory exists

export const checkAndMakeDir = () => {
    if (!fs.existsSync(dirPath_1)) {
        // Create the directory
        fs.mkdirSync(dirPath_1, { recursive: true });
        console.log('Directory created: ', dirPath_1);
        // return true
    } else if (!fs.existsSync(dirPath_2)) {
        // Create the directory
        fs.mkdirSync(dirPath_1, { recursive: true });
        console.log('Directory created: ', dirPath_2);
        // return true
    } else {
        console.log('Directories already exist');
    }
}

