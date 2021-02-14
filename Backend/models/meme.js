const mongoose = require('mongoose');
const Schema = mongoose.Schema;


 

const memeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },

});
memeSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

const Meme = mongoose.model('meme',memeSchema);
module.exports = Meme;