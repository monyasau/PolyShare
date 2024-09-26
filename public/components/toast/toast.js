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
            spinner.style.border = '4px solid #f3f3f3';  // Light gray
            spinner.style.borderTop = '4px solid #000';  // Black spinner
            spinner.style.borderRadius = '50%';
            spinner.style.width = '15px';
            spinner.style.height = '15px';
            spinner.style.marginRight = '10px';
            spinner.style.animation = 'spin 1s linear infinite';

            // Define the keyframes for spin animation
            const styleSheet = document.createElement('style');
            styleSheet.type = 'text/css';
            styleSheet.innerText = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(styleSheet);

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

    // Remove the toast after the duration
    // setTimeout(() => {
    //     toast.style.opacity = '0';
    //     setTimeout(() => {
    //         toast.remove();
    //     }, 500);
    // }, duration);

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
