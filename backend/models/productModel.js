import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    //Lié le produit au user qui l'a créé
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String, 
        required: true
    },
    image: {
        type: String, 
        required: true,
    },
    author: {
        type: String, 
        required: true
    },
    genre: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    publisher: {
        type: String, 
        required: true
    },
    publicationDate: {
        type: Date,
        required: true, 
        default: Date.now
    },
    language: {
        type: String, 
        required: true
    },
    rating: {
        type: Number, 
        required: true,
        default: 0
    },
    reviews: [reviewSchema],
    numReviews: {
        type: Number, 
        required: true,
        default: 0
    },
    price: {
        type: Number, 
        required: true,
        default: 0
    },
    countInStock: {
        type: Number, 
        required: true,
        default: 0
    },
    printLength: {
        type: Number, 
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;