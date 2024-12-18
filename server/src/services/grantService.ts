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
    "reviewer",
    "col_dean",
    "grant_dep",
    "grant_dir",
    // "accepted",
  ],
  roles: [
    { user: "User" },
    { reviewer: "Reviewer" },
    { col_dean: "College Dean" },
    { grant_dep: "Grant Department" },
    { grant_dir: "Grant Director" },
  ],
  handleRequest: async function (id: string, role: string, flag: boolean) {
    if (role === "user") throw new Error("You don't have permission");
    try {
      const application = (await Application.findOne({ _id: id })) as any;
      if (!application) {
        throw new Error("Application not found");
      }

      // if (role === "col_dean" && application.accepted == "approved")
      //   throw new Error("You have already approved this application");
      // if (role === "col_dean" && application.signed == "rejected")
      //   throw new Error("You have already rejected this application");
      // if (role === "col_dean" && application.accepted == "rejected")
      //   throw new Error("You have already rejected this application");
      if (application[role] == "approved")
        throw new Error("You have already approved this application");
      if (application[role] == "rejected")
        throw new Error("You have already rejected this application");
      if (application[this.approveProcedure[this.approveProcedure.indexOf(role) - 1]] == "rejected")
        throw new Error("This application is rejected already.");

      const confirmData = this.checkProcedure(role, application);

      if (!confirmData.result) {
        if (confirmData.doubleError)
          throw new Error("Your action is already taken.");
        if(confirmData.rejected) throw new Error("This application has been rejected.");
        
        throw new Error("Your previous step was not performed.");
      }
      application[confirmData.key] = flag ? "approved" : "rejected";
      await application.save();
      // flag && this.autoEmail(role, confirmData.key, application);
      // !flag && sendEmail(denyMail(application.email));
      return application;
    } catch (error) {
      throw error;
    }
  },
  checkProcedure(role: string, data: any): Record<string, any> {
    // if (index <= this.approveProcedure.indexOf(role) - 1) {
    //   if (data[this.approveProcedure[index]] == "pending")
    //     return { result: false };
    //   return this.checkProcedure(index + 1, role, data);
    // } else if (index == this.approveProcedure.indexOf(role)) {
    //   if (data[this.approveProcedure[index]] == "pending")
    //     return { key: this.approveProcedure[index], result: true };
    //   return { result: false, doubleError: true };
    // }
    if(role === this.approveProcedure[0]) {
      if(data['signed'] == 'approved') return {result: true, key: role}
      if(data['signed'] == 'rejected') return {result: false, rejected: true}
      return { result: false }
    } else
    if (
      data[this.approveProcedure[this.approveProcedure.indexOf(role) - 1]] ==
      "pending"
    ) {
      return { result: false };
    } else if (
      data[this.approveProcedure[this.approveProcedure.indexOf(role) - 1]] ==
      "rejected"
    ) {
      return { result: false };
    } else if (
      data[this.approveProcedure[this.approveProcedure.indexOf(role) - 1]] ==
      "approved"
    ) {
      if (data[role] == "pending") {
        return { result: true, key: role };
      } else {
        return { result: false, doubleError: true };
      }
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
      await sendEmail(
        mailToNextReviewer(
          user?.email,
          application.firstName + " " + application.lastName
        )
      );
      const roleData = this.roles.find(
        (item) => Object.keys(item)[0] === role
      ) as any;

      roleData &&
        (await sendEmail(approveMail(application.email, roleData[role])));

      return;
    } catch (error) {
      throw error;
    }
  },
};
