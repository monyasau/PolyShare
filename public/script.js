// Fetch the list of files from the server
async function fetchFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();

        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';  // Clear existing content

        files.forEach(file => {
            const listItem = document.createElement('li');

            const fileName = document.createElement('span');
            fileName.textContent = file;

            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download';
            downloadButton.onclick = () => downloadFile(file);

            listItem.appendChild(fileName);
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

// Fetch the files when the page loads
window.onload = fetchFiles;
