document.addEventListener('DOMContentLoaded', () => {
    // --- Constants & State ---
    const LYRICS = [
        "Belum ada satu bulan, ku yakin masih ada sisa wangiku di bajumu.",
        "Apa mungkin, kamu lupa, bahwa kita pernah sedia payung berdua?",
        "Kata mereka ini berlebihan, merayakan kesedihan.",
        "Untungnya, bumi masih berputar, untungnya ku tak pilih menyerah.",
        "Mungkin ini sudah takdirnya, kita tak bisa bersama.",
        "Lari sejauh mungkin, namun bayangmu tetap mendekat."
    ];

    let events = JSON.parse(localStorage.getItem('bernadya_events')) || [
        { id: 1, title: 'Jakarta Concert', location: 'Gelora Bung Karno', date: '2025-11-25T19:00', marked: true },
        { id: 2, title: 'Bandung Showcase', location: 'Eldorado Dome', date: '2025-12-12T20:00', marked: false },
        { id: 3, title: 'Surabaya Tour', location: 'Jatim Expo', date: '2026-01-08T18:30', marked: false }
    ];

    let currentView = 'grid'; // 'grid' or 'list'

    // --- DOM Elements ---
    const lyricDisplay = document.getElementById('lyric-display');
    const eventsContainer = document.getElementById('events-container');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const btnOpenModal = document.getElementById('btn-open-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const eventForm = document.getElementById('event-form');
    const viewGridBtn = document.getElementById('view-grid');
    const viewListBtn = document.getElementById('view-list');

    // Countdown Elements
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdLabel = document.getElementById('countdown-label');

    // --- Lyric Generator ---
    function setRandomLyric() {
        const randomIndex = Math.floor(Math.random() * LYRICS.length);
        lyricDisplay.textContent = `"${LYRICS[randomIndex]}"`;
    }
    setRandomLyric();

    // --- Countdown Logic ---
    function updateCountdown() {
        const now = new Date().getTime();

        // Find nearest future marked event
        const futureMarkedEvents = events
            .filter(e => e.marked && new Date(e.date).getTime() > now)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (futureMarkedEvents.length === 0) {
            cdDays.textContent = "00";
            cdHours.textContent = "00";
            cdMinutes.textContent = "00";
            cdLabel.textContent = "Menunggu kabar...";
            return;
        }

        const nextEvent = futureMarkedEvents[0];
        const distance = new Date(nextEvent.date).getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        cdDays.textContent = String(days).padStart(2, '0');
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMinutes.textContent = String(minutes).padStart(2, '0');
        cdLabel.textContent = `Countdown to ${nextEvent.title}`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- Event Rendering ---
    function renderEvents() {
        eventsContainer.innerHTML = '';

        // Update Grid/List Classes
        if (currentView === 'grid') {
            eventsContainer.classList.add('grid-cols-1', 'md:grid-cols-3');
            eventsContainer.classList.remove('flex', 'flex-col');
        } else {
            eventsContainer.classList.remove('grid-cols-1', 'md:grid-cols-3');
            eventsContainer.classList.add('flex', 'flex-col');
        }

        events.forEach(event => {
            const dateObj = new Date(event.date);
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

            const card = document.createElement('div');
            card.className = `event-card relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl overflow-hidden group ${currentView === 'list' ? 'flex justify-between items-center' : ''}`;

            // Card Content
            const contentHtml = `
                <div class="${currentView === 'list' ? 'flex-1' : ''}">
                    <p class="text-xs text-gray-400 uppercase tracking-widest mb-2">${dateStr} • ${timeStr}</p>
                    <h3 class="text-xl font-medium mb-1 text-white group-hover:text-gray-200 transition-colors">${event.title}</h3>
                    <p class="text-sm text-gray-500 font-light">${event.location}</p>
                </div>
            `;

            // Actions
            const actionsHtml = `
                <div class="flex items-center gap-4 ${currentView === 'grid' ? 'mt-6 justify-between' : ''}">
                    <button onclick="toggleMark(${event.id})" class="transition-transform active:scale-90 focus:outline-none" title="Mark as Attending">
                        <svg class="w-6 h-6 ${event.marked ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </button>
                    <button onclick="deleteEvent(${event.id})" class="text-gray-600 hover:text-white transition-colors text-xs uppercase tracking-wider">
                        Delete
                    </button>
                </div>
            `;

            card.innerHTML = contentHtml + actionsHtml;
            eventsContainer.appendChild(card);
        });
    }

    // --- Actions ---
    window.toggleMark = (id) => {
        const event = events.find(e => e.id === id);
        if (event) {
            event.marked = !event.marked;
            saveEvents();
            renderEvents();
            updateCountdown();
        }
    };

    window.deleteEvent = (id) => {
        if (confirm('Are you sure you want to delete this event?')) {
            events = events.filter(e => e.id !== id);
            saveEvents();
            renderEvents();
            updateCountdown();
        }
    };

    function saveEvents() {
        localStorage.setItem('bernadya_events', JSON.stringify(events));
    }

    // --- Modal Logic ---
    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => modalContent.classList.add('open'), 10);
    }

    function closeModal() {
        modalContent.classList.remove('open');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    btnOpenModal.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === document.getElementById('modal-backdrop')) closeModal();
    });

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('input-title').value;
        const location = document.getElementById('input-location').value;
        const dateVal = document.getElementById('input-date-only').value;
        const timeVal = document.getElementById('input-time-only').value;
        const date = `${dateVal}T${timeVal}`;

        const newEvent = {
            id: Date.now(),
            title,
            location,
            date,
            marked: false
        };

        events.push(newEvent);
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        saveEvents();
        renderEvents();
        updateCountdown();

        eventForm.reset();
        closeModal();
    });

    // --- View Switcher ---
    viewGridBtn.addEventListener('click', () => {
        currentView = 'grid';
        viewGridBtn.classList.add('active-view');
        viewListBtn.classList.remove('active-view');
        renderEvents();
    });

    viewListBtn.addEventListener('click', () => {
        currentView = 'list';
        viewListBtn.classList.add('active-view');
        viewGridBtn.classList.remove('active-view');
        renderEvents();
    });

    // --- Parallax Effect ---
    const heroSection = document.getElementById('hero-section');
    const heroVideo = document.getElementById('hero-video-container');

    if (heroSection && heroVideo) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate percentage from center (-1 to 1)
            const x = (clientX / innerWidth - 0.5) * 2;
            const y = (clientY / innerHeight - 0.5) * 2;

            // Move video slightly in opposite direction
            const moveX = -x * 20; // Max 20px movement
            const moveY = -y * 20;

            heroVideo.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Initial Render
    renderEvents();
});
