import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import config from '../../config/env';

interface IUser extends mongoose.Document{
  firstName: string
  lastName: string
  email: string
}

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
      },
      reports: [{
        ref: 'Report',
        type: mongoose.Schema.Types.ObjectId,
      }]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
    },
  );

// eslint-disable-next-line no-unused-vars
userSchema.virtual('getFullName').get(function (this: IUser) {
  const { firstName,  lastName } = this;
  return firstName + lastName;
})

// eslint-disable-next-line no-unused-vars
userSchema.virtual('getToken').get(function (this: IUser){
    const { email } = this;
    return jwt.sign({ email }, config.server.jwtValue);
});

export default mongoose.model('User', userSchema);
