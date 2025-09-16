const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active')
})

// Custom smooth scrolling for a more pronounced "slide" effect
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if the link is for the current page and has a hash
        if (this.hash !== "" && (this.pathname === window.location.pathname || this.pathname === '')) {
            // Prevent the default jump and the CSS-based smooth scroll
            e.preventDefault();

            const targetElement = document.querySelector(this.hash);

            if (targetElement) {
                const header = document.querySelector('.navbar');
                const headerHeight = header ? header.offsetHeight : 0;
                // Calculate target position, offsetting for the sticky header
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800; // milliseconds for the scroll duration. Adjust as needed.
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                // Easing function for a smooth acceleration and deceleration
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);
            }
        }
    });
});

// Mobile dropdown menu click toggle
document.querySelectorAll('.dropdown .dropbtn').forEach(dropbtn => {
    dropbtn.addEventListener('click', function (e) {
        // Check if we are in mobile view (matches CSS media query)
        if (window.matchMedia('(max-width: 768px)').matches) {
            // Prevent default link behavior to stop it from trying to scroll
            e.preventDefault();

            // Get the sibling dropdown content
            const dropdownContent = this.nextElementSibling;

            // Toggle an 'active' class to show/hide it
            if (dropdownContent) {
                dropdownContent.classList.toggle('mobile-active');
            }
        }
    });
});