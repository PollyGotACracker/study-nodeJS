import mongoose from "mongoose";
// Model(table) 을 만들지 않음
const { Schema } = mongoose;
const commentModel = new Schema({
  ct_date: String,
  ct_time: String,
  ct_write: String,
  ct_comment: String,
});

export default commentModel;
