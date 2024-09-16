require('dotenv').config()
var qrcode = require('qrcode-terminal');
const express = require('express'); 
const fs = require('fs');
const path = require('path');
const os = require('os');
const multer = require('multer');


const app = express();
const PORT = process.env.PORT || 2345;

const publicPath = path.join(__dirname, 'public');
console.log("Serving static files from: ", publicPath);
app.use(express.static(publicPath));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIRECTORY);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });



// To Ensure the shared_files directory exists
const FILE_DIRECTORY = path.join(process.cwd(), 'shared_files');
if (!fs.existsSync(FILE_DIRECTORY)) {
    // If it does not exist the it will create it at runtime
    fs.mkdirSync(FILE_DIRECTORY);
}

const networkInterfaces = os.networkInterfaces();
let localIP;

for (const netInterface of Object.values(networkInterfaces)) {
    if (!netInterface) continue;
    for (const iface of netInterface) {
        if (iface.family === 'IPv4' && !iface.internal) {
            localIP = iface.address;
            break;
        }
    }
    if (localIP) break;
}

const resolvedIP = localIP || 'localhost';

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
    // fancy way to checks if the file exists
    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            if (!res.headersSent) {
                return res.status(404).send('File not found');
            }
        } else {
            res.download(file, (err) => {
                if (err) {
                    if (!res.headersSent) {
                        console.error('Error during file download:', err);
                        return res.status(500).send('Error downloading file');
                    }
                }
            });
        }
    });

    req.on('aborted', () => {
        console.log('Request aborted');
        if (!res.headersSent) {
            res.end();
        }
    });
});

// Endpoint to upload files
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filename: req.file.originalname });
});

// Serve the index.html on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://${resolvedIP}:${PORT}`);
    console.log(`Shared files directory: ${FILE_DIRECTORY}`);
    qrcode.generate(`http://${resolvedIP}:${PORT}`);
});
