import { findOneUser, createOneUser } from '../../../db/services/user';

export const loginHandler = async (req: any, res: any) => {
  try {
    const user = await findOneUser({
      username: req.body.username,
      password: req.body.password,
    });
    console.log('Login', req.body);
    console.log('User: ', user);
    if (!user) {
      console.log('User Not Found.');
      res.status(404).json({
        error: true,
        errorResponse: 'User Not Found.',
      }).end();
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
      errorResponse: 'Internal Server Error.',
    }).end();
  }
  return;
}
export const signupHandler = async (req: any, res: any) => {
  console.log('SignUp Funnel')
  try {
    const user = await createOneUser({
      ...req.body,
    });
    if (!user) {
      console.log('User Not Created.');
      res.status(404).json({
        error: true,
        errorResponse: 'User Not Created.',
      }).end();
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
      errorResponse: 'Internal Server Error.',
    }).end();
  }
  return;
}