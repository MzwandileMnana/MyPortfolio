// =====================
// Scroll-to-top button
// =====================
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

// =====================
// Contact form submission using Formspree
// =====================
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  const formData = new FormData(form); // Collect form data

  try {
    const response = await fetch("https://formspree.io/f/xwpnyvlz", {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok) {
      alert("Thanks for reaching out! Your message has been sent.");
      form.reset(); // Clear the form
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    console.error("Error submitting the form:", error);
    alert("Oops! There was a network error. Please try again later.");
  }
});


// Scroll to contact form when "Hire Me" is clicked
const hireBtn = document.getElementById("hireBtn");

hireBtn.addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({
    behavior: "smooth"
  });
});
