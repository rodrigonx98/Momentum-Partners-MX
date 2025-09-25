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
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
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

  // Mobile menu toggle
  function createMobileMenu() {
    const nav = document.querySelector(".nav-container");

    // Check if mobile menu button already exists
    let mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    if (!mobileMenuBtn) {
      mobileMenuBtn = document.createElement("button");
      mobileMenuBtn.className = "mobile-menu-btn";
      mobileMenuBtn.setAttribute("aria-label", "Toggle mobile menu");
      mobileMenuBtn.innerHTML = `
              <span></span>
              <span></span>
              <span></span>
          `;
      nav.appendChild(mobileMenuBtn);
    }

    const spans = mobileMenuBtn.querySelectorAll("span");

    // Remove existing event listeners
    const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);

    newMobileMenuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const menu = document.querySelector(".nav-menu");
      const isActive = menu.classList.contains("active");

      if (isActive) {
        menu.classList.remove("active");
        newMobileMenuBtn.classList.remove("active");
      } else {
        menu.classList.add("active");
        newMobileMenuBtn.classList.add("active");
      }
    });

    // Close menu when clicking on menu links
    const menuLinks = document.querySelectorAll(".nav-menu a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        const menu = document.querySelector(".nav-menu");
        menu.classList.remove("active");
        newMobileMenuBtn.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      const menu = document.querySelector(".nav-menu");
      const mobileBtn = document.querySelector(".mobile-menu-btn");

      if (
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        !mobileBtn.contains(e.target)
      ) {
        menu.classList.remove("active");
        mobileBtn.classList.remove("active");
      }
    });

    // Handle window resize
    function handleResize() {
      const menu = document.querySelector(".nav-menu");
      const mobileBtn = document.querySelector(".mobile-menu-btn");
      const mobileCta = document.querySelector(".mobile-cta");

      if (window.innerWidth <= 768) {
        newMobileMenuBtn.style.display = "block";
        if (mobileCta) mobileCta.style.display = "block";
      } else {
        newMobileMenuBtn.style.display = "none";
        if (mobileCta) mobileCta.style.display = "none";
        menu.classList.remove("active");
        newMobileMenuBtn.classList.remove("active");
      }
    }

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
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

// Success Cases Carousel functionality
document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.querySelectorAll(".indicator");

  if (!carouselTrack || !prevBtn || !nextBtn) return; // Exit if carousel elements don't exist

  let currentSlide = 0;
  const totalSlides = 4;
  let autoPlayInterval;

  // Counter animation function
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Animate counters when slide becomes active
  function animateSlideCounters(slideIndex) {
    const activeCard = carouselTrack.children[slideIndex];
    const mainMetric = activeCard.querySelector(".metric-number");
    const kpiNumbers = activeCard.querySelectorAll(".kpi-number");

    // Animate main metric
    if (mainMetric) {
      const target = parseInt(mainMetric.getAttribute("data-target"));
      animateCounter(mainMetric, target);
    }

    // Animate KPI numbers
    kpiNumbers.forEach((kpi) => {
      const target = parseInt(kpi.getAttribute("data-target"));
      animateCounter(kpi, target);
    });
  }

  function updateCarousel() {
    const translateX = -currentSlide * 25; // 25% por slide
    carouselTrack.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentSlide);
    });

    // Animate counters for the active slide
    setTimeout(() => {
      animateSlideCounters(currentSlide);
    }, 300); // Delay to allow transition to complete
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 6000); // Change slide every 6 seconds
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      stopAutoPlay();
      goToSlide(index);
      startAutoPlay();
    });
  });

  // Pause auto-play on hover
  carouselTrack.addEventListener("mouseenter", stopAutoPlay);
  carouselTrack.addEventListener("mouseleave", startAutoPlay);

  // Initialize carousel
  updateCarousel();
  startAutoPlay();
});
