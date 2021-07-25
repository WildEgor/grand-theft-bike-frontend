import * as mongoose from 'mongoose';
import Report from './report.interface';

const postSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  // TODO
});

const postModel = mongoose.model<Report & mongoose.Document>('Post', postSchema);

export default postModel;