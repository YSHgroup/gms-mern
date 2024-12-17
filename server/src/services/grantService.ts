import {
  acceptedMail,
  approveMail,
  denyMail,
  mailToNextReviewer,
  signedMail,
} from "@/constant/mailTemplate";
import { Announcement } from "@/models/announcementModel";
import { Application } from "@/models/applicationModel";
import { User } from "@/models/userModel";
import { sendEmail } from "./autoMailService";

export default {
  approveProcedure: [
    "signed",
    "reviewer",
    "col_dean",
    "grant_dep",
    "grant_dir",
    "accepted",
  ],
  roles: [
    { user: "User" },
    { reviewer: "Reviewer" },
    { col_dean: "College Dean" },
    { grant_dep: "Grant Department" },
    { grant_dir: "Grant Director" },
    { super_admin: "Super Admin" },
  ],
  handleRequest: async function (id: string, role: string, flag: boolean) {
    if (role === "user" || role === "super_admin")
      throw new Error("You don't have permission");
    try {
      const application = (await Application.findOne({ _id: id })) as any;
      if (!application) {
        throw new Error("Application not found");
      }
      if (
        application[role] ||
        (application.signed && role === "col_dean") ||
        (application.accepted && role === "col_dean")
      ) {
        throw new Error("You have already approved this application");
      }
      const confirmData = this.checkProcedure(0, role, application);
      if (!confirmData.result) {
        throw new Error("Your previous step was not performed.");
      }
      application[confirmData.key] = flag;
      await application.save();
      flag && this.autoEmail(role, confirmData.key, application);
      !flag && sendEmail(denyMail(application.email));
      return application;
    } catch (error) {
      throw error;
    }
  },
  checkProcedure(index: number, role: string, data: any): Record<string, any> {
    if (
      index == 0 &&
      !data[this.approveProcedure[index]] &&
      role == this.approveProcedure[2]
    ) {
      return { key: this.approveProcedure[index], result: true };
    } else if (index > this.approveProcedure.indexOf(role) - 1) {
      if (!data[this.approveProcedure[index]]) return { result: false };
      this.checkProcedure(index + 1, role, data);
    } else if (
      index == this.approveProcedure.length - 1 &&
      role === this.approveProcedure[2]
    ) {
      if (!data[this.approveProcedure[index]])
        return { key: this.approveProcedure[index], result: true };
      return { result: false };
    } else if (index === this.approveProcedure.indexOf(role) - 1) {
      if (data[this.approveProcedure[index]]) return { result: false };
      return { key: this.approveProcedure[index], result: true };
    }
    return { result: false };
  },
  autoEmail: async function (role: string, process: string, application: any) {
    const nextRole =
      this.approveProcedure[this.approveProcedure.indexOf(role) + 1];
    try {
      if (process === "signed") {
        sendEmail(signedMail(application.email));
      }
      if (nextRole === "accepted") {
        sendEmail(acceptedMail(application.email));
        return;
      }
      const user = await User.findOne({
        department: application.department,
        role: nextRole,
      });
      if (!user?.email) throw new Error("No user for next reviewing.");
      sendEmail(
        mailToNextReviewer(
          user?.email,
          application.firstName + " " + application.lastName
        )
      );
      const roleData = this.roles.find(
        (item) => Object.keys(item)[0] === role
      ) as any;
      roleData && sendEmail(approveMail(application.role, roleData[role]));

      return;
    } catch (error) {
      throw error;
    }
  },
};
