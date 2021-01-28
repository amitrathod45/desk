const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Desk = mongoose.model('Desk');

router.get('/', (req, res) => {
    res.render("desk/addOrEdit", {
        viewTitle: "Insert Desk"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var desk = new Desk();
    desk.deskNumber = req.body.deskNumber;
    desk.floor = req.body.floor;
    desk.address = req.body.address;
    desk.officeLocation = req.body.officeLocation;
    desk.save((err, doc) => {
        if (!err)
            res.redirect('desk/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("desk/addOrEdit", {
                    viewTitle: "Insert Desk",
                    desk: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Desk.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('desk/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("desk/addOrEdit", {
                    viewTitle: 'Update Desk',
                    desk: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Desk.find((err, docs) => {
        if (!err) {
            res.render("desk/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving desk list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            
        }
    }
}

router.get('/:id', (req, res) => {
    Desk.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("desk/addOrEdit", {
                viewTitle: "Update Desk",
                desk: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Desk.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/desk/list');
        }
        else { console.log('Error in desk delete :' + err); }
    });
});

module.exports = router;