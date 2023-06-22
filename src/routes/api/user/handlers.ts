import {
  createOneTask,
  deleteOneTask,
  findOneTaskAndUpdate,
  findTasks,
  updateOneTask
} from '../../../db/services/task';
import { findOneUserAndUpdate, updateOneUser } from '../../../db/services/user';

export const createUserTask = async (req: any, res: any) => {
  try {
    console.log('Req: ', req.body);
    const createdTask = await createOneTask({
      ...req.body
    });
    const updatedUser = await findOneUserAndUpdate({
      _id: req.params.userId,
    }, {
      $addToSet: {
        tasks: createdTask._id,
      },
    }, {
      new: true,
    });
    if (!createdTask) {
      console.log('Task Not Created.');
      res.status(404).json({
        error: true,
        errResponse: 'Task Not Created.',
      }).end();
    }
    res.status(200).json({
      data: updatedUser
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errResponse: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}
export const deleteUserTask = async (req: any, res: any) => {
  try {
    const deletedTask = await deleteOneTask({
      _id: req.params.taskId
    });
    if (!deletedTask) {
      console.log('Task Not Deleted.');
      res.status(404).json({
        error: true,
        errResponse: 'Task Not Deleted.',
      }).end();
    }
    res.status(200).json(deletedTask).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errResponse: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}
export const getAllUserTasks = async (req: any, res: any) => {
  try {
    const foundTasks = await findTasks({
      user: req.params.userId
    });
    if (!foundTasks) {
      console.log('Task Not Found.');
      res.status(404).json({
        error: true,
        errResponse: 'Tasks Not Found.',
      }).end();
    }
    res.status(200).json({
      data: foundTasks,
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorResponse: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}

export const updateUserTask = async (req: any, res: any) => {
  try {
    const updatedTask = await findOneTaskAndUpdate({
      _id: req.params.taskId,
      user: req.params.userId
    }, {
      $set: {
      ...req.body
      }
    });
    if (!updatedTask) {
      console.log('Task Not Updated.');
      res.status(404).json({
        error: true,
        errorResponse: 'Task Not Updated.',
      }).end();
    }
    res.status(200).json(updatedTask).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorResponse: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}