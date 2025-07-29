// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

mobileMenuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("active");

  // Animate hamburger menu
  const spans = mobileMenuBtn.querySelectorAll("span");
  if (mobileNav.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Close mobile menu when clicking on links
const mobileNavLinks = mobileNav.querySelectorAll("a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    const spans = mobileMenuBtn.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.9)";
  }
});

// Contact form handling
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Simple validation
  const requiredFields = contactForm.querySelectorAll("[required]");
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      isValid = false;
      field.style.borderColor = "#ef4444";
    } else {
      field.style.borderColor = "#fbcfe8";
    }
  });

  if (isValid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = "<span>⏳</span> Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      alert(
        "Mensagem enviada com sucesso! Entraremos em contato em breve. 🐕❤️"
      );
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  } else {
    alert("Por favor, preencha todos os campos obrigatórios.");
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loading");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .gallery-item, .testimonial-card"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Add floating animation to decorative elements
const decorations = document.querySelectorAll(".decoration");
decorations.forEach((decoration, index) => {
  decoration.style.animationDelay = `${index * 0.5}s`;
});

// Add hover effects to service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-12px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effects to buttons
const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".decoration");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body for initial animations
  document.body.classList.add("loaded");

  // Initialize any additional features
  console.log("🐕 Cafofo do Paçoca carregado com sucesso! ❤️");
});

// Add some fun easter eggs
let clickCount = 0;
document.querySelector(".mascot-avatar").addEventListener("click", () => {
  clickCount++;
  if (clickCount === 5) {
    alert("🎉 Paçoca diz: Au au! Obrigado por me dar carinho! ❤️🐕");
    clickCount = 0;
  }
});

// Add floating hearts animation when clicking on heart emojis
document.querySelectorAll(".heart, ❤️").forEach((heart) => {
  heart.addEventListener("click", (e) => {
    createFloatingHeart(e.clientX, e.clientY);
  });
});

function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "fixed";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = "20px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "9999";
  heart.style.animation = "floatUp 2s ease-out forwards";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);
}

// Add floating heart animation
const floatingHeartStyle = document.createElement("style");
floatingHeartStyle.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
        }
    }
`;
document.head.appendChild(floatingHeartStyle);
