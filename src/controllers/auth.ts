import { Request, Response } from "express";
import User from "../models/user";

export const login= (req: Request, res: Response) => {
  const {email, password} = req.body;

  User.findOne({email: email, password: password})
    .then((user) => {
      if (user) {
        res.json({
          payload: {
            token: 'token',
            user: {
              id: user._id,
              name: user.name,
              role: user.role,
            },
          }
        })
      } else {

      }
    })
};