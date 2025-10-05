// Socket state management
let sockets = [
    { id: 1, name: "Socket 1", active: true, power: 33 },
    { id: 2, name: "Socket 2", active: false, power: 0 },
    { id: 3, name: "Socket 3", active: false, power: 0 },
    { id: 4, name: "Socket 4", active: false, power: 0 }
];

// Theme management
let isDarkTheme = false;

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const body = document.body;
    const themeNavIcon = document.getElementById('theme-nav-icon');
    const themeNavText = document.getElementById('theme-nav-text');

    if (isDarkTheme) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeNavIcon.textContent = '';
        themeNavText.textContent = 'Light';
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeNavIcon.textContent = '';
        themeNavText.textContent = 'Dark';
    }
}

// Initialize the app
function initApp() {
    renderSockets();
    updateStats();
}

// Render sockets grid
function renderSockets() {
    const grid = document.getElementById('socketsGrid');
    grid.innerHTML = '';

    sockets.forEach(socket => {
        const socketElement = document.createElement('div');
        socketElement.className = 'socket-item';
        socketElement.innerHTML = `
            <div class="toggle-container">
                <div class="socket-name">${socket.name}</div>
                <button class="toggle-switch ${socket.active ? 'on' : ''}" 
                        onclick="toggleSocket(${socket.id})">
                    <div class="toggle-knob">
                        <div class="toggle-icon">⚡</div>
                    </div>
                </button>
                <div class="power-info ${socket.active ? 'visible' : ''}" id="power-info-${socket.id}">
                    <span class="power-value" id="power-value-${socket.id}">${socket.power}W</span>
                </div>
            </div>
        `;
        grid.appendChild(socketElement);
    });
}

// Toggle socket state
function toggleSocket(socketId) {
    const socketIndex = socketId - 1;
    const socket = sockets[socketIndex];
    
    // Toggle active state
    socket.active = !socket.active;
    socket.power = socket.active ? Math.floor(Math.random() * 40) + 10 : 0;
    
    // Update UI with animation
    renderSockets();
    updateStats();
}

// Update statistics
function updateStats() {
    const totalPower = sockets.reduce((sum, socket) => sum + socket.power, 0);
    const activeSockets = sockets.filter(socket => socket.active).length;

    document.getElementById('totalPower').textContent = totalPower + 'W';
    document.getElementById('activeSockets').textContent = activeSockets + ' / 4';
}

// Save settings
function saveSettings() {
    const socketNames = document.querySelectorAll('.setting-input[type="text"]');
    const powerLimits = document.querySelectorAll('.setting-input[type="number"]');
    
    // Update socket names
    socketNames.forEach((input, index) => {
        sockets[index].name = input.value;
    });
    
    // Show success message
    alert('Settings saved successfully!');
    
    // Update the home page with new names
    if (document.getElementById('home-page').classList.contains('active')) {
        renderSockets();
    }
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initApp);