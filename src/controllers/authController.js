const User = require('../models/User');
const bcrypt = require("bcryptjs");
// const { request } = require('express');
const jwt = require('jsonwebtoken');

exports.register = async (request, response) => {
    try {
        const { name, email, password} = request.body;
        
        const existUser = await User.findOne({email});
        if (existUser) {
            return response.status(400).json({message: "Email already in use"});

        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
        });

        response.status(201).json({message:"User registered succesfully",});

    } catch (e) {
        response.status(500).json({message:"Server error"});
    }
};

exports.login = async (request, response) => {
    try {
        const {email, password} = request.body;
        const user = await User.findOne({email});
        if (!user) {
            return response.status(400).json({message:"Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({message:"Invalid credentials"});

        }
        const token = jwt.sign(
            { id:user._id, role: user.role},
            process.env.JWT,
            {expiresIn: '7d'}
        );
        response.json({token});
    } catch (e) {
        response.status(500).json({message:"Server error"});
    }
}