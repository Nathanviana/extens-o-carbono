document.addEventListener('DOMContentLoaded', function() {
    const energySavingModeButton = document.getElementById('energySavingModeButton');
    energySavingModeButton.addEventListener('click', toggleEnergySavingMode);
});

let energySavingMode = false;
let inactiveTabSuspensionTimeout;

function toggleEnergySavingMode() {
    energySavingMode = !energySavingMode;
    const energySavingModeButton = document.getElementById('energySavingModeButton');
    if (energySavingMode) {
        energySavingModeButton.textContent = 'Desativar Modo de Economia de Energia';
        suspendInactiveTabs();
        reducePageRefreshRate();
        limitResourceUsage();
        alert('Modo de Economia de Energia ativado!');
    } else {
        energySavingModeButton.textContent = 'Ativar Modo de Economia de Energia';
        clearTimeout(inactiveTabSuspensionTimeout);
        clearInterval(refreshRateInterval);
        releaseResources();
        alert('Modo de Economia de Energia desativado!');
    }
}

function suspendInactiveTabs() {
    inactiveTabSuspensionTimeout = setTimeout(() => {
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach(tab => {
                chrome.tabs.update(tab.id, { "muted": true });
            });
        });
    }, 30000); // Suspender abas inativas após 30 segundos de inatividade
}

let refreshRateInterval;

function reducePageRefreshRate() {
    refreshRateInterval = setInterval(() => {
        location.reload();
    }, 60000); // Reduzir a taxa de atualização da página para 60 segundos
}

function limitResourceUsage() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.update(tab.id, { "cpu": 30, "memory": 500 }); // Limitar CPU p 30% e memoria 500MB
        });
    });
}

function releaseResources() {
    chrome.tabs.query({}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.update(tab.id, { "cpu": -1, "memory": -1 }); // passa por todos os guias
        });
    });
}
