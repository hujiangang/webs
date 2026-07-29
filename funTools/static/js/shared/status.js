export function createStatusController(elementId = 'appStatus') {
  const status = document.getElementById(elementId);

  return {
    set(message) {
      if (status) {
        status.textContent = message;
      }
    },
  };
}