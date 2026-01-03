/* ===============================
   TYPING TEXT ANIMATION
================================ */
const roles = [
  "Full-Stack Developer",
  "MERN Enthusiast",
  "Problem Solver",
  "Tech Explorer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  }

  let speed = isDeleting ? 80 : 150;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 1200; // pause after full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ===============================
   GET STARTED + CELEBRATION
================================ */
const celebrationSound = new Audio("motivate.mp3");

document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("get-started-btn");
  const welcomeScreen = document.getElementById("welcome-screen");
  const portfolioContent = document.getElementById("portfolio-content");

  // Ensure portfolio stays hidden initially
  portfolioContent.style.display = "none";

  startBtn.addEventListener("click", () => {
    // Play sound
    celebrationSound.play().catch(() => {});

    // Confetti animation
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        spread: 70,
        origin: { x: Math.random(), y: 0.6 }
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // Fade welcome screen
    welcomeScreen.classList.add("fade-out");

    setTimeout(() => {
      welcomeScreen.style.display = "none";
      portfolioContent.style.display = "block";
    }, 1000);
  });
});

/* ===============================
   SKILL BAR ANIMATION
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".skill-bar div").forEach(bar => {
    const width = bar.style.getPropertyValue("--width");
    bar.style.width = width;
  });
});

/* ===============================
   HAMBURGER MENU
================================ */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu after click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* ===============================
   PROJECT MODAL
================================ */
function openModal(index) {
  const project = projects[index - 1];

  modalTitle.textContent = project.title;
  modalImg.src = project.img;
  modalTech.textContent = project.tech;
  modalDesc.textContent = project.desc;

  modalLinks.innerHTML = "";
  project.links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.textContent = link.text;
    modalLinks.appendChild(a);
  });

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

window.onclick = function (e) {
  if (e.target === modal) closeModal();
};

/* ===============================
   ACTIVE NAV ON SCROLL
================================ */
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      document
        .querySelector(".nav-links a[href*=" + id + "]")
        ?.classList.add("active");
    }
  });
});

/* ===============================
   EMAILJS CONTACT FORM
================================ */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_5x3rhfd", "template_yhk7kso", this)
    .then(() => {
      document.getElementById("status").innerText =
        "✅ Message sent successfully!";
      this.reset();
    })
    .catch(() => {
      document.getElementById("status").innerText =
        "❌ Failed to send message. Try again!";
    });
});
