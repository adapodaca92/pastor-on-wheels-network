const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    createAdmin: async (req, res) => {
        try {
            console.log(req.body);
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Both email and password are required.' });
            }
            const hashedPassword = bcrypt.hashSync(password, salt);
            const admin = await Admin.create({
                email,
                password: hashedPassword,
            });
            res.json(admin);
        } catch(err) {
            console.log(err);
            res.status(400).json('An error occured during registration.');
        }
    },
    getAdminByEmail: async (req, res) => {
        try {
            const email = req.params.email; 
            console.log(email);
            if (!email) {
                return res.status(400).json({ error: 'Admin email is required.' });
            }
            const admin = await Admin.findOne({ email });

            if (!admin) {
                return res.status(404).json({ error: 'Admin not found.' });
            }

            res.json(admin);
        } catch (err) {
            console.log(err);
            res.status(500).json('An error occurred while fetching admin information.');
        }
    },
};