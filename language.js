// language.js
import { translations } from './translations.js';

let currentLanguage = 'en';

export function initializeLanguageSwitcher() {
  const languageSwitcher = document.getElementById('language-switcher');
  
  if (languageSwitcher) {
    languageSwitcher.addEventListener('click', toggleLanguage);
  }
  
  // Load saved language preference
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    setLanguage(savedLanguage);
  }
}

function toggleLanguage() {
  const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  setLanguage(newLanguage);
}

export function setLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Update button text
  const languageSwitcher = document.getElementById('language-switcher');
  if (languageSwitcher) {
    languageSwitcher.textContent = lang === 'en' ? 'العربية' : 'English';
  }
  
  // Update all translatable elements
  updateTextContent();
  
  // Save preference
  localStorage.setItem('language', lang);
}

function updateTextContent() {
  // Get all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = translations[currentLanguage][key];
  });
}