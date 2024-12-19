import { useRouter } from "@/routes/hooks";

export const getRole = (key: string) => {
  const roles = [
    { user: "User" },
    { reviewer: "Reviewer" },
    { col_dean: "College Dean" },
    { grant_dep: "Grant Department" },
    { grant_dir: "Grant Director" },
  ];

  const router = useRouter();
  if (!key) {
    return '';
  }

  const value = roles.find((role) => Object.keys(role)[0] === key) as any;
  if (!value) {
    router.replace("/login");
    return '';
  }
  const role = value[key];

  return role;
};
