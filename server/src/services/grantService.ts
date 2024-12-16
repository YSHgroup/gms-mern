import { Announcement } from "@/models/announcementModel";
import { Application } from "@/models/applicationModel";

export default {
  approveProcedure: [
    "signed",
    "reviewer",
    "col_dean",
    "grant_dep",
    "grant_dir",
    "accepted",
  ],
  handleRequest: async function (id: string, role: string, flag: boolean){
    if(role === "user" || role === "super_admin") throw new Error("You don't have permission")
    try {
      const application = await Application.findOne({ _id: id }) as any
      if (!application) {
        throw new Error("Application not found");
      }
      if(application[role] || application.signed && role === "col_dean" || application.accepted && role === "col_dean") {
        throw new Error("You have already approved this application");
      }
      const confirmData = this.checkProcedure(0, role, application)
      if(!confirmData.result) {
        throw new Error("Your previous step was not performed.");
      }
      application[confirmData.key] = flag
      return application
    } catch (error) {
        throw error
    }
  },
  checkProcedure(index: number, role: string, data: any): Record<string, any> {
    if (
      index == 0 &&
      !data[this.approveProcedure[index]] &&
      role == this.approveProcedure[2]
    ) {
      return ({key: this.approveProcedure[index], result: true});
    } else if (index > this.approveProcedure.indexOf(role) - 1) {
      if (!data[this.approveProcedure[index]]) return {result: false};
      this.checkProcedure(index + 1, role, data);
    } else if (
      index == this.approveProcedure.length - 1 &&
      role === this.approveProcedure[2]
    ) {
      if (!data[this.approveProcedure[index]]) return ({key: this.approveProcedure[index], result: true});
      return {result: false};
    } else if (index === this.approveProcedure.indexOf(role) - 1) {
      if (data[this.approveProcedure[index]]) return {result: false};
      return ({key: this.approveProcedure[index], result: true});
    } 
    return {result: false};
  },
};
