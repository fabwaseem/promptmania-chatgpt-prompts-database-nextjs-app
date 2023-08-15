import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    const username = params.username;
    await connectToDB();
    const user = await User.find({ username });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};
