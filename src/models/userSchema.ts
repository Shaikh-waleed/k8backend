import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, bcrypt: true },
    country: { type: String, required: true },
    // orders: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: "Order",
    //     default: []
    // }],
    // location: {
    //     type: {
    //       type: String, // Don't do `{ location: { type: String } }`
    //       enum: ['Point'], // 'location.type' must be 'Point'
    //       required: true
    //     },
    //     coordinates: {
    //       type: [Number],
    //       required: true
    //     }
    //   }
});

// userSchema.ensureIndex({"location":"2dsphere"});

const User = mongoose.model('User', userSchema);

export default User