// Set current year automatically
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initial check in case page is already scrolled
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        }
    }
});

// Theme Switching
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

// Set default theme
body.classList.add('theme-neon');
themeButtons[0].classList.add('active');

themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        
        // Remove all theme classes
        body.classList.remove('theme-neon', 'theme-pastel', 'theme-high-contrast');
        
        // Add new theme class
        body.classList.add(`theme-${theme}`);
        
        // Update active button
        themeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Save theme preference
        localStorage.setItem('creative-theme', theme);
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('creative-theme');
if (savedTheme) {
    const themeButton = document.querySelector(`[data-theme="${savedTheme}"]`);
    if (themeButton) {
        themeButton.click();
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 5px 30px rgba(59, 130, 246, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill level bars
            if (entry.target.classList.contains('skill-card')) {
                const levelBar = entry.target.querySelector('.skill-level-fill');
                if (levelBar) {
                    const level = levelBar.getAttribute('data-level');
                    let width = 0;
                    switch(level) {
                        case 'Beginner': width = 25; break;
                        case 'Intermediate': width = 50; break;
                        case 'Advanced': width = 75; break;
                        case 'Expert': width = 100; break;
                    }
                    setTimeout(() => {
                        levelBar.style.width = width + '%';
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .skill-card, .project-card, .timeline-item, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Animate numbers or counters if needed
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add active state to navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Cursor trail effect (optional - can be enabled)
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = e.pageX + 'px';
        dot.style.top = e.pageY + 'px';
        document.body.appendChild(dot);
        
        setTimeout(() => {
            dot.remove();
        }, 1000);
    });
};

// Customization Panel Functionality
function initCustomizationPanel() {
    const panel = document.getElementById('customizationPanel');
    const panelToggle = document.getElementById('panelToggle');
    const panelOpenBtn = document.getElementById('panelOpenBtn');
    const themeSelector = document.getElementById('themeSelector');
    const layoutSelector = document.getElementById('layoutSelector');
    const primaryColor = document.getElementById('primaryColor');
    const secondaryColor = document.getElementById('secondaryColor');
    const accentColor = document.getElementById('accentColor');
    const fontSize = document.getElementById('fontSize');
    const fontSizeValue = document.getElementById('fontSizeValue');
    const resetBtn = document.getElementById('resetStyles');
    
    // Panel toggle functionality
    panelOpenBtn.addEventListener('click', () => {
        panel.classList.add('open');
        panelOpenBtn.classList.add('hidden');
    });
    
    panelToggle.addEventListener('click', () => {
        panel.classList.remove('open');
        panelOpenBtn.classList.remove('hidden');
    });
    
    // Theme switching
    themeSelector.addEventListener('change', (e) => {
        const theme = e.target.value;
        document.body.className = `theme-${theme}`;
        localStorage.setItem('creative-theme', theme);
        
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
    });
    
    // Layout switching
    layoutSelector.addEventListener('change', (e) => {
        const layout = e.target.value;
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.setAttribute('data-layout', layout);
            localStorage.setItem('projects-layout', layout);
        }
    });
    
    // Color customization
    primaryColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--primary-color', e.target.value);
        localStorage.setItem('primary-color', e.target.value);
    });
    
    secondaryColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--secondary-color', e.target.value);
        localStorage.setItem('secondary-color', e.target.value);
    });
    
    accentColor.addEventListener('input', (e) => {
        document.documentElement.style.setProperty('--accent-color', e.target.value);
        localStorage.setItem('accent-color', e.target.value);
    });
    
    // Font size adjustment
    fontSize.addEventListener('input', (e) => {
        const size = e.target.value;
        document.documentElement.style.setProperty('--font-size', `${size}px`);
        fontSizeValue.textContent = `${size}px`;
        localStorage.setItem('font-size', size);
    });
    
    // Reset functionality
    resetBtn.addEventListener('click', () => {
        // Reset colors
        document.documentElement.style.removeProperty('--primary-color');
        document.documentElement.style.removeProperty('--secondary-color');
        document.documentElement.style.removeProperty('--accent-color');
        document.documentElement.style.removeProperty('--font-size');
        
        // Reset theme
        document.body.className = 'theme-neon';
        themeSelector.value = 'neon';
        
        // Reset layout
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.setAttribute('data-layout', 'grid');
        }
        layoutSelector.value = 'grid';
        
        // Reset font size
        fontSize.value = '16';
        fontSizeValue.textContent = '16px';
        
        // Clear localStorage
        localStorage.removeItem('primary-color');
        localStorage.removeItem('secondary-color');
        localStorage.removeItem('accent-color');
        localStorage.removeItem('font-size');
        localStorage.removeItem('projects-layout');
        
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === 'neon') {
                btn.classList.add('active');
            }
        });
    });
    
    // Load saved customizations
    loadSavedCustomizations();
}

