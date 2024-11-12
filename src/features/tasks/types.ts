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

  export type Comment = Models.Document & {
    content: string;
    author: string;         // Can be a user ID or name
    taskId: string;         // ID of the associated task
    createdAt: string;      // Date when the comment was created, as an ISO string
    updatedAt?: string;     // Optional date for when the comment was last updated
  }