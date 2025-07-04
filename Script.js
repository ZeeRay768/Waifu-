document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // Fungsi untuk menambahkan pesan ke chat
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll ke bawah
    }

    // Fungsi untuk mengirim pesan ke API AI
    async function sendMessageToAI(message) {
        // Ini bagian penting! Kamu perlu ganti dengan API key dan endpoint yang sebenarnya
        // Contoh ini pakai placeholder, kamu harus daftar ke Google Gemini API atau sejenisnya
        const API_KEY = 'AIzaSyBWge5V-8hlD0RjSf6xmC_Y2RmIAL3GN_k'; // JANGAN PERNAH MENARUH API KEY LANGSUNG DI KODE PUBLIK!

        try {
                        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message // 'message' adalah input dari user
                        }]
                    }]
                })
            });


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Sesuaikan cara mengambil respons dari data. Tergantung API yang kamu pakai.
            // Contoh ini mengambil dari `data.candidates[0].content.parts[0].text` untuk Google Gemini
            const botResponse = data.candidates[0].content.parts[0].text; 
            addMessage('bot', botResponse);

        } catch (error) {
            console.error('Error contacting AI:', error);
            addMessage('bot', 'Hmph! Ada kesalahan. Aku tidak mau bicara denganmu sekarang.');
        }
    }

    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            sendMessageToAI(message); // Kirim pesan ke AI
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});
              
