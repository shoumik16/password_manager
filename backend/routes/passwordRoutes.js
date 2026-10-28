const express = require('express');
const router = express.Router();

const MyPasswords = require('../models/MyPasswords');
router.post('/add', async (req, res) => {
    try {
        const { website, name, password } = req.body;
        const newPassword = new MyPasswords({ website, name, password });
        await newPassword.save();
        res.status(201).json({
            message: 'Password added successfully',
            success: true,
            data: newPassword
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding password',
            success: false,
            error: error.message
        });
    }
});

router.get('/get', async (req, res) => {
    try {
        const passwords = await MyPasswords.find();
        res.status(200).json({
            message: 'Passwords retrieved successfully',
            success: true,
            data: passwords
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving passwords',
            success: false,
            error: error.message
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { website, name, password } = req.body;
        const updatedPassword = await MyPasswords.findByIdAndUpdate(id, { website, name, password }, { new: true });
        if (!updatedPassword) {
            return res.status(404).json({
                message: 'Password not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'Password updated successfully',
            success: true,
            data: updatedPassword
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating password',
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
