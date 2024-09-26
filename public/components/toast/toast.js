export function Toast(message, type = 'info', duration=3000) {
    const toast = document.createElement('div');
    type!=="loading"?toast.textContent = message:null;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';
    toast.style.display = 'flex';  // To align icon and text
    toast.style.alignItems = 'center';  // Center align the text and icon
    toast.style.gap = '10px';  // Center align the text and icon

    // Set background color based on the toast type
    switch (type) {
        case 'success':
            toast.style.backgroundColor = 'green';
            break;
        case 'info':
            toast.style.backgroundColor = '#5bc0dec2';
            break;
        case 'warning':
            toast.style.backgroundColor = 'orange';
            break;
        case 'error':
            toast.style.backgroundColor = 'red';
            break;
        case 'loading':
            toast.style.backgroundColor = 'gray';
            toast.style.color = '#000';  // Optional: dark text for contrast on gray background
            toast.style.fontStyle = 'italic'; // To emphasize loading state

            // Create spinner (loading icon)
            const spinner = document.createElement('div');
            spinner.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/><path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"><animateTransform attributeName="transform" dur="0.563s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>';
            

            // Append spinner and message to toast
            toast.appendChild(spinner);
            const messageText = document.createElement('span');
            messageText.textContent = message + '...';  // Add ellipsis for loading effect
            toast.appendChild(messageText);
            break;
        default:
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Default for undefined types
            toast.textContent = message;
            break;
    }

    document.body.appendChild(toast);

    // Fade in the toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Set duration for removing the toast
    duration = type === 'loading' ? 99999999 : duration;

    const timeoutId = setTimeout(() => {
        closeToast();
    }, duration);

    // Function to remove the toast
    function closeToast() {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }

    // Return an object with a `close` method to allow programmatic closing
    return {
        close: closeToast
    };
}
