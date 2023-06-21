import { Router } from 'express';

import {
  createUserTask,
  deleteUserTask,
  getAllUserTasks,
  updateUserTask,
} from './handlers';

const router = Router();

router.get('/user/:userId/tasks', getAllUserTasks);

router.patch('/user/:userId/task/:taskId', updateUserTask);

router.post('/user/:userId/task', createUserTask);

router.delete('/user/:userId/task/:taskId', deleteUserTask);

export default router