document.addEventListener('DOMContentLoaded', () => {
    // Logik untuk laman login.html
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Mencegah form dari submit secara default
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulasi log masuk. Dalam aplikasi sebenar, ini akan melibatkan
            // panggilan ke API backend untuk pengesahan.
            if (username && password) {
                alert('Log Masuk Berjaya! Anda akan dialihkan ke laman sembang.');
                // Redirect ke laman utama sembang
                window.location.href = 'index.html';
            } else {
                alert('Sila masukkan nombor telefon/e-mel dan kata laluan.');
            }
        });
    }

    // Logik untuk laman index.html (laman sembang)
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const messageContainer = document.getElementById('messageContainer');
    const chatListItems = document.querySelectorAll('.chat-list-item');

    if (sendMessageBtn && messageInput && messageContainer) {
        // Fungsi untuk menghantar mesej
        const sendMessage = () => {
            const messageText = messageInput.value.trim();
            if (messageText) {
                const now = new Date();
                const time = now.toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });

                const newMessageDiv = document.createElement('div');
                newMessageDiv.classList.add('message', 'sent');
                newMessageDiv.innerHTML = `<p>${messageText}</p><span class="message-time">${time}</span>`;

                messageContainer.appendChild(newMessageDiv);
                messageInput.value = ''; // Kosongkan input
                messageContainer.scrollTop = messageContainer.scrollHeight; // Skrol ke bawah
            }
        };

        sendMessageBtn.addEventListener('click', sendMessage);

        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { // Hantar mesej apabila Enter ditekan, kecuali jika Shift + Enter
                e.preventDefault(); // Elak newline pada input
                sendMessage();
            }
        });
    }

    if (chatListItems) {
        // Fungsi untuk menukar sembang aktif
        chatListItems.forEach(item => {
            item.addEventListener('click', () => {
                // Buang kelas 'active' dari semua item
                chatListItems.forEach(i => i.classList.remove('active'));
                // Tambah kelas 'active' pada item yang diklik
                item.classList.add('active');

                // Di sini, anda akan memuatkan mesej untuk chat_id yang dipilih
                // Contoh simulasi:
                const chatId = item.dataset.chatId;
                const chatName = item.querySelector('.chat-name').textContent;
                const contactNameElement = document.querySelector('.chat-header .contact-name');
                const contactAvatarElement = document.querySelector('.chat-header .contact-avatar');

                if (contactNameElement) {
                    contactNameElement.textContent = chatName;
                }
                if (contactAvatarElement) {
                    // Update avatar kenalan (ini hanyalah contoh, dalam sebenar anda akan menggunakan URL gambar sebenar)
                    contactAvatarElement.src =
                     item.querySelector('.chat-avatar').src;
                }

                // Kosongkan dan tambah mesej simulasi untuk sembang baru
                if (messageContainer) {
                    messageContainer.innerHTML = '';
                    if (chatId === '1') {
                        messageContainer.innerHTML = `
                            <div class="message received">
                                <p>Hello, apa khabar?</p>
                                <span class="message-time">10:28 PG</span>
                            </div>
                            <div class="message sent">
                                <p>Alhamdulillah, baik. Awak?</p>
                                <span class="message-time">10:30 PG</span>
                            </div>
                        `;
                    } else if (chatId === '2') {
                        messageContainer.innerHTML = `
                            <div class="message received">
                                <p>Ada masa lapang tak petang ni?</p>
                                <span class="message-time">Semalam 14:00</span>
                            </div>
                            <div class="message sent">
                                <p>Ok, nanti saya call balik.</p>
                                <span class="message-time">Semalam 14:15</span>
                            </div>
                        `;
                    } else if (chatId === '3') {
                        messageContainer.innerHTML = `
                            <div class="message received">
                                <p>Mesyuarat pukul berapa harini?</p>
                                <span class="message-time">22/10/2026 09:00</span>
                            </div>
                            <div class="message sent">
                                <p>Mesyuarat pukul 2pm.</p>
                                <span class="message-time">22/10/2026 09:05</span>
                            </div>
                        `;
                    }
                    messageContainer.scrollTop = messageContainer.scrollHeight;
                }
            });
        });
    }
});