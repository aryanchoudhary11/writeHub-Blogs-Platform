import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (err) {
      console.log("Appwrite service :: createPost :: error ", err);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      console.log("Appwrite service :: updatePost :: error ", err);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (err) {
      console.log("Appwrite service :: updatePost :: error ", err);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (err) {
      console.log("Appwrite service :: getPost :: error ", err);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (err) {
      console.log("Appwrite service :: getPosts :: error ", err);
      return false;
    }
  }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch (err) {
      console.log("Appwrite service :: uploadFile :: error ", err);
      return false;
    }
  }
  async deleteFile(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileID);
      return true;
    } catch (err) {
      console.log("Appwrite service :: uploadFile :: error ", err);
      return false;
    }
  }
  async getFilePreview(fileID) {
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileID);
  }
}

const service = new Service();

export default service;
