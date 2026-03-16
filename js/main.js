const siteHeader = document.getElementById('siteHeader');
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

window.addEventListener('scroll', () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('sticky-shadow', window.scrollY > 8);
});

const navLinks = document.querySelectorAll('[data-nav]');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('text-[#FFBE34]');
  }
});

const modal = document.getElementById('calculatorModal');
const modalPanel = document.getElementById('calculatorPanel');
const closeModalButton = document.getElementById('closeCalculatorModal');

const openModal = () => {
  if (!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

document.querySelectorAll('[data-open-calculator]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
  });
});

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

if (mobileNav) {
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileNav.classList.add('hidden'));
  });
}

document.querySelectorAll('[data-accordion]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('[data-icon]');
    if (!content) return;
    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden');
    if (icon) icon.textContent = isHidden ? '−' : '+';
  });
});

const reviewItems = Array.from(document.querySelectorAll('.review-item'));
const prevReviewButton = document.getElementById('prevReview');
const nextReviewButton = document.getElementById('nextReview');
let reviewIndex = 0;

function showReview(index) {
  reviewItems.forEach((item, itemIndex) => {
    item.classList.toggle('hidden', itemIndex !== index);
  });
}

if (reviewItems.length && prevReviewButton && nextReviewButton) {
  showReview(reviewIndex);
  prevReviewButton.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewItems.length) % reviewItems.length;
    showReview(reviewIndex);
  });

  nextReviewButton.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewItems.length;
    showReview(reviewIndex);
  });
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
document.querySelectorAll('.js-validate-form').forEach((form) => {
  const successBox = form.querySelector('[data-form-success]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let valid = true;

    form.querySelectorAll('[required]').forEach((field) => {
      const value = field.value.trim();
      const isEmail = field.type === 'email';
      const isValid = value && (!isEmail || emailPattern.test(value));
      field.classList.toggle('border-red-500', !isValid);
      valid = valid && isValid;
    });

    if (!valid) return;

    form.reset();
    if (successBox) {
      successBox.classList.remove('hidden');
      setTimeout(() => successBox.classList.add('hidden'), 4000);
    }
  });
});
