const mongoose = require('mongoose');

var deskSchema = new mongoose.Schema({
    deskNumber: {
        type: Number,
        required: 'This field is required.'
    },
    floor: {
        type: Number,
        required: 'This field is required.'
    },
    address: {
        type: String,
        required: 'This field is required.'
    },
    officeLocation: {
        type: String,
        required: 'This field is required.'
    },
});


mongoose.model('Desk', deskSchema);