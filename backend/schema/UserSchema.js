import mongoose from "mongoose";

const Users = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

//   username: {
//      type: String,
//       required: true, 
//       unique: true 
//     },

  email: { type: String,
     required: true,
      unique: true 
    },

  password: { type: String,
     required: true 
    }, 

  createdAt: { type: Date,
     default: Date.now 
    },

});

export default mongoose.model('User', Users,'Users');
