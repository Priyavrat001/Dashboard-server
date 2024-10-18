import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name can not be empty"]
    },
    username: {
        type: String,
        unique: true,
        required: [true, "User name can not be empty"]
    },
    password: {
        type: String,
        required: [true, "Password can not be empty"],
        select: false
    }
});


export const User = mongoose.models?.User || mongoose.model("User", schema);