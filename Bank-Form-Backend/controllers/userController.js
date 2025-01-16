const {User} = require('../models/documents');

const addUser = async (req,res) => {
    try{
        const response = await User.create(req.body);
        return res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
};

const getUserByAadhar = async (req,res) => {
    const aadharnumber = req.params;
    try{
        const response = await User.findAll({where: {aadharnumber}});
        return res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
};

const getUserByPan = async (req,res) => {
    const pannumber = req.params;
    try{
        const response = await User.findAll({where: {pannumber}});
        return res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
};

const getUserByLicense = async (req,res) => {
    const drivinglicensenumber = req.params;
    try{
        const response = await User.findAll({where: {drivinglicensenumber}});
        return res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
};

module.exports = { addUser, getUserByAadhar, getUserByPan, getUserByLicense };
