import {
  createOneTask,
  deleteOneTask,
  findOneTaskAndUpdate,
  findTasks,
} from '../../../db/services/task';
import { findOneUserAndUpdate } from '../../../db/services/user';

export const createUserTask = async (req: any, res: any) => {
  try {
    const createdTask = await createOneTask({
      ...req.body
    });
    if (!createdTask) {
      console.log('Task Not Created.');
      res.status(404).json({
        error: true,
        errorMessage: 'Task Not Created.',
      }).end();
      return;
    }
    const updatedUser = await findOneUserAndUpdate({
      _id: req.params.userId,
    }, {
      $addToSet: {
        tasks: createdTask._id,
      },
    }, {
      new: true,
    });
    res.status(200).json({
      data: updatedUser
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}
export const deleteUserTask = async (req: any, res: any) => {
  try {
    const { deletedCount } = await deleteOneTask({
      _id: req.params.taskId,
    });
    const deleted = deletedCount === 1
    if (!deleted) {
      console.log('Task Not Deleted.');
      res.status(404).json({
        error: true,
        errorMessage: 'Task Not Deleted.',
      }).end();
      return;
    }
    const updatedUser = await findOneUserAndUpdate({
      _id: req.params.userId
    }, {
      $pull: {
        $tasks: req.params.taskId,
      },
    });
    res.status(200).json({
      data: updatedUser,
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: `Internal Server Error: ${error.message}.`,
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
        errorMessage: 'Tasks Not Found.',
      }).end();
    }
    res.status(200).json({
      data: foundTasks,
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: `Internal Server Error: ${error.message}.`,
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
    }, {
      new: true,
    });
    if (!updatedTask) {
      console.log('Task Not Updated.');
      res.status(404).json({
        error: true,
        errorMessage: 'Task Not Updated.',
      }).end();
    }
    res.status(200).json({ 
      data: updatedTask,
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: `Internal Server Error: ${error.message}.`,
    }).end();
  }
  return;
}