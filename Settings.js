const mongoose = require ('mongoose');

const settingsSchema = new mongoose.Schema ({
    preference:{
        type : String,
        required : true,
    },
    cookies:{
        type : String,
        required : true,
    },
},
{
    timestamps : true

});




module.exports = mongoose.model("Settings", settingsSchema);
