import { IComment } from './comment.interface';

export interface ITaskCommentsModalData {
  taskId: string;
  comments: IComment[];
}
