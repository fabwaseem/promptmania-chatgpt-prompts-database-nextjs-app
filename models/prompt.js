import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Please provide a prompt"],
  },
  tags: {
    type: Array,
    required: [true, "Please provide atleast one tag"],
  },
});

export default models.Prompt || model("Prompt", PromptSchema);