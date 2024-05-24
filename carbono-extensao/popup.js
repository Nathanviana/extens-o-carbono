document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
  
    chrome.storage.sync.get('disableImages', (data) => {
      toggleButton.textContent = data.disableImages ? 'Ativar Imagens' : 'Desativar Imagens';
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.storage.sync.get('disableImages', (data) => {
        let newStatus = !data.disableImages;
        chrome.storage.sync.set({ disableImages: newStatus }, () => {
          toggleButton.textContent = newStatus ? 'Ativar Imagens' : 'Desativar Imagens';
  
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: toggleImages,
              args: [newStatus]
            });
          });
        });
      });
    });
  });
  
  function toggleImages(status) {
    let images = document.querySelectorAll('img');
    for (let img of images) {
      if (status) {
        img.style.display = 'none';
      } else {
        img.style.display = '';
      }
    }
  }
  