// Fetch the list of files from the server
async function fetchFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();

        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';  // Clear existing content

        files.forEach(file => {
            const listItem = document.createElement('li');
            const fileInfoDiv = document.createElement('li');
            const fileName = document.createElement('span');
            const fileSize = document.createElement('span');
            
            fileInfoDiv.className="fileInfo"
            fileSize.className="fileSize"
            listItem.className="fileListItem"
            fileName.textContent = file.fileName;
            fileSize.textContent = file.fileSize;

            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.onclick = () => downloadFile(file.fileName);

            fileInfoDiv.appendChild(fileName);
            fileInfoDiv.appendChild(fileSize);
            listItem.appendChild(fileInfoDiv);
            listItem.appendChild(downloadButton);
            fileList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

// Function to download a file
function downloadFile(fileName) {
    window.location.href = `/download/${fileName}`;
}

// Function to handle file upload
document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('file-input');
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            alert('File uploaded successfully');
            fetchFiles();  // Refresh the file list
        } else {
            alert('Upload failed: ' + result.error);
        }
    } catch (error) {
        console.error('Error uploading file:', error);
    }
});

// Fetch the files when the page loads
window.onload = fetchFiles;
setInterval(fetchFiles,3000)