const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NftModel = new Schema({
    collectionId: {
        type: Schema.Types.ObjectId, ref:'collections',index: true, required: true
    },
    jsonPath: {
        type: Schema.Types.String, index: true, required: true
    },
    imageUrl: {
        type: Schema.Types.String, index: true, required: true
    },
    imagePath: {
        type: Schema.Types.String, index: true, required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('nfts', NftModel);