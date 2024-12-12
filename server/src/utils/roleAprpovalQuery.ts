export const queryByRoleWritter = (role: string, department: string) => {
    let query: any = {}

    if(role === "super_admin") query.role = ["grant_dep", "col_dean", "grant_dir"]
    if(role === "col_dean")  {
        query.role = ["user", "reviewer"]
        query.department = department
    }
    
    return query
};
