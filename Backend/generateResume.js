const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume(filePath) {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(filePath));

    // Add a placeholder for an image in the top left corner
    const imagePath = path.join(__dirname, '.', 'SHM.jpg');
    if (fs.existsSync(imagePath)) {
        doc.save();
        doc.image(imagePath, 50, 50, { width: 100, height: 100 });
        doc.restore();
    } else {
        console.error(`Image not found at path: ${imagePath}`);
        doc.save();
        doc.text('Candidate Image', 50, 50);
        doc.restore();
    }

    // Add name
    doc.fontSize(24).text('HUDSON N MATAKALA', { align: 'center' });
    doc.moveDown();

    // Add contact information
    doc.fontSize(12).text('Email: samuelmatakala@gmail.com', { align: 'center' });
    doc.text('Phone: (+260) 974-897-112', { align: 'center' });
    doc.text('Address: New Chawama St, Lusaka, ZAMBIA', { align: 'center' });
    doc.moveDown();

    // Add a horizontal line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add the education section
    doc.fontSize(18).text('Education', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text('B.Sc. in Computer Science, The University of Zambia', { align: 'left' });
    doc.text('Graduated: 2025', { align: 'left' });
    doc.moveDown();

    // Add a horizontal line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add the experience section
    doc.fontSize(18).text('Experience', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text('Software Tester, CICT-DEPARTMENT, UNZA', { align: 'left' });
    doc.text('Dec 2023 - Apr 2024', { align: 'left' });
    doc.text('Responsibilities: Software Tester', { align: 'left' });
    doc.list([
        'Developed Test-case documentation for web applications System',
        'Collaborated with Software Development teams to fine tune features.',
        'Optimized applications for maximum speed and scalability.'
    ]);
    doc.moveDown();

    // Add a horizontal line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add the skills section
    doc.fontSize(18).text('Skills', { underline: true });
    doc.moveDown();
    doc.fontSize(12).list([
        'JavaScript',
        'Node.js',
        'Express.js',
        'HTML5',
        'CSS3',
        'React',
        'MySQL',
    ]);
    doc.moveDown();

    // Add a horizontal line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Add the projects section
    doc.fontSize(18).text('Projects', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text('Portfolio Website', { align: 'left' });
    doc.text('A personal portfolio website to showcase my projects and skills.', { align: 'left' });
    doc.moveDown();

    // Add a horizontal line separator
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown();

    // Finalize PDF file
    doc.end();
}

module.exports = generateResume;
