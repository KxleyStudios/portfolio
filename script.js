// ============================================
// DATA CONFIGURATION
// ============================================

// Art pieces - ADD YOUR ART FILES HERE
const artPieces = [
    { src: 'assets/art/art1.png', title: 'Gumball? (PIBBY artwork)' },
    { src: 'assets/art/art2.png', title: 'Kazz (Character Design)' },
    { src: 'assets/art/art3.png', title: 'Bibble (Character Design)' },
    { src: 'assets/art/art4.png', title: 'Pibby (AOT Style Recreation)' },
    { src: 'assets/art/art5.png', title: 'Gumball in... Grannies House?' },
    { src: 'assets/art/art6.png', title: '"Taking Control"' },
    { src: 'assets/art/art7.png', title: '"I feel the shift."' },
    { src: 'assets/art/art8.png', title: 'Pibby and BunBun (Character Design)' },
    { src: 'assets/art/art9.png', title: 'Its ME! (Character Design)' },
    // Add more art pieces like this:
    // { src: 'assets/art/art4.png', title: 'Art Piece 4' },
];

// Storyboards - ADD YOUR STORYBOARD FOLDERS HERE
const storyboards = [
    {
        title: 'NONE AVAILABLE CURRENTLY',
        thumbnail: 'assets/storyboards/storyboard1/thumbnail.png',
        panels: [
            'assets/storyboards/storyboard1/panel1.png',
            'assets/storyboards/storyboard1/panel2.png',
            'assets/storyboards/storyboard1/panel3.png',
        ]
    },
    {
        title: 'NONE AVAILABLE CURRENTLY',
        thumbnail: 'assets/storyboards/storyboard2/thumbnail.png',
        panels: [
            'assets/storyboards/storyboard2/panel1.png',
            'assets/storyboards/storyboard2/panel2.png',
        ]
    },
    // Add more storyboards like this:
    // {
    //     title: 'Storyboard 3',
    //     thumbnail: 'assets/storyboards/storyboard3/thumbnail.png',
    //     panels: [
    //         'assets/storyboards/storyboard3/panel1.png',
    //         'assets/storyboards/storyboard3/panel2.png',
    //     ]
    // },
];

// Animations - ADD YOUR MP4 FILES HERE
const animations = [
    { 
        src: 'assets/animations/animation1.mp4', 
        title: 'ROUGH - Gaze of a God (Crystalized)',
        thumbnail: 'assets/animations/animation1_thumb.png'
    },
    // Add more animations like this:
    // { 
    //     src: 'assets/animations/animation3.mp4', 
    //     title: 'Animation 3',
    //     thumbnail: 'assets/animations/animation3_thumb.png'
    // },
];

// ============================================
// TAB NAVIGATION
// ============================================

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ============================================
// LOAD ART GRID
// ============================================

const artGrid = document.getElementById('artGrid');

artPieces.forEach((art, index) => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.innerHTML = `<img src="${art.src}" alt="${art.title}">`;
    item.addEventListener('click', () => openArtLightbox(index));
    artGrid.appendChild(item);
});

// ============================================
// LOAD STORYBOARD GRID
// ============================================

const storyboardGrid = document.getElementById('storyboardGrid');

storyboards.forEach((storyboard, index) => {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.innerHTML = `<img src="${storyboard.thumbnail}" alt="${storyboard.title}">`;
    item.addEventListener('click', () => openStoryboardLightbox(index));
    storyboardGrid.appendChild(item);
});

// ============================================
// LOAD ANIMATION GRID
// ============================================

const animationGrid = document.getElementById('animationGrid');

animations.forEach(animation => {
    const item = document.createElement('div');
    item.className = 'animation-item';
    item.innerHTML = `
        <video controls>
            <source src="${animation.src}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <p>${animation.title}</p>
    `;
    animationGrid.appendChild(item);
});

// ============================================
// ART LIGHTBOX
// ============================================

const artLightbox = document.getElementById('artLightbox');
const lightboxArtImage = document.getElementById('lightboxArtImage');
const closeArt = document.getElementById('closeArt');
const prevArt = document.getElementById('prevArt');
const nextArt = document.getElementById('nextArt');

let currentArtIndex = 0;

function openArtLightbox(index) {
    currentArtIndex = index;
    updateArtLightbox();
    artLightbox.classList.add('active');
}

function updateArtLightbox() {
    lightboxArtImage.src = artPieces[currentArtIndex].src;
    lightboxArtImage.alt = artPieces[currentArtIndex].title;
}

closeArt.addEventListener('click', () => {
    artLightbox.classList.remove('active');
});

prevArt.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex - 1 + artPieces.length) % artPieces.length;
    updateArtLightbox();
});

nextArt.addEventListener('click', () => {
    currentArtIndex = (currentArtIndex + 1) % artPieces.length;
    updateArtLightbox();
});

// Close lightbox when clicking outside image
artLightbox.addEventListener('click', (e) => {
    if (e.target === artLightbox) {
        artLightbox.classList.remove('active');
    }
});

// ============================================
// STORYBOARD LIGHTBOX
// ============================================

const storyboardLightbox = document.getElementById('storyboardLightbox');
const lightboxPanelImage = document.getElementById('lightboxPanelImage');
const panelCounter = document.getElementById('panelCounter');
const closeStoryboard = document.getElementById('closeStoryboard');
const prevPanel = document.getElementById('prevPanel');
const nextPanel = document.getElementById('nextPanel');

let currentStoryboardIndex = 0;
let currentPanelIndex = 0;

function openStoryboardLightbox(index) {
    currentStoryboardIndex = index;
    currentPanelIndex = 0;
    updateStoryboardLightbox();
    storyboardLightbox.classList.add('active');
}

function updateStoryboardLightbox() {
    const storyboard = storyboards[currentStoryboardIndex];
    lightboxPanelImage.src = storyboard.panels[currentPanelIndex];
    panelCounter.textContent = `Panel ${currentPanelIndex + 1} of ${storyboard.panels.length}`;
    
    // Disable/enable navigation buttons
    prevPanel.disabled = currentPanelIndex === 0;
    nextPanel.disabled = currentPanelIndex === storyboard.panels.length - 1;
}

closeStoryboard.addEventListener('click', () => {
    storyboardLightbox.classList.remove('active');
});

prevPanel.addEventListener('click', () => {
    if (currentPanelIndex > 0) {
        currentPanelIndex--;
        updateStoryboardLightbox();
    }
});

nextPanel.addEventListener('click', () => {
    if (currentPanelIndex < storyboards[currentStoryboardIndex].panels.length - 1) {
        currentPanelIndex++;
        updateStoryboardLightbox();
    }
});

// Close lightbox when clicking outside
storyboardLightbox.addEventListener('click', (e) => {
    if (e.target === storyboardLightbox) {
        storyboardLightbox.classList.remove('active');
    }
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Art lightbox navigation
    if (artLightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevArt.click();
        if (e.key === 'ArrowRight') nextArt.click();
        if (e.key === 'Escape') closeArt.click();
    }
    
    // Storyboard lightbox navigation
    if (storyboardLightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') prevPanel.click();
        if (e.key === 'ArrowRight') nextPanel.click();
        if (e.key === 'Escape') closeStoryboard.click();
    }
});