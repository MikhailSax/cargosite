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
  if (window.scrollY > 8) {
    siteHeader.classList.add('sticky-shadow');
  } else {
    siteHeader.classList.remove('sticky-shadow');
  }
});

document.querySelectorAll('a[data-anchor], a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (mobileNav && !mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
    }
  });
});

document.querySelectorAll('[data-accordion]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('span');
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
  prevReviewButton.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewItems.length) % reviewItems.length;
    showReview(reviewIndex);
  });

  nextReviewButton.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewItems.length;
    showReview(reviewIndex);
  });
}

document.querySelectorAll('.js-validate-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    let valid = true;

    form.querySelectorAll('[required]').forEach((field) => {
      const value = field.value.trim();
      const isEmail = field.type === 'email';
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      if (!value || (isEmail && !emailValid)) {
        valid = false;
        field.classList.add('border-red-500');
      } else {
        field.classList.remove('border-red-500');
      }
    });

    if (!valid) {
      event.preventDefault();
    }
  });
});
