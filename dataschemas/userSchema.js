const mongoose = require('mongoose')
const express = require('express')
const { ObjectId } = mongoose.Schema.Types

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Address:{
        type: String,
    },
    orders_placed: [
        { type: ObjectId, ref: "Order"}
    ],
    orders_fulfilled: [
        { type: ObjectId, ref: "Order" }
    ]
})

mongoose.model("User", schemaUser);