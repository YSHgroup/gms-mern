export const queryByRoleWritter = (role: string, department?: string) => {
    let query: any = {}

    if(role === "grant_dir") query.role = ["grant_dep", "col_dean", "finance"]
    if(role === "col_dean")  {
        query.role = ["user", "reviewer_1", "reviewer_2"]
        query.department = department
    }
    
    return query
};
