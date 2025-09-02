// Back to top button
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Loading indicator simulation
const loadingIndicator = document.querySelector(".loading-indicator");
if (loadingIndicator) {
    window.addEventListener("load", () => {
        loadingIndicator.classList.add("active");
        const spinner = loadingIndicator.querySelector(".loading-spinner");
        spinner.style.width = "100%";
        setTimeout(() => {
            loadingIndicator.classList.remove("active");
        }, 1000);
    });
}

// FAQ toggle with smooth height animation
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  const open = () => {
    item.classList.add("active");
    // Set to auto to measure, then animate from 0 -> full height
    answer.style.height = "auto";
    const full = answer.scrollHeight;  // measure with padding applied by .active
    answer.style.height = "0px";
    // force reflow
    answer.offsetHeight;
    answer.style.height = full + "px";
  };

  const close = () => {
    // Animate from current height -> 0
    const current = answer.scrollHeight;
    answer.style.height = current + "px";
    // force reflow
    answer.offsetHeight;
    answer.style.height = "0px";
    item.classList.remove("active");
  };

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    // Close all other items
    faqItems.forEach((other) => {
      if (other !== item) {
        const otherAnswer = other.querySelector(".faq-answer");
        other.classList.remove("active");
        if (otherAnswer) otherAnswer.style.height = "0px";
      }
    });

    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  // After opening finishes, set height to auto so it adapts to content/resizes
  answer.addEventListener("transitionend", (e) => {
    if (e.propertyName === "height") {
      if (item.classList.contains("active")) {
        answer.style.height = "auto";
      }
    }
  });
});

// Keep open items correct on resize
window.addEventListener("resize", () => {
  document.querySelectorAll(".faq-item.active .faq-answer").forEach((ans) => {
    ans.style.height = "auto";
  });
});



