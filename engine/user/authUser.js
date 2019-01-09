const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');

const authUser = (req, res) => {
    userModel.findOne({ email: req.query.email }, (err, doc) => {
        let data;
        if (err) {
            data = {
                "uid": 0,
                "token": "",
                "description": "LOGIN ERROR"
            }
            res.type('application/xml').render('handlers/auth.ejs', { data: data });
        }
        else {
            if (doc && doc.password) {
                bcrypt.compare(req.query.password, doc.password, (err, result) => {
                    if (err) {
                        data = {
                            "uid": 0,
                            "token": "",
                            "description": "LOGIN ERROR"
                        }
                        res.type('application/xml').render('handlers/auth.ejs', { data: data });
                    }
                    else if (result) {
                        jwt.sign({ id: doc._id, email: doc.email }, req.app.get('superSecret'), (err, token) => {
                            if (err) {
                                data = {
                                    "uid": 0,
                                    "token": "",
                                    "description": "LOGIN ERROR"
                                }
                            }
                            else {
                                data = {
                                    "uid": doc._id,
                                    "token": token,
                                    "description": ""
                                }
                            }
                            res.type('application/xml').render('handlers/auth.ejs', { data: data });
                        });
                    }
                    else {
                        data = {
                            "uid": 0,
                            "token": "",
                            "description": "LOGIN ERROR"
                        }
                        res.type('application/xml').render('handlers/auth.ejs', { data: data });
                    }
                });
            }
            else {
                data = {
                    "uid": 0,
                    "token": "",
                    "description": "LOGIN ERROR"
                }
                res.type('application/xml').render('handlers/auth.ejs', { data: data });
            }
        }
    });
}

module.exports = authUser;