document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('result');
  const logsDiv = document.getElementById('logs');
  const downloadButton = document.getElementById('downloadButton');
  const container = document.querySelector('.container'); // Select the container element

  let outputText = ''; // Variable to store output text

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type || 'Unknown';
      const fileSize = formatBytes(file.size);
      const metadata = getFileMetadata(file);
      const timestamp = new Date().toLocaleString();
      const logEntry = `${timestamp}: File Type - ${fileType}, File Size - ${fileSize}`;

      // Simple malware detection based on file name
      const isMalware = detectMalware(file.name);

      // Display analysis result
      const resultText = `
        <p><strong>File Type:</strong> ${fileType}</p>
        <p><strong>File Size:</strong> ${fileSize}</p>
        <p><strong>Metadata:</strong></p>
        <pre>${metadata}</pre>
        <p><strong>Malware Detection:</strong> ${isMalware ? 'Detected' : 'Not Detected'}</p>
      `;
      resultDiv.innerHTML = resultText;
      
      // Store log entry locally
      storeLog(logEntry);

      // Display logs
      displayLogs();

      // Enable download button
      // downloadButton.disabled = false;

      // Add or remove malware-detected class based on the result
      if (isMalware) {
        container.classList.add('malware-detected');
      } else {
        container.classList.remove('malware-detected');
      }
    }
  });

  // Rest of your JavaScript code...

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function getFileMetadata(file) {
    let metadata = '';
    if ('name' in file) {
      metadata += `Name: ${file.name}\n`;
    }
    if ('lastModified' in file) {
      metadata += `Last Modified: ${new Date(file.lastModified)}\n`;
    }
    if ('lastModifiedDate' in file) {
      metadata += `Last Modified Date: ${new Date(file.lastModifiedDate)}\n`;
    }
    if ('type' in file) {
      metadata += `Type: ${file.type}\n`;
    }
    if ('size' in file) {
      metadata += `Size: ${formatBytes(file.size)}\n`;
    }
    return metadata.trim();
  }

  function storeLog(logEntry) {
    // Append log entry to outputText
    outputText += logEntry + '\n';
  }

  function displayLogs() {
    // Display logs in the logsDiv
    logsDiv.innerHTML = '<h2>Scan Logs</h2>';
    logsDiv.innerHTML += '<pre>' + outputText + '</pre>';
  }

  function detectMalware(fileName) {
    const malwareKeywords = ['virus', 'malware', 'trojan'];
    const lowerCaseFileName = fileName.toLowerCase();
    for (const keyword of malwareKeywords) {
      if (lowerCaseFileName.includes(keyword)) {
        return true;
      }
    }
    return false;
  }
});
