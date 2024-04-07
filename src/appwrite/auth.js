import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
        // return userAccount;
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      //check this create function according to the Version of appwrite.
      const resp = await this.account.createEmailSession(email, password);
      return resp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async passwordRecovery({email}) {
    try {
      let resetUrl;
      if (process.env.NODE_ENV === 'production') {
        resetUrl = "https://blog-app-henna-eight.vercel.app/resetpassword";
      } else {
        resetUrl = "http://localhost:3000/resetpassword";
      }
      const promise = this.account.createRecovery(email, resetUrl);
      promise.then(function (response) {
        return response; // Success
      }).catch(function (error) {
        console.log(error); // Failure
        return false;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async resetPassword(userid, secret, newPass, repeatedPass){
    try {
      const promise = this.account.updateRecovery(userid, secret, newPass, repeatedPass);
      
      promise.then(function (response) {
        return response; // Success
      }).catch(function (error) {
        console.log(error); // Failure
        return false;
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite serive :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
