
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thanks for reaching out!');
});

// Get the button
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show button when user scrolls down
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll back to top when clicked
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


