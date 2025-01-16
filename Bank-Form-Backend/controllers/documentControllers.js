const { Documents, User } = require('../models/documents');

const addDocuments = async (req, res) => {
    try {
        const { userid } = req.params;
        
        // Find user
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create document object from form data and files
        const documentData = {
            userid: userid,
            typeof_addressproof: req.body.typeof_addressproof,
            additionalcomments: req.body.additionalcomments
        };

        const { profile_image } = req.body;

        if (!profile_image) {
            return res.status(400).send('No image provided.');
        }

        const buffer = Buffer.from(profile_image, 'base64');
        
        if (req.files) {
            if (req.files.customerphoto) {
                documentData.customerphoto = req.files.customerphoto[0].buffer;
            }
            if (req.files.customersignature) {
                documentData.customersignature = req.files.customersignature[0].buffer;
            }
            if (req.files.aadharcardimage) {
                documentData.aadharcardimage = req.files.aadharcardimage[0].buffer;
            }
            if (req.files.addressproof) {
                documentData.addressproof = req.files.addressproof[0].buffer;
            }
            if (req.files.otherdocuments) {
                documentData.otherdocuments = req.files.otherdocuments[0].buffer;
            }
        };

        // Create document record
        const response = await Documents.create(documentData);

        // Remove binary data from response
        const sanitizedResponse = {
            id: response.id,
            userid: response.userid,
            typeof_addressproof: response.typeof_addressproof,
            additionalcomments: response.additionalcomments,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
        };

        return res.status(200).json(sanitizedResponse);
    } catch (err) {
        console.error('Error in addDocuments:', err);
        res.status(500).json({ error: err.message });
    }
};

const getDocuments = async (req, res) => {
    try {
        const { userid } = req.params;
        if (!userid) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const response = await Documents.findAll({ 
            where: { userid },
            attributes: {
                exclude: ['customerphoto', 'customersignature', 'aadharcardimage', 'addressproof', 'otherdocuments']
            }
        });

        if (response.length === 0) {
            return res.status(404).json({ message: 'No documents found for this user' });
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getDocuments, addDocuments };