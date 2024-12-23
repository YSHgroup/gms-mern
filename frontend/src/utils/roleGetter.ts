export const getRole = (key: string) => {
  const roles = [
    { user: "User" },
    { reviewer_1: "Reviewer 1" },
    { reviewer_2: "Reviewer 2" },
    { col_dean: "College Dean" },
    { grant_dep: "Grant Department" },
    { grant_dir: "Grant Director" },
    { finance: "Finance Director" },
  ];

  const value = roles.find((role) => Object.keys(role)[0] === key) as any;
  if (!value || !key) {
    return '';
  }
  const role = value[key];

  return role;
};
