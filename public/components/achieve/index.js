const newEvent=(eventName, customData = {})=> {
    const payload = {
        eventName: eventName, 
        timestamp: new Date().toISOString(), 
        customData: customData
    };

    // Send the payload to your backend
    fetch('https://achieve-api.vercel.app/v0/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            // throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => null)
    .catch(error => null);
}
module.exports = { newEvent };
