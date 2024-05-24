chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ disableImages: false });
  });
  
  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('disableImages', (data) => {
      let newStatus = !data.disableImages;
      chrome.storage.sync.set({ disableImages: newStatus }, () => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: toggleImages,
          args: [newStatus]
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
  