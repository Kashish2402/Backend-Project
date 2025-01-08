import fs from 'fs'
import { ApiError } from './ApiError'

export const deleteFile=async(filePath)=>{
    try {
       await fs.unlink(filePath) 
    } catch (error) {
        throw new ApiError(500,`Unable to delete File: ${filePath}`)
    }
}