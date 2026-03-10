import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

},
{ timestamps: true }
);

export default mongoose.model("Student", studentSchema);