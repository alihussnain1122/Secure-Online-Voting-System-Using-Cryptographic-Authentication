const crypto = require('crypto');
const Vote = require('../models/Vote');
const Voter = require('../models/Voter');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// --- AES Encryption Setup ---
const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.AES_SECRET_KEY, 'hex'); // 32 bytes (64 hex characters)
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// --- Vote Submission Controller ---
exports.submitVote = async (req, res) => {
  try {
    const { voterID, electionID, voteChoice } = req.body;

    // Validate input
    if (!voterID || !electionID || !voteChoice) {
      return res.status(400).json({ message: 'voterID, electionID, and voteChoice are required.' });
    }

    // Check if the voter has already voted in this election
    const existingVote = await Vote.findOne({ voterID, electionID });
    if (existingVote) {
      return res.status(400).json({ message: 'Voter has already voted in this election.' });
    }

    // Encrypt the vote
    const encryptedVote = encrypt(voteChoice);

    // Create and save the new vote
    const newVote = new Vote({
      voterID,
      electionID,
      voteChoice: encryptedVote
    });
    await newVote.save();

    // --- Generate PDF Receipt ---
    const voter = await Voter.findById(voterID);
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found.' });
    }

    const timestamp = Date.now();
    const receiptDir = path.join(__dirname, '../receipts');
    if (!fs.existsSync(receiptDir)) {
      fs.mkdirSync(receiptDir); // Create directory if not exists
    }

    // Receipt file name and path
    const receiptName = `receipt_${voterID}_${timestamp}.pdf`;
    const receiptPath = path.join(receiptDir, receiptName);

    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(receiptPath));

    doc.fontSize(20).text('Vote Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Voter ID: ${voterID}`);
    doc.text(`Name: ${voter.fullName || 'N/A'}`);
    doc.text(`Election ID: ${electionID}`);
    doc.text(`Encrypted Vote: ${encryptedVote}`);
    doc.text(`Timestamp: ${new Date(timestamp).toLocaleString()}`);
    doc.end();

    // --- Generate Certificate ---
    const certificateName = `certificate_${voterID}_${timestamp}.pdf`;
    const certificatePath = path.join(receiptDir, certificateName);

    const certDoc = new PDFDocument();
    certDoc.pipe(fs.createWriteStream(certificatePath));

    certDoc.fontSize(24).text('Certificate of Voting', { align: 'center' });
    certDoc.moveDown();
    certDoc.fontSize(16).text(`This certificate is proudly awarded to`, { align: 'center' });
    certDoc.moveDown(0.5);
    certDoc.fontSize(18).text(`${voter.fullName || 'Unnamed Voter'}`, { align: 'center', underline: true });
    certDoc.moveDown(0.5);
    certDoc.fontSize(14).text(`For casting their vote in Election ID: ${electionID}`, { align: 'center' });
    certDoc.moveDown(1);
    certDoc.text(`Date: ${new Date(timestamp).toLocaleDateString()}`, { align: 'center' });
    certDoc.moveDown(2);
    certDoc.fontSize(12).text('— Secure Online Voting System', { align: 'center' });

    certDoc.end();

    // Respond with receipt and certificate paths
    return res.status(201).json({
      message: 'Vote successfully submitted',
      receipt: {
        fileName: receiptName,
        path: receiptPath
      },
      certificate: {
        fileName: certificateName,
        path: certificatePath
      }
    });

  } catch (error) {
    console.error('Submit Vote Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// --- Vote Results Controller ---
exports.getVoteResults = async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $group: { _id: "$voteChoice", count: { $sum: 1 } } }, // Group votes by choice
      { $sort: { count: -1 } } // Sort by count (most votes first)
    ]);

    // Return encrypted vote results (for privacy)
    res.status(200).json(results); 
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Server error while fetching results' });
  }
};
