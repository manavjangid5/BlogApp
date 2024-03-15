import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(process.env.REACT_APP_APPWRITE_URL).setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAcc = this.account.create(ID.unique(), email, password, name);
      if (userAcc) {
        console.log("Account Created successfully for", userAcc);
        return this.login(userAcc);
      } else {
        console.log("Error while creating the Account ");
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async login({ email, password }) {
    console.log(email, password);
    debugger
    try {debugger
      return await this.account.createEmailSession(email, password);
    } catch (error) {
        debugger;console.log(error);
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

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
