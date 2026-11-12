// ==========================================================================
// Fieldnote Landing Page Interactions
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Set current year in footer
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Interactive hero task checklist
  const heroTaskList = document.getElementById("heroTaskList");
  const heroProgressPill = document.getElementById("heroProgressPill");

  if (heroTaskList && heroProgressPill) {
    const taskItems = heroTaskList.querySelectorAll(".mockup-item");

    const updateProgressCounter = () => {
      const doneCount = heroTaskList.querySelectorAll(".mockup-item.is-done").length;
      heroProgressPill.textContent = `${doneCount} / ${taskItems.length} Done`;
    };

    taskItems.forEach((item) => {
      item.addEventListener("click", () => {
        const isDone = item.classList.toggle("is-done");
        item.dataset.done = String(isDone);

        const checkbox = item.querySelector(".task-checkbox");
        const tag = item.querySelector(".tag");

        if (checkbox) {
          checkbox.innerHTML = isDone ? "&#10003;" : "";
        }

        if (tag) {
          tag.classList.remove("tag-done", "tag-progress", "tag-todo");
          if (isDone) {
            tag.classList.add("tag-done");
            tag.textContent = "Done";
          } else {
            tag.classList.add("tag-progress");
            tag.textContent = "In Progress";
          }
        }

        updateProgressCounter();
      });
    });
  }

  // 3. Mobile navigation menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Monthly / Yearly billing toggle
  const billingToggle = document.getElementById("billingToggle");
  const monthlyLabel = document.getElementById("monthlyLabel");
  const yearlyLabel = document.getElementById("yearlyLabel");
  const priceAmounts = document.querySelectorAll(".plan-price .amount");

  if (billingToggle) {
    billingToggle.addEventListener("click", () => {
      const isYearly = billingToggle.getAttribute("aria-pressed") !== "true";
      billingToggle.setAttribute("aria-pressed", String(isYearly));

      monthlyLabel.classList.toggle("active", !isYearly);
      yearlyLabel.classList.toggle("active", isYearly);

      priceAmounts.forEach((el) => {
        el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
      });
    });
  }

  // 5. Plan selection buttons -> pre-select plan & scroll to contact form
  const planSelect = document.getElementById("planSelect");
  const contactSection = document.getElementById("contact");

  document.querySelectorAll(".select-plan-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosenPlan = btn.dataset.plan;
      if (planSelect && chosenPlan) {
        planSelect.value = chosenPlan;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Helper: basic email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Helper: show or clear field error
  const setFieldError = (inputEl, errorEl, message) => {
    if (message) {
      inputEl.classList.add("input-error");
      errorEl.textContent = message;
    } else {
      inputEl.classList.remove("input-error");
      errorEl.textContent = "";
    }
  };

  // 6. Contact / Demo Request form validation
  const demoForm = document.getElementById("demoForm");
  const fullNameInput = document.getElementById("fullName");
  const workEmailInput = document.getElementById("workEmail");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const formSuccess = document.getElementById("formSuccess");

  if (demoForm) {
    demoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;
      const nameVal = fullNameInput.value.trim();
      const emailVal = workEmailInput.value.trim();
      const msgVal = messageInput.value.trim();

      if (nameVal.length < 2) {
        setFieldError(fullNameInput, nameError, "Please enter your name.");
        isValid = false;
      } else {
        setFieldError(fullNameInput, nameError, "");
      }

      if (!isValidEmail(emailVal)) {
        setFieldError(workEmailInput, emailError, "Please enter a valid work email.");
        isValid = false;
      } else {
        setFieldError(workEmailInput, emailError, "");
      }

      if (msgVal.length < 10) {
        setFieldError(messageInput, messageError, "Please add a short note (at least 10 characters).");
        isValid = false;
      } else {
        setFieldError(messageInput, messageError, "");
      }

      if (isValid) {
        formSuccess.hidden = false;
        demoForm.reset();
      } else {
        formSuccess.hidden = true;
      }
    });
  }

  // 7. Quick "Get Started" modal
  const demoModal = document.getElementById("demoModal");
  const openDemoModalBtn = document.getElementById("openDemoModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const quickSignupForm = document.getElementById("quickSignupForm");
  const modalEmailInput = document.getElementById("modalEmail");
  const modalEmailError = document.getElementById("modalEmailError");
  const modalSuccess = document.getElementById("modalSuccess");

  const openModal = () => {
    if (!demoModal) return;
    demoModal.hidden = false;
    demoModal.setAttribute("aria-hidden", "false");
    modalSuccess.hidden = true;
    setFieldError(modalEmailInput, modalEmailError, "");
    modalEmailInput.focus();
  };

  const closeModal = () => {
    if (!demoModal) return;
    demoModal.hidden = true;
    demoModal.setAttribute("aria-hidden", "true");
  };

  if (openDemoModalBtn) {
    openDemoModalBtn.addEventListener("click", openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (demoModal) {
    demoModal.addEventListener("click", (event) => {
      if (event.target === demoModal) {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && demoModal && !demoModal.hidden) {
      closeModal();
    }
  });

  if (quickSignupForm) {
    quickSignupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailVal = modalEmailInput.value.trim();

      if (!isValidEmail(emailVal)) {
        setFieldError(modalEmailInput, modalEmailError, "Please enter a valid work email.");
        modalSuccess.hidden = true;
        return;
      }

      setFieldError(modalEmailInput, modalEmailError, "");
      modalSuccess.hidden = false;
      quickSignupForm.reset();
    });
  }
});
