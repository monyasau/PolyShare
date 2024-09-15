const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 2345;
const FILE_DIRECTORY = path.join(__dirname, 'shared_files');


// To Ensure the shared_files directory exists
if (!fs.existsSync(FILE_DIRECTORY)) {
    // If it does not exist the it will create it at runtime
    fs.mkdirSync(FILE_DIRECTORY);
}

const networkInterfaces = os.networkInterfaces();
let localIP;

for (const interface of Object.values(networkInterfaces)) {
    for (const iface of interface) {
        if (iface.family === 'IPv4' && !iface.internal) {
            localIP = iface.address;
            break;
        }
    }
    if (localIP) break;
}

// This shall Serve static HTML/CSS/JS files for the web interface
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch available files (selected ofcourse)
app.get('/api/files', (req, res) => {
    fs.readdir(FILE_DIRECTORY, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to list files' });
        }
        res.json(files);
    });
});

// Dynamic route for download of specific files
app.get('/download/:filename', (req, res) => {
    const file = path.join(FILE_DIRECTORY, req.params.filename);
    res.download(file, (err) => {
        if (err) {
            res.status(404).send('File not found');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${localIP}:${PORT}`);
    console.log(`Shared files directory: ${FILE_DIRECTORY}`);
});
