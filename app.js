const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 2345;
const FILE_DIRECTORY = path.join(__dirname, 'shared_files');
