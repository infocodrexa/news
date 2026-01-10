// const { model, Schema } = require('mongoose')

// const authSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         unique:true,
//         required: true
//     },
//     password: {
//         type: String,
//         select: false,
//         required: true
//     },
//     role: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         default: ""
//     },
//     category: {
//         type: String,
//         required: true
//     }
// }, { timestamps: true })

// module.exports = model('authors', authSchema)


const { model, Schema } = require('mongoose')

const authSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "" 
    },
    social: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" }
    },
}, { timestamps: true })

module.exports = model('authors', authSchema)