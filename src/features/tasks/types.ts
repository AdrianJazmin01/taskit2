import { Models } from "node-appwrite";


export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE"
};

export enum TaskTags {
  LOW = "LOW",
  MID = "MID",
  HIGH = "HIGH",
  URGENT = "URGENT",
};


  export type Task = Models.Document & {
    name: string;
    workspaceId: string;
    status: TaskStatus;
    tags: TaskTags;
    assigneeId: string;
    projectId: string;
    position: number;
    dueDate: string;
    description?:  string;
  }