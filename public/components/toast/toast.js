export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.color = '#fff';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';

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
        default:
            toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Default for undefined types
            break;
    }

    document.body.appendChild(toast);

    // Fade in the toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Remove the toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}
