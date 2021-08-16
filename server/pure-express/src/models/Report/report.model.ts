import * as mongoose from 'mongoose';
import Report from './report.interface';

const reportSchema = new mongoose.Schema({
  new: {
    type: String,
    requere: true
  },
  date: {
    type: String,
    requere: true
  },
  licenseNumber: {
    type: String,
    requere: true
  },
  color: {
    type: String,
    requere: true
  },
  type: {
    type: String,
    requere: true
  },
  ownerFullName: {
    type: String,
    requere: true
  },
  officer: {
    type: String,
    requere: true
  },
  createdAt: {
    type: String,
    requere: true
  },
  updateAt: {
    type: String,
    requere: true
  },
  clientId: {
    type: String,
    requere: true
  },
  description: {
    type: String,
    requere: true
  },
  resolution: {
    type: String,
    requere: true
  } 
});

const postModel = mongoose.model<Report & mongoose.Document>('Report', reportSchema);

export default postModel;