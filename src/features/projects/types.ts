import {Models} from "node-appwrite";

export type Project = Models.Document & {
  name: string;
  imagesUrl: string;
  workspaceId: string;
};