import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '../config/env';

const userSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        require: true,
      },
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
        get: (): undefined => undefined,
      },
      repassword: {
        type: String,
        require: true,
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    },
  );

interface IUser extends mongoose.Document{
    email:string
}

// eslint-disable-next-line no-unused-vars
userSchema.virtual('getToken').get(function (this: IUser){
    const { email } = this;
    return jwt.sign({ email }, config.server.jwtValue);
});

module.exports = mongoose.model('User', userSchema);