import { findOneUserAndUpdate, findOneUser, createOneUser } from '../../../db/services/user';
import mongoose from '../../../plugins/mongoose';

export const loginHandler = async (req: any, res: any) => {
  console.log('Here')
  try {
    const user = await findOneUser({
      username: req.body.username
    });
    if (!user) {
      res.status(404).json({
        error: true,
        errorResponse: 'User Not Found.',
      }).end();
    }
    res.status(200).json({ data: user }).end();
  } catch (error: any) {
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
    const _id = new mongoose.Types.ObjectId()
    const user = await createOneUser({
      _id,
      ...req.body,
    });
    console.log('User: ', req.body)
    if (!user) {
      res.status(404).json({
        error: true,
        errorResponse: 'User Not Created.',
      }).end();
    }
    console.log('Id: ', _id);
    res.status(200).json({ data: {
      ...user,
      _id,
    } }).end();
  } catch(error: any) {
    res.status(500).json({
      error: true,
      errorResponse: 'Internal Server Error.',
    }).end();
  }
  return;
}