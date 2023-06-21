import { UserModel, UserDocument } from '../models/user';

export const createOneUser = (
  userDocument: Partial<User>,
  options?: any
): Promise<User> => UserModel.create(userDocument, options) as unknown as Promise<User>;

export const deleteOneUser = (
  query: any,
  options?: any,
): Promise<any> => UserModel.deleteOne(
  query,
  options,
) as unknown as Promise<any>;
export const findOneUser = (
  query: any,
  options?: any,
): Promise<User> => UserModel.findOne(
  query,
  options,
) as unknown as Promise<User>;
export const findOneUserAndUpdate = (
  query: any,
  update: any,
  options?: any,
): Promise<User> => UserModel.findOneAndUpdate(
  query,
  update,
  options,
) as unknown as Promise<User>;
export const updateOneUser = (
  query: any,
  update: any,
  options?: any,
): Promise<any> => UserModel.updateOne(
  query,
  update,
  options,
) as unknown as Promise<any>;

export type User = UserDocument;