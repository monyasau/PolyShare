import { Toast } from '../components/toast/toast.js';
/* Toast Usage Guide */

// Toast("Hello, this is a synchronous toast!","info",5000);
// // Toast("Hello, this is a synchronous toast!","warning",7000);
// // Toast("Hello, this is a synchronous toast!","error",9000);
// // Toast("Hello, this is a synchronous toast!","loading",11000);
// // Toast("Hello, this is a synchronous toast!","success",13000);

// Fetch the list of files from the server
async function fetchFiles() {
    try {
        const response = await fetch('/api/files');
        const files = await response.json();

        const fileList = document.getElementById('file-list');
        const header = document.getElementById('header');
        if(files.length>0){
        header.innerHTML = files.length===1?"<code>1</code> file is ready to be shared ":`<code>${files.length}</code> files are ready for transfer.`;  // Clear existing content if there are files
        fileList.innerHTML = '';  // Clear existing content if there are files
    }else{
        header.innerHTML = "Currently, there are no files ready to be transferred";  // Clear existing content if there are files
            fileList.innerHTML="With <code>PolyShare</code>, you can easily share files—like videos, photos, documents, or apps—between your devices, as long as they’re on the same Wi-Fi or Ethernet network interface.<em> Try adding some files to begin.</em>"
        }

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
        // Toast(`An error occured, reload the page and try again`,"error")
        console.error('Error fetching files:', error);
    }
}
// Function to open the file dialog when clicking on the custom upload area
const triggerFileSelect=()=>document.getElementById("file-input").click();
document.getElementById("fileSelectModalTrigger").addEventListener("click", triggerFileSelect);


// Function to display the selected file name
document.getElementById("file-input").addEventListener("change", function() {
    var fileInput = document.getElementById("file-input");
    var selectedFileDiv = document.getElementById("selectedFile");
    
    if (fileInput.files.length > 0) {
        var fileName = fileInput.files[0].name;
        selectedFileDiv.textContent = fileName+" is ready for upload";
    } else {
        selectedFileDiv.textContent = "No file has been selected";
    }
});

// Function to download a file
function downloadFile(fileName) {
    Toast(`Download of ${fileName} has start`,"success")
    window.location.href = `/download/${fileName}`;
}

// Function to handle file upload
document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('file-input');
    const currentFile = fileInput.files[0]
    formData.append('file', currentFile);
    
    try {
        const uploadingToast = Toast(`Uploading ${currentFile.name}`,"loading")
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (response.ok) {
            uploadingToast.close()
            Toast(`${currentFile.name} has been uploaded successfully`,"success",4000);
            fetchFiles();  // Refresh the file list
        } else {
            Toast(`Upload of ${currentFile.name} failed, try again`,"error",4000);
        }
    } catch (error) {
        Toast(`Upload of ${currentFile.name} failed, try again`,"error",4000);
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
