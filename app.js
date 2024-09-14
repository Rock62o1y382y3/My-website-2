document.getElementById('server-settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const serverName = document.getElementById('server-name').value;
    console.log('Server Name:', serverName);
    // Add AJAX call or fetch API to send data to the backend
});

document.getElementById('bot-settings-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const botPrefix = document.getElementById('bot-prefix').value;
    console.log('Bot Prefix:', botPrefix);
    // Add AJAX call or fetch API to send data to the backend
});
