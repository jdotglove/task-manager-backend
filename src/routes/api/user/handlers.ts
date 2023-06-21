import {
  createOneTask,
  deleteOneTask,
  findOneTaskAndUpdate,
  findTasks,
  updateOneTask
} from '../../../db/services/task';

export const createUserTask = async (req: any, res: any) => {
  try {
    const createdTask = await createOneTask({
      ...req.body
    });
    if (!createdTask) {
      res.status(404).json({
        error: true,
        errResponse: 'Task Not Created.',
      }).end();
    }
    res.status(200).json(createdTask).end();
  } catch (error: any) {
    res.status(500).json({
      error: true,
      errResponse: 'Internal Server Error.',
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
      res.status(404).json({
        error: true,
        errResponse: 'Task Not Deleted.',
      }).end();
    }
    res.status(200).json(deletedTask).end();
  } catch (error: any) {
    res.status(500).json({
      error: true,
      errResponse: 'Internal Server Error.',
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
      res.status(404).json({
        error: true,
        errResponse: 'Tasks Not Found.',
      }).end();
    }
    res.status(200).json(foundTasks).end();
  } catch (error: any) {
    res.status(500).json({
      error: true,
      errorResponse: 'Internal Server Error.',
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
      res.status(404).json({
        error: true,
        errorResponse: 'Task Not Updated.',
      }).end();
    }
    res.status(200).json(updatedTask).end();
  } catch (error: any) {
    res.status(500).json({
      error: true,
      errorResponse: 'Internal Server Error.',
    }).end();
  }
  return;
}