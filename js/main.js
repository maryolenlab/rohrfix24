const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  const controls = Array.from(contactForm.elements).filter((element) =>
    element.matches("input:not([type='checkbox']), select, textarea")
  );
  const privacyInput = contactForm.elements.namedItem("privacy");
  const status = contactForm.querySelector(".contact-form__status");
  const submitButton = contactForm.querySelector(".contact-form__submit");
  const submitLabel = contactForm.querySelector(".contact-form__submit-label");
  const submissionDialog = document.querySelector("#submission-confirmation");
  const submissionDialogClose = submissionDialog?.querySelector(".submission-dialog__close");
  let isSubmitting = false;

  const setFieldState = (control) => {
    const field = control.closest(".form-field");
    const message = field?.querySelector(".form-field__message");
    const value = control.value.trim();
    const minimumLength = Number.parseInt(control.getAttribute("minlength") || "0", 10);
    const maximumLength = Number.parseInt(control.getAttribute("maxlength") || "0", 10);
    const requiredIsValid = !control.required || value !== "";
    const minimumLengthIsValid = minimumLength === 0 || value === "" || value.length >= minimumLength;
    const maximumLengthIsValid = maximumLength === 0 || value.length <= maximumLength;
    const emailIsValid = control.type !== "email" || value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    let phoneIsValid = true;

    if (control.name === "phone" && value !== "") {
      const digitCount = (value.match(/[0-9]/g) || []).length;
      phoneIsValid = /^[+]?[0-9\s().\/-]+$/.test(value) && digitCount >= 7 && digitCount <= 15;
    }

    control.setCustomValidity("");

    const isValid = requiredIsValid
      && minimumLengthIsValid
      && maximumLengthIsValid
      && emailIsValid
      && phoneIsValid;

    control.classList.toggle("form-field__control--error", !isValid);
    control.classList.toggle("form-field__control--valid", isValid && value !== "");
    control.setAttribute("aria-invalid", String(!isValid));
    message?.classList.toggle("form-field__message--visible", !isValid);

    return isValid;
  };

  const setPrivacyState = () => {
    if (!(privacyInput instanceof HTMLInputElement)) {
      return true;
    }

    const message = contactForm.querySelector(".checkbox-field__message");
    const isValid = privacyInput.checked;

    privacyInput.classList.toggle("checkbox-field__input--error", !isValid);
    privacyInput.setAttribute("aria-invalid", String(!isValid));
    message?.classList.toggle("checkbox-field__message--visible", !isValid);

    return isValid;
  };

  const clearStatus = () => {
    status.textContent = "";
    status.classList.remove("contact-form__status--error", "contact-form__status--success");
  };

  const setSubmittingState = (isLoading) => {
    isSubmitting = isLoading;
    submitButton.disabled = isLoading;
    submitButton.classList.toggle("contact-form__submit--loading", isLoading);

    if (isLoading) {
      submitButton.setAttribute("aria-busy", "true");
    } else {
      submitButton.removeAttribute("aria-busy");
    }

    submitLabel.textContent = isLoading ? "Wird geprüft..." : "Anfrage senden";
  };

  const resetFormState = () => {
    controls.forEach((control) => {
      control.classList.remove("form-field__control--error", "form-field__control--valid");
      control.removeAttribute("aria-invalid");
      control.closest(".form-field")?.querySelector(".form-field__message")?.classList.remove("form-field__message--visible");
    });

    privacyInput?.classList.remove("checkbox-field__input--error");
    privacyInput?.removeAttribute("aria-invalid");
    contactForm.querySelector(".checkbox-field__message")?.classList.remove("checkbox-field__message--visible");
  };

  const showSubmissionDialog = () => {
    if (submissionDialog instanceof HTMLDialogElement && !submissionDialog.open) {
      submissionDialog.showModal();
    }
  };

  controls.forEach((control) => {
    control.addEventListener("blur", () => setFieldState(control));
    control.addEventListener("input", () => {
      if (control.getAttribute("aria-invalid") === "true") {
        setFieldState(control);
      }
      clearStatus();
    });
    control.addEventListener("change", () => {
      setFieldState(control);
      clearStatus();
    });
  });

  privacyInput?.addEventListener("change", () => {
    setPrivacyState();
    clearStatus();
  });

  submissionDialogClose?.addEventListener("click", () => submissionDialog?.close());

  submissionDialog?.addEventListener("close", () => submitButton.focus());

  const submitContactForm = async () => {
    if (isSubmitting) {
      return;
    }

    clearStatus();

    const fieldsAreValid = controls.map(setFieldState).every(Boolean);
    const privacyIsValid = setPrivacyState();

    if (!fieldsAreValid || !privacyIsValid) {
      status.textContent = "Bitte prüfen Sie die markierten Felder.";
      status.classList.add("contact-form__status--error");
      contactForm.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    setSubmittingState(true);

    try {
      // A short local delay demonstrates loading without transmitting form values.
      await new Promise((resolve) => window.setTimeout(resolve, 450));
      contactForm.reset();
      resetFormState();
      status.textContent = "Demo erfolgreich! Ihre Angaben wurden geprüft, aber nicht versendet.";
      status.classList.add("contact-form__status--success");
      showSubmissionDialog();
    } catch {
      status.textContent = "Die Demo-Prüfung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.";
      status.classList.add("contact-form__status--error");
    } finally {
      setSubmittingState(false);
    }
  };

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    submitContactForm();
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitContactForm();
  });

  // Enable submission only after its local-only handlers are attached.
  submitButton.type = "submit";
  submitButton.disabled = false;
}

