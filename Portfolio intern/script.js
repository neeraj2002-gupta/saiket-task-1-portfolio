

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Auto-close mobile navbar on link click ---------- */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navCollapse = document.getElementById("navMenu");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        // Use Bootstrap's collapse API to close the menu
        const bsCollapse =
          bootstrap.Collapse.getInstance(navCollapse) ||
          new bootstrap.Collapse(navCollapse, { toggle: false });
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Active link on scroll ---------- */
  const sections = document.querySelectorAll("section, header");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMessage = document.getElementById("successMessage");

  // Standard email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Helper: show error
  function showError(input, errorEl, message) {
    input.classList.add("input-error");
    errorEl.textContent = message;
  }

  // Helper: clear error
  function clearError(input, errorEl) {
    input.classList.remove("input-error");
    errorEl.textContent = "";
  }

  // Live clearing of errors as the user types
  [nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", () => {
      const errId = input.id + "Error";
      const errEl = document.getElementById(errId);
      if (input.value.trim() !== "") clearError(input, errEl);
    });
  });

  // Submit handler
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default submission
    let isValid = true;

    // Hide previous success message
    successMessage.classList.add("d-none");

    // Validate Name
    if (nameInput.value.trim() === "") {
      showError(nameInput, nameError, "Please enter your name.");
      isValid = false;
    } else if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, "Name must be at least 2 characters.");
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (emailVal === "") {
      showError(emailInput, emailError, "Please enter your email.");
      isValid = false;
    } else if (!emailRegex.test(emailVal)) {
      showError(emailInput, emailError, "Please enter a valid email address.");
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      showError(messageInput, messageError, "Please enter a message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters."
      );
      isValid = false;
    } else {
      clearError(messageInput, messageError);
    }

    // If valid, show success and reset form
    if (isValid) {
      successMessage.classList.remove("d-none");
      form.reset();

      // Hide success message after 4 seconds
      setTimeout(() => {
        successMessage.classList.add("d-none");
      }, 4000);
    }
  });
});