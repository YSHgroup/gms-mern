export function isEmpty(value: any) {
    if (Array.isArray(value)) {
        return value.length === 0; // Check if array is empty
    } else if (typeof value === 'object' && value !== null) {
        return Object.keys(value).length === 0; // Check if object is empty
    } else if(value === null) {
        return true
    }
    return false; // Treat non-objects and non-arrays as false
}