const demoDialog = document.querySelector(".demo-dialog");
const demoDialogMessage = document.querySelector(".demo-dialog__message");
let demoTrigger = null;

document.querySelectorAll("[data-demo-contact]").forEach((control) => {
  control.addEventListener("click", () => {
    const message = `Demo-Funktion: ${control.dataset.demoContact} ist in dieser Vorschau nicht verbunden.`;
    if (demoDialog instanceof HTMLDialogElement && demoDialogMessage) {
      demoTrigger = control;
      demoDialogMessage.textContent = message;
      if (!demoDialog.open) demoDialog.showModal();
    }
  });
});

document.querySelector(".demo-dialog__close")?.addEventListener("click", () => demoDialog.close());
demoDialog?.addEventListener("close", () => demoTrigger?.focus());

const scrollTopButton = document.querySelector(".scroll-top");

const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
  const menuIcon = menuToggle.querySelector(".menu-toggle__use");
  const compactNavigationViewport = window.matchMedia("(max-width: 1023.98px)");

  const setMenuState = (isOpen) => {
    primaryNavigation.classList.toggle("navigation--open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    menuIcon?.setAttribute("href", `./assets/icons/ui-icons.svg#${isOpen ? "x" : "menu"}`);

    if (compactNavigationViewport.matches) {
      primaryNavigation.setAttribute("aria-hidden", String(!isOpen));
    } else {
      primaryNavigation.removeAttribute("aria-hidden");
    }
  };

  const closeMenu = () => setMenuState(false);

  menuToggle.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  primaryNavigation.querySelectorAll(".navigation__link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  compactNavigationViewport.addEventListener("change", closeMenu);
  closeMenu();
}

if (scrollTopButton) {
  let scrollUpdateRequested = false;
  let scrollAnimationFrame = 0;
  const scrollDuration = 650;

  const updateScrollTopButton = () => {
    const isVisible = window.scrollY > window.innerHeight / 2;

    scrollTopButton.classList.toggle("scroll-top--visible", isVisible);
    scrollTopButton.setAttribute("aria-hidden", String(!isVisible));
    scrollUpdateRequested = false;
  };

  window.addEventListener("scroll", () => {
    if (scrollUpdateRequested) {
      return;
    }

    scrollUpdateRequested = true;
    window.requestAnimationFrame(updateScrollTopButton);
  }, { passive: true });

  scrollTopButton.addEventListener("click", () => {
    const initialScrollPosition = window.scrollY;
    const animationStart = performance.now();

    window.cancelAnimationFrame(scrollAnimationFrame);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const animateScroll = (currentTime) => {
      const progress = Math.min((currentTime - animationStart) / scrollDuration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      window.scrollTo({
        top: initialScrollPosition * (1 - easedProgress),
        behavior: "instant",
      });

      if (progress < 1) {
        scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationFrame = 0;
      }
    };

    scrollAnimationFrame = window.requestAnimationFrame(animateScroll);
  });

  updateScrollTopButton();
}
