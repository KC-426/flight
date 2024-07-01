import userModel from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    const user = new userModel({ name, email });
    const result = await user.save();

    return res
      .status(201)
      .json({ message: "User created successfully!", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
