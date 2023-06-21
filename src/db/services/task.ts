import { TaskModel, TaskDocument } from '../models/task';

export const createOneTask = (
  taskDocument: Partial<Task>,
): Promise<Task> => TaskModel.create(taskDocument) as unknown as Promise<Task>;
export const deleteOneTask = (
  query: any,
  options?: any,
): Promise<any> => TaskModel.deleteOne(
  query,
  options,
) as unknown as Promise<any>;
export const findTasks = (
  query: any,
  options?: any,
): Promise<Task[]> => TaskModel.find(
  query,
  options,
) as unknown as Promise<Task[]>;
export const findOneTask = (
  query: any,
  options?: any,
): Promise<Task> => TaskModel.findOne(
  query,
  options,
) as unknown as Promise<Task>;
export const findOneTaskAndUpdate = (
  query: any,
  update: any,
  options?: any,
): Promise<Task> => TaskModel.findOneAndUpdate(
  query,
  update,
  options,
) as unknown as Promise<Task>;
export const updateOneTask = (
  query: any,
  update: any,
  options?: any,
): Promise<any> => TaskModel.updateOne(
  query,
  update,
  options,
) as unknown as Promise<any>;

export type Task = TaskDocument;