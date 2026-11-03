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

  // Register a user and automatically log them in
  async createAccount({ email, password, name }) {
    try {
      await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      return await this.login({ email, password });
    } catch (error) {
      console.error("AuthService :: createAccount ::", error);
      throw error;
    }
  }

  // Log in
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (error) {
      console.error("AuthService :: login ::", error);
      throw error;
    }
  }

  // Get the currently logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  // Log out from all sessions
  async logout() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("AuthService :: logout ::", error);
      return false;
    }
  }
}

const authService = new AuthService();

export default authService;