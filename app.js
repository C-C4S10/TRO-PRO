// Add subtle entrance animation to hero on page load (respects prefers-reduced-motion)
document.addEventListener('DOMContentLoaded', function () {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var hero = document.querySelector('.hero');
    if (!hero) return;
    // small delay so animation feels natural after page paint
    requestAnimationFrame(function () { setTimeout(function () { hero.classList.add('hero--animate'); }, 60); });
  } catch (e) { /* fail silently */ }
});
