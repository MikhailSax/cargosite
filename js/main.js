// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileNav = document.getElementById('mobileNav');
if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
  });
}

// Active navigation item
const current = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('[data-nav]').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === current) {
    link.classList.add('text-[#FFBE34]', 'font-semibold');
  }
});

// FAQ accordion behavior
document.querySelectorAll('[data-accordion]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector('span');
    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden');
    if (icon) icon.textContent = isHidden ? '−' : '+';
  });
});

// Simple form validation
document.querySelectorAll('.js-validate-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    let valid = true;
    form.querySelectorAll('[required]').forEach((field) => {
      const isEmail = field.type === 'email';
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
      const filled = field.value.trim().length > 0;
      if (!filled || (isEmail && !emailOk)) {
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
