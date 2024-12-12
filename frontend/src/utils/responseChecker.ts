export const isSuccessResult = (status: number) =>{
    if(status >= 200 && status < 300) return true
    return false
}
