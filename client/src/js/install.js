// Select the install button element
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// Listen for the "beforeinstallprompt" event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior
    event.preventDefault();

    // Make the install button visible
    butInstall.style.visibility = 'visible';

    // Set the text content of the install button to "Install!"
    butInstall.textContent = 'Install!';
});

// Listen for a click on the install button
butInstall.addEventListener('click', async () => {
    // Disable the install button
    butInstall.setAttribute('disabled', true);

    // Set the text content of the install button to "Installed!"
    butInstall.textContent = 'Installed!';
});

// Listen for the "appinstalled" event
window.addEventListener('appinstalled', (event) => {
    // Log a message to the console
    console.log('😇', 'appinstalled', event);
});

