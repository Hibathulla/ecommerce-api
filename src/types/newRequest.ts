import { Request } from "express";
import { IUser, UserDocumentWithId } from "./userTypes";

export interface NewRequest extends Request {
  user?: UserDocumentWithId;
}
