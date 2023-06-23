import { findOneUser, createOneUser } from '../../../db/services/user';

export const loginHandler = async (req: any, res: any) => {
  try {
    if (!(req.body.username && req.body.password)) {
      res.status(400).json({
        error: true,
        errorMessage: `Missing login credentials ${req.body}.`,
      }).end();
      return;
    }
    const user = await findOneUser({
      username: req.body.username,
      password: req.body.password,
    });
    if (!user) {
      console.log('User Not Found.');
      res.status(404).json({
        error: true,
        errorMessage: 'User Not Found.',
      }).end();
      return;
    }
    res.status(200).json({
      data: {
        _id: user._id,
        email: user.email,
        tasks: user.tasks,
        username: user.username,
      },
    }).end();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: 'Internal Server Error.',
    }).end();
  }
  return;
}
export const signupHandler = async (req: any, res: any) => {
  if (!(req.body.username && req.body.password && req.body.email)) {
    res.status(400).json({
      error: true,
      errorMessage: `Missing signup credentials ${req.body}.`,
    }).end();
    return;
  }
  try {
    const user = await createOneUser({
      ...req.body,
    });
    if (!user) {
      console.log('User Not Created.');
      res.status(404).json({
        error: true,
        errorMessage: 'User Not Created.',
      }).end();
      return;
    }
    res.status(200).json({
      data: {
        _id: user._id,
        email: user.email,
        tasks: user.tasks,
        username: user.username,
      },
    }).end();
  } catch(error: any) {
    console.log(error.message);
    res.status(500).json({
      error: true,
      errorMessage: 'Internal Server Error.',
    }).end();
  }
  return;
}