const generateResume = require('../generateResume');
const path = require('path');

exports.downloadResume = (req, res) => {
    const filePath = path.join(__dirname, '..', 'resume.pdf');

    generateResume(filePath);

    res.download(filePath, 'resume.pdf', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error generating resume');
        }
    });
};