function loadSavedCustomizations() {
    // Load saved colors
    const savedPrimaryColor = localStorage.getItem('primary-color');
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
        document.getElementById('primaryColor').value = savedPrimaryColor;
    }
    
    const savedSecondaryColor = localStorage.getItem('secondary-color');
    if (savedSecondaryColor) {
        document.documentElement.style.setProperty('--secondary-color', savedSecondaryColor);
        document.getElementById('secondaryColor').value = savedSecondaryColor;
    }
    
    const savedAccentColor = localStorage.getItem('accent-color');
    if (savedAccentColor) {
        document.documentElement.style.setProperty('--accent-color', savedAccentColor);
        document.getElementById('accentColor').value = savedAccentColor;
    }
    
    // Load saved font size
    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
        document.documentElement.style.setProperty('--font-size', `${savedFontSize}px`);
        document.getElementById('fontSize').value = savedFontSize;
        document.getElementById('fontSizeValue').textContent = `${savedFontSize}px`;
    }
    
    // Load saved layout
    const savedLayout = localStorage.getItem('projects-layout');
    if (savedLayout) {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.setAttribute('data-layout', savedLayout);
        }
        document.getElementById('layoutSelector').value = savedLayout;
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Trigger any initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }

    // Initialize drag and drop functionality
    initializeDragAndDrop();
    
    // Initialize section management
    initializeSectionManagement();
});

// Section Management System
class SectionManager {
    constructor() {
        this.sections = [
            { id: 'home', name: 'Home/Hero', enabled: true, order: 0 },
            { id: 'about', name: 'About Me', enabled: true, order: 1 },
            { id: 'skills', name: 'Skills', enabled: true, order: 2 },
            { id: 'projects', name: 'Projects', enabled: true, order: 3 },
            { id: 'experience', name: 'Experience', enabled: true, order: 4 },
            { id: 'contact', name: 'Contact', enabled: true, order: 5 }
        ];
        this.customSections = [];
        this.loadConfiguration();
        this.initializeEventListeners();
    }

    loadConfiguration() {
        const savedConfig = localStorage.getItem('sectionConfiguration');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            this.sections = config.sections || this.sections;
            this.customSections = config.customSections || [];
            this.applyConfiguration();
        }
    }

    saveConfiguration() {
        const config = {
            sections: this.sections,
            customSections: this.customSections
        };
        localStorage.setItem('sectionConfiguration', JSON.stringify(config));
    }

    initializeEventListeners() {
        // Panel toggle
        const panelToggle = document.getElementById('sectionPanelToggle');
        const panel = document.getElementById('sectionManagementPanel');
        const closeBtn = document.getElementById('closeSectionPanel');

        if (panelToggle) {
            panelToggle.addEventListener('click', () => {
                panel.classList.add('open');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                panel.classList.remove('open');
            });
        }

        // Section toggles
        this.sections.forEach(section => {
            const checkbox = document.getElementById(`toggle-${section.id}`);
            if (checkbox) {
                checkbox.checked = section.enabled;
                checkbox.addEventListener('change', (e) => {
                    section.enabled = e.target.checked;
                });
            }
        });

        // Move up/down buttons
        document.querySelectorAll('.move-up-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionItem = e.target.closest('.section-item');
                const sectionId = sectionItem.dataset.section;
                this.moveSection(sectionId, 'up');
            });
        });

        document.querySelectorAll('.move-down-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionItem = e.target.closest('.section-item');
                const sectionId = sectionItem.dataset.section;
                this.moveSection(sectionId, 'down');
            });
        });

        // Section type selector
        const typeSelector = document.getElementById('customSectionType');
        if (typeSelector) {
            typeSelector.addEventListener('change', (e) => {
                this.handleSectionTypeChange(e.target.value);
            });
        }

        // File input handling
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(e.target.files);
            });
        }

        // Add custom section
        const addBtn = document.getElementById('addCustomSection');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.addCustomSection();
            });
        }

        // Apply changes
        const applyBtn = document.getElementById('applySectionChanges');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyConfiguration();
                this.updateNavigation();
                this.saveConfiguration();
                this.showNotification('Section changes applied successfully!');
            });
        }

        // Reset sections
        const resetBtn = document.getElementById('resetSections');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }
    }

    moveSection(sectionId, direction) {
        const sectionIndex = this.sections.findIndex(s => s.id === sectionId);
        if (sectionIndex === -1) return;

        const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
        if (newIndex < 0 || newIndex >= this.sections.length) return;

        // Swap sections
        [this.sections[sectionIndex], this.sections[newIndex]] = 
        [this.sections[newIndex], this.sections[sectionIndex]];

        // Update order values
        this.sections.forEach((section, index) => {
            section.order = index;
        });

        this.updateSectionList();
    }

    addCustomSection() {
        const nameInput = document.getElementById('customSectionName');
        const contentInput = document.getElementById('customSectionContent');
        
        const name = nameInput.value.trim();
        const content = contentInput.value.trim();
        
        if (!name || !content) {
            this.showNotification('Please enter both section name and content', 'error');
            return;
        }

        const customSection = {
            id: `custom-${Date.now()}`,
            name: name,
            content: content,
            enabled: true,
            order: this.sections.length + this.customSections.length
        };

        this.customSections.push(customSection);
        this.updateCustomSectionsList();
        
        // Clear inputs
        nameInput.value = '';
        contentInput.value = '';
        
        this.showNotification('Custom section added!');
    }

    deleteCustomSection(sectionId) {
        this.customSections = this.customSections.filter(s => s.id !== sectionId);
        this.updateCustomSectionsList();
        this.showNotification('Custom section deleted');
    }

    updateSectionList() {
        const container = document.getElementById('existingSections');
        if (!container) return;

        // Sort sections by order
        const sortedSections = [...this.sections].sort((a, b) => a.order - b.order);
        
        container.innerHTML = sortedSections.map(section => `
            <div class="section-item" data-section="${section.id}">
                <input type="checkbox" id="toggle-${section.id}" ${section.enabled ? 'checked' : ''}>
                <label for="toggle-${section.id}">${section.name}</label>
                <div class="section-controls">
                    <button class="move-up-btn" title="Move Up">↑</button>
                    <button class="move-down-btn" title="Move Down">↓</button>
                </div>
            </div>
        `).join('');

        // Re-attach event listeners
        this.reattachSectionListeners();
    }

    updateCustomSectionsList() {
        const container = document.getElementById('customSections');
        if (!container) return;

        container.innerHTML = this.customSections.map(section => `
            <div class="custom-section-item">
                <span class="section-name">${section.name}</span>
                <button class="delete-section-btn" data-section-id="${section.id}">Delete</button>
            </div>
        `).join('');

        // Attach delete listeners
        container.querySelectorAll('.delete-section-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionId = e.target.dataset.sectionId;
                this.deleteCustomSection(sectionId);
            });
        });
    }

    reattachSectionListeners() {
        // Section toggles
        this.sections.forEach(section => {
            const checkbox = document.getElementById(`toggle-${section.id}`);
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    section.enabled = e.target.checked;
                });
            }
        });

        // Move buttons
        document.querySelectorAll('.move-up-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionItem = e.target.closest('.section-item');
                const sectionId = sectionItem.dataset.section;
                this.moveSection(sectionId, 'up');
            });
        });

        document.querySelectorAll('.move-down-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionItem = e.target.closest('.section-item');
                const sectionId = sectionItem.dataset.section;
                this.moveSection(sectionId, 'down');
            });
        });
    }

    applyConfiguration() {
        // Hide/show sections based on configuration
        this.sections.forEach(section => {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement) {
                sectionElement.style.display = section.enabled ? 'block' : 'none';
            }
        });

        // Reorder sections
        const allSections = [...this.sections, ...this.customSections].sort((a, b) => a.order - b.order);
        const body = document.body;
        
        allSections.forEach(section => {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement && section.enabled) {
                // Move section to its proper position
                const referenceSection = this.findNextSection(section);
                if (referenceSection) {
                    body.insertBefore(sectionElement, referenceSection);
                } else {
                    body.appendChild(sectionElement);
                }
            }
        });

        // Add custom sections to DOM
        this.customSections.forEach(section => {
            if (section.enabled && !document.getElementById(section.id)) {
                const sectionElement = this.createCustomSectionElement(section);
                const referenceSection = this.findNextSection(section);
                if (referenceSection) {
                    body.insertBefore(sectionElement, referenceSection);
                } else {
                    body.appendChild(sectionElement);
                }
            }
        });
    }

    findNextSection(currentSection) {
        const allSections = [...this.sections, ...this.customSections].sort((a, b) => a.order - b.order);
        const currentIndex = allSections.findIndex(s => s.id === currentSection.id);
        
        for (let i = currentIndex + 1; i < allSections.length; i++) {
            const nextSection = allSections[i];
            if (nextSection.enabled) {
                return document.getElementById(nextSection.id);
            }
        }
        return null;
    }

    createCustomSectionElement(section) {
        const sectionDiv = document.createElement('section');
        sectionDiv.id = section.id;
        sectionDiv.className = 'section custom-section';
        sectionDiv.innerHTML = `
            <div class="container">
                <h2 class="section-title">${section.name}</h2>
                <div class="custom-section-content">
                    ${section.content}
                </div>
            </div>
        `;
        return sectionDiv;
    }

    resetToDefault() {
        this.sections = [
            { id: 'home', name: 'Home/Hero', enabled: true, order: 0 },
            { id: 'about', name: 'About Me', enabled: true, order: 1 },
            { id: 'skills', name: 'Skills', enabled: true, order: 2 },
            { id: 'projects', name: 'Projects', enabled: true, order: 3 },
            { id: 'experience', name: 'Experience', enabled: true, order: 4 },
            { id: 'contact', name: 'Contact', enabled: true, order: 5 }
        ];
        this.customSections = [];
        
        this.updateSectionList();
        this.updateCustomSectionsList();
        this.applyConfiguration();
        this.updateNavigation();
        this.saveConfiguration();
        
        // Remove custom section elements from DOM
        document.querySelectorAll('.custom-section').forEach(el => el.remove());
        
        this.showNotification('Sections reset to default configuration');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `section-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? 'var(--primary-color)' : 'var(--accent-color)'};
            color: white;
            border-radius: var(--radius-md);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize section management
function initializeSectionManagement() {
    window.sectionManager = new SectionManager();
}

// Add typing effect to tagline (optional)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Drag and Drop functionality for customization
let draggedElement = null;
let dragOffset = { x: 0, y: 0 };
let originalPosition = { x: 0, y: 0 };

// Make elements draggable
function makeElementDraggable(element) {
    element.style.cursor = 'grab';
    element.style.position = 'relative';
    element.style.zIndex = '10';

    element.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only left mouse button

        draggedElement = element;
        const rect = element.getBoundingClientRect();
        const parentRect = element.parentElement.getBoundingClientRect();

        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;
        originalPosition.x = rect.left - parentRect.left;
        originalPosition.y = rect.top - parentRect.top;

        element.style.cursor = 'grabbing';
        element.style.zIndex = '1000';

        // Add visual feedback
        element.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
        element.style.transform = 'scale(1.05)';

        e.preventDefault();
    });

    element.addEventListener('mousemove', (e) => {
        if (draggedElement !== element) return;

        const parentRect = element.parentElement.getBoundingClientRect();
        const newX = e.clientX - parentRect.left - dragOffset.x;
        const newY = e.clientY - parentRect.top - dragOffset.y;

        // Constrain to parent bounds
        const maxX = parentRect.width - element.offsetWidth;
        const maxY = parentRect.height - element.offsetHeight;

        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        element.style.left = constrainedX + 'px';
        element.style.top = constrainedY + 'px';
    });

    element.addEventListener('mouseup', () => {
        if (draggedElement !== element) return;

        draggedElement = null;
        element.style.cursor = 'grab';
        element.style.zIndex = '10';

        // Remove visual feedback
        element.style.boxShadow = '';
        element.style.transform = '';

        // Save position (you can extend this to save to localStorage or send to server)
        saveElementPosition(element);
    });

    element.addEventListener('mouseleave', () => {
        if (draggedElement === element) {
            // Continue dragging even when mouse leaves the element
        }
    });
}

// Save element position
function saveElementPosition(element) {
    const position = {
        id: element.id || element.className,
        left: element.style.left,
        top: element.style.top
    };

    // Save to localStorage for persistence
    const positions = JSON.parse(localStorage.getItem('elementPositions') || '[]');
    const existingIndex = positions.findIndex(p => p.id === position.id);

    if (existingIndex >= 0) {
        positions[existingIndex] = position;
    } else {
        positions.push(position);
    }

    localStorage.setItem('elementPositions', JSON.stringify(positions));

    // You can also send this to your backend API here
    console.log('Element position saved:', position);
}

// Load saved positions
function loadSavedPositions() {
    const positions = JSON.parse(localStorage.getItem('elementPositions') || '[]');

    positions.forEach(position => {
        const element = document.querySelector(`#${position.id}`) ||
                       document.querySelector(`.${position.id.split(' ').join('.')}`);
        if (element) {
            element.style.left = position.left;
            element.style.top = position.top;
        }
    });
}

