import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(process.env.REACT_APP_APPWRITE_URL) 
            .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);   
            
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID,
            process.REACT_APP_APPWRITE_COLLECTION_ID,
            slug,{
                title, 
                content,
                featuredImage,
                status,
                userId,
            })
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                slug,{
                    title, 
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                slug
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                slug
            )
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                process.env.REACT_APP_APPWRITE_DATABASE_ID,
                process.env.REACT_APP_APPWRITE_COLLECTION_ID,
                queries
            )
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                process.env.REACT_APP_APPWRITE_BUCKET_ID,
                fileId
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            process.env.REACT_APP_APPWRITE_BUCKET_ID,
            fileId
        )
    }
}

const service = new Service();
export default service;