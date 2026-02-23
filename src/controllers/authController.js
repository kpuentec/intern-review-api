const User = require('../models/User');
//const { request } = require('express');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.register = async (request, response, next) => {
    try {
        const { name, email, password } = request.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            response.status(400);
            throw new Error("Email already in use");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        await User.create({
            name,
            email,
            password: hashPassword,
        });

        response.status(201).json({
            message: "User registered successfully"
        });

    } catch (e) {
        next(e);
    }
};

exports.login = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            response.status(400);
            throw new Error("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            response.status(400);
            throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT,
            { expiresIn: '7d' }
        );

        response.json({ token });

    } catch (e) {
        next(e);
    }
};