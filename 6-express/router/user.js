import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.status(201).send("Get: /users")
})

// export default userRouter;

export { userRouter }