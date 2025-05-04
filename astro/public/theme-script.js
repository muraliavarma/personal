// This script runs before the page renders to prevent flashing
(function() {
  // Get saved theme or use system default
  const savedTheme = localStorage.getItem('theme') || 'system';
  
  // Check if dark mode should be applied
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldApplyDark = savedTheme === 'dark' || (savedTheme === 'system' && prefersDark);
  
  // Apply theme before page renders
  if (shouldApplyDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})(); 