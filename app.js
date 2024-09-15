const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 2345;
const FILE_DIRECTORY = path.join(__dirname, 'shared_files');

// This shall Serve static HTML/CSS/JS files for the web interface
app.use(express.static('public'));

// API route to fetch available files (selected ofcourse)
app.get('/api/files', (req, res) => {
    fs.readdir(FILE_DIRECTORY, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to list files' });
        }
        res.json(files);
    });
});
