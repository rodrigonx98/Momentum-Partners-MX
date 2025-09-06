// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }

    lastScrollTop = scrollTop;
  });

  // Notification system
  function showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".service-card, .stat, .contact-item"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Counter animation for stats
  const stats = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.textContent;
          const isPercentage = finalValue.includes("%");
          const isPlus = finalValue.includes("+");
          const numericValue = parseInt(finalValue.replace(/[^\d]/g, ""));

          let currentValue = 0;
          const increment = numericValue / 50;

          const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
              currentValue = numericValue;
              clearInterval(counter);
            }

            let displayValue = Math.floor(currentValue);
            if (isPercentage) displayValue += "%";
            if (isPlus) displayValue += "+";

            target.textContent = displayValue;
          }, 30);

          statsObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => statsObserver.observe(stat));

  // Mobile menu toggle (if needed in the future)
  function createMobileMenu() {
    const nav = document.querySelector(".nav-container");
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.className = "mobile-menu-btn";
    mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

    mobileMenuBtn.style.cssText = `
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        `;

    const spans = mobileMenuBtn.querySelectorAll("span");
    spans.forEach((span) => {
      span.style.cssText = `
                display: block;
                width: 25px;
                height: 3px;
                background: #3b82f6;
                margin: 5px 0;
                transition: 0.3s;
            `;
    });

    nav.appendChild(mobileMenuBtn);

    mobileMenuBtn.addEventListener("click", function () {
      const menu = document.querySelector(".nav-menu");
      menu.classList.toggle("active");

      // Animate hamburger
      spans[0].style.transform = menu.classList.contains("active")
        ? "rotate(-45deg) translate(-5px, 6px)"
        : "none";
      spans[1].style.opacity = menu.classList.contains("active") ? "0" : "1";
      spans[2].style.transform = menu.classList.contains("active")
        ? "rotate(45deg) translate(-5px, -6px)"
        : "none";
    });

    // Show mobile menu button on small screens
    if (window.innerWidth <= 768) {
      mobileMenuBtn.style.display = "block";
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth <= 768) {
        mobileMenuBtn.style.display = "block";
      } else {
        mobileMenuBtn.style.display = "none";
        document.querySelector(".nav-menu").classList.remove("active");
      }
    });
  }

  // Initialize mobile menu
  createMobileMenu();

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.style.opacity = "1";
  });
});

// Preloader effect
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
