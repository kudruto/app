window.Telegram.WebApp.expand();

const ws = new WebSocket('wss://de25-94-131-123-13.ngrok-free.app/ws');

fetch('https://de25-94-131-123-13.ngrok-free.app/DataChecking', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(window.Telegram.WebApp.initData)
})
.then(response => response.json())
.then(data => {
    if (data.ok) {
        ws.onopen = () => {
            console.log('Подключен к WebSocket');
        };

        ws.onmessage = (event) => {
            const messageContainer = document.getElementById('messages');
            const messageElement = document.createElement('div');
            messageElement.textContent = event.data;
            messageContainer.appendChild(messageElement);
        };

        ws.onclose = () => {
            console.log('Отключено от WebSocket');
        };

        const sendMessage = () => {
            const input = document.getElementById('messageInput');
            const message = input.value;
            if (message) {
                ws.send(message);
                input.value = '';
            }
        };

        document.getElementById('sendButton').addEventListener('click', sendMessage);

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    } else {
        console.error("Проверка не удалась");
    }
})
.catch(error => {
    console.error('Ошибка при проверке данных:', error);
});