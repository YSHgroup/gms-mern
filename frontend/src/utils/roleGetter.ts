
export const getRole = (key: string) => {
    const roles =[
        { user: "User" },
        { reviewer: "Reviewer" },
        { col_dean: "College Dean" },
        { grant_dep: "Grant Department" },
        { grant_dir: "Grant Director" },
        { super_admin: "Super Admin" },
    ]
    const value = roles.find(role => Object.keys(role)[0] === key) as any;
    const role = value[key];

    return role
}
