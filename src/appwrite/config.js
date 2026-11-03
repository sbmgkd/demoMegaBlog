import conf from "../conf/conf.js";
import { Client, ID, Query, TablesDB, Storage } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create a post
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.error("Appwrite Service :: createPost ::", error);
      return false;
    }
  }

  // Update a post by row ID
  async updatePost(rowId, {
    title,
    content,
    featuredImage,
    status,
  }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (error) {
      console.error("Appwrite Service :: updatePost ::", error);
      return false;
    }
  }

  // Delete a post by row ID
  async deletePost(rowId) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId,
      });

      return true;
    } catch (error) {
      console.error("Appwrite Service :: deletePost ::", error);
      return false;
    }
  }

  // Get a single post by row ID
  async getPost(rowId) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId,
      });
    } catch (error) {
      console.error("Appwrite Service :: getPost ::", error);
      return false;
    }
  }

  // Get posts; active posts are returned by default
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      const result = await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });

      return {
        ...result,
        documents: result.rows,
      };
    } catch (error) {
      console.error("Appwrite Service :: getPosts ::", error);
      return false;
    }
  }

  // Upload an image
  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (error) {
      console.error("Appwrite Service :: uploadFile ::", error);
      return false;
    }
  }

  // Delete an image
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });

      return true;
    } catch (error) {
      console.error("Appwrite Service :: deleteFile ::", error);
      return false;
    }
  }

// Get the original image without transformations
getFileView(fileId) {
  if (!fileId) return "";

  return this.bucket.getFileView({
    bucketId: conf.appwriteBucketId,
    fileId,
  });
}
}

const service = new Service();

export default service;