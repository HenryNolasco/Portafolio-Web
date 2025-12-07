// scripts/main.js

// Navbar Mobile
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Carousel
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;

    if (carouselTrack && carouselSlides.length > 0) {
        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % carouselSlides.length;
                updateCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
                updateCarousel();
            });
        }
    }

    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'hover:bg-gray-300');
            });
            this.classList.remove('bg-gray-200', 'hover:bg-gray-300');
            this.classList.add('bg-primary', 'text-white');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Reset errors
            document.querySelectorAll('[id$="-error"]').forEach(el => {
                el.classList.add('hidden');
                el.previousElementSibling.classList.remove('border-red-500');
            });
            
            // Validate name
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').classList.remove('hidden');
                nameInput.classList.add('border-red-500');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                document.getElementById('email-error').classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                isValid = false;
            }
            
            // Validate subject
            if (!subjectInput.value.trim()) {
                document.getElementById('subject-error').classList.remove('hidden');
                subjectInput.classList.add('border-red-500');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                document.getElementById('message-error').classList.remove('hidden');
                messageInput.classList.add('border-red-500');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                document.getElementById('success-message').classList.remove('hidden');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('success-message').classList.add('hidden');
                }, 5000);
            }
        });
    }
});

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fixed')) {
        const modals = document.querySelectorAll('.fixed[id^="modal"]');
        modals.forEach(modal => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        document.body.style.overflow = 'auto';
    }
});