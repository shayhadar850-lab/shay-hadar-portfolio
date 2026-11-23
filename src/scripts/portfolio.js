const preview = document.querySelector('[data-project-preview]');

if (preview) {
  const buttons = [...preview.querySelectorAll('button[aria-controls]')];
  const panels = [...preview.querySelectorAll('.preview-project')];

  for (const button of buttons) {
    button.addEventListener('click', () => {
      for (const option of buttons) {
        option.setAttribute('aria-pressed', String(option === button));
      }
      for (const panel of panels) {
        panel.hidden = panel.id !== button.getAttribute('aria-controls');
      }
    });
  }
}