// Initialize drag and drop for draggable elements
function initializeDragAndDrop() {
    // Make specific elements draggable
    const draggableElements = document.querySelectorAll('.profile-image-wrapper, .skill-card, .project-card, .contact-method');

    draggableElements.forEach(element => {
        makeElementDraggable(element);
    });

    // Load saved positions
    loadSavedPositions();
}

// Keyboard shortcuts for precise positioning
document.addEventListener('keydown', (e) => {
    if (!draggedElement) return;

    const step = e.shiftKey ? 10 : 1; // Larger steps with Shift

    switch(e.key) {
        case 'ArrowUp':
            e.preventDefault();
            adjustElementPosition(draggedElement, 0, -step);
            break;
        case 'ArrowDown':
            e.preventDefault();
            adjustElementPosition(draggedElement, 0, step);
            break;
        case 'ArrowLeft':
            e.preventDefault();
            adjustElementPosition(draggedElement, -step, 0);
            break;
        case 'ArrowRight':
            e.preventDefault();
            adjustElementPosition(draggedElement, step, 0);
            break;
        case 'Escape':
            // Reset to original position
            if (draggedElement) {
                draggedElement.style.left = originalPosition.x + 'px';
                draggedElement.style.top = originalPosition.y + 'px';
                draggedElement.style.cursor = 'grab';
                draggedElement.style.zIndex = '10';
                draggedElement.style.boxShadow = '';
                draggedElement.style.transform = '';
                draggedElement = null;
            }
            break;
    }
});

// Adjust element position with keyboard
function adjustElementPosition(element, deltaX, deltaY) {
    const currentLeft = parseInt(element.style.left) || 0;
    const currentTop = parseInt(element.style.top) || 0;

    const parentRect = element.parentElement.getBoundingClientRect();
    const maxX = parentRect.width - element.offsetWidth;
    const maxY = parentRect.height - element.offsetHeight;

    const newX = Math.max(0, Math.min(currentLeft + deltaX, maxX));
    const newY = Math.max(0, Math.min(currentTop + deltaY, maxY));

    element.style.left = newX + 'px';
    element.style.top = newY + 'px';
}
