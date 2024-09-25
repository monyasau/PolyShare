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
// Function to open the file dialog when clicking on the custom upload area
function getFile() {
    document.getElementById("file-input").click();
}

// Function to display the selected file name
document.getElementById("file-input").addEventListener("change", function() {
    var fileInput = document.getElementById("file-input");
    var selectedFileDiv = document.getElementById("selectedFile");
    
    if (fileInput.files.length > 0) {
        var fileName = fileInput.files[0].name;
        selectedFileDiv.textContent = "Selected file: " + fileName;
    } else {
        selectedFileDiv.textContent = "No file has been selected";
    }
});

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


// document.addEventListener('DOMContentLoaded', function () {
//     const fileInput = document.getElementById('file-input');
//     const uploadArea = document.getElementById('uploadArea');
//     const uploadForm = document.getElementById('upload-form');

//     // Open file picker when the upload area is clicked
//     uploadArea.addEventListener('click', function() {
//         fileInput.click();
//     });

//     // Drag over event
//     uploadArea.addEventListener('dragover', function (e) {
//         e.preventDefault();
//         uploadArea.classList.add('dragover');
//     });

//     // Drag leave event
//     uploadArea.addEventListener('dragleave', function (e) {
//         uploadArea.classList.remove('dragover');
//     });

//     // Drop event
//     uploadArea.addEventListener('drop', function (e) {
//         e.preventDefault();
//         uploadArea.classList.remove('dragover');

//         // Get the dropped files
//         const files = e.dataTransfer.files;

//         // If the user dropped files, attach the first file to the input element
//         if (files.length > 0) {
//             fileInput.files = files;
//         }
//     });

//     // Submit form
//     uploadForm.addEventListener('submit', async function (e) {
//         e.preventDefault();

//         const formData = new FormData(uploadForm);
//         await fetch('/upload', { // Adjust URL to your upload endpoint
//             method: 'POST',
//             body: formData
//         }).then(response => {
//             return response.json();
//         }).then(result => {
//             console.log('Success:', result);
//             // Update file list or display success message
//         }).catch(error => {
//             console.error('Error:', error);
//         });
//     });
// });
