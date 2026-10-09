const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const copyEmailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');

copyEmailButton?.addEventListener('click', async () => {
  const email = copyEmailButton.dataset.email;
  if (!email) return;

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      const fallback = document.createElement('textarea');
      fallback.value = email;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand('copy');
      fallback.remove();
    }
    copyEmailButton.textContent = 'Copied';
    if (copyStatus) copyStatus.textContent = 'Email address copied to clipboard.';
  } catch {
    if (copyStatus) copyStatus.textContent = `Copy failed — the address is ${email}`;
  }

  window.setTimeout(() => {
    copyEmailButton.textContent = 'Copy email';
    if (copyStatus) copyStatus.textContent = '';
  }, 2500);
});
