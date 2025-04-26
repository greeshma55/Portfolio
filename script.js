let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener("scroll", function () {
let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.top = "-100px";
} else {
    // Scrolling up
    navbar.style.top = "0";
}
lastScrollTop = scrollTop;
});
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('logoName');
  const name = logo.textContent;
  logo.textContent = '';

  [...name].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.1}s`;
    logo.appendChild(span);
  });
});

function toggleMenu() {
const navLinks = document.getElementById('nav-links');
navLinks.classList.toggle('show');
}
function toggleTheme() {
    const body = document.body;
    const root = document.documentElement;
    const isLight = body.classList.toggle('light-mode');
  
    if (isLight) {
      // Light theme
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--heading', '#0A192F');
      root.style.setProperty('--text', '#333333');
      root.style.setProperty('--accent', '#0077FF');
      root.style.setProperty('--highlight', '#FF6B6B');
    } else {
      // Dark theme
      root.style.setProperty('--bg-primary', '#0A192F');
      root.style.setProperty('--heading', '#CCD6F6');
      root.style.setProperty('--text', '#8892B0');
      root.style.setProperty('--accent', '#64FFDA');
      root.style.setProperty('--highlight', '#FF6B6B');
    }
}
function downloadResume() {
const link = document.createElement('a');
link.href = 'deolitee.pdf';
link.download = 'Greeshma_Reddy_Resume.pdf';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

// Highlight active link based on scroll position
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll("#nav-links a");

const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === entry.target.id) {
    link.classList.add("active");
    }
});
}
});
}, { threshold: 0.6 });

sections.forEach(section => observer.observe(section));
function viewAllProjects() {
  const grid = document.getElementById('projectGrid');
  grid.style.maxHeight = 'none';
  document.getElementById('viewAllBtn').style.display = 'none';
}
const overlay = document.getElementById("projectOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayImage = document.getElementById("overlayImage");
const overlayGit = document.getElementById("overlayGit");
const overlayDownload = document.getElementById("overlayDownload");

// Project data (expand as needed)
const projectData = {
  puma: {
    title: "Puma Clone Website",
    desc: "Developed a full-stack e-commerce web application enabling users to browse, search, and purchase products with a secure checkout flow.",
    image: "output.png",
    github: "https://github.com/greeshma55/E-commerce-website",
    download: "https://github.com/greeshma55/E-commerce-website/archive/refs/heads/main.zip"
  }
};

function openProjectOverlay(id) {
  const data = projectData[id];
  overlayTitle.textContent = data.title;
  overlayDesc.textContent = data.desc;
  overlayImage.src = data.image;
  overlayGit.href = data.github;
  overlayDownload.href = data.download;

  overlay.classList.add("show");
  document.querySelectorAll("section:not(#projectOverlay)").forEach(sec => sec.style.display = "none");
}

function closeProjectOverlay() {
  overlay.classList.remove("show");
  document.querySelectorAll("section").forEach(sec => sec.style.display = "block");
}

(function(){
  emailjs.init("yXaDM4z2GDfejfZNH");
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const messageBox = document.getElementById('formMessage');
  messageBox.style.display = 'none';

  emailjs.sendForm('greeshmareddy781', 'template_ue7gpej', this)
    .then(() => {
      this.reset();
      showMessage('Message sent successfully!', 'success');
    }, (error) => {
      console.error('FAILED...', error);
      showMessage('Something went wrong. Please try again!', 'error');
    });
});

function showMessage(message, type) {
  const messageBox = document.getElementById('formMessage');
  messageBox.textContent = message;
  messageBox.className = `form-message ${type}`;
  messageBox.style.opacity = '1';
  messageBox.style.display = 'block';

  // Fade out after 4 seconds
  setTimeout(() => {
    messageBox.style.opacity = '0';
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 250); // match transition duration
  }, 500);
}

