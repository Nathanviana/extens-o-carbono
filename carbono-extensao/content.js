chrome.storage.sync.get('disableImages', (data) => {
    if (data.disableImages) {
      let images = document.querySelectorAll('img');
      for (let img of images) {
        img.style.display = 'none';
      }
    }
  });
  