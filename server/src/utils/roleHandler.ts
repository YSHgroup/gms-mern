export const checkStatus = (column: any, status: string) => {
    if(column?.status) {
        return column?.status === status
    } else {
        return column === status
    }
}

export const setNestedProperty = (obj: any, path: string, value: string) => {
    const keys = path.split('.');
    let current = obj;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            if (!current[key]) {
                current[key] = {};
            }
            current = current[key];
        }
    });
};
