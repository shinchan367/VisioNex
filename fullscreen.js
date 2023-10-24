// Get the button and the element to make full-screen
const fullscreenButton = document.getElementById("fullscreenButton");
const elementToFullscreen = document.getElementById("elementToFullscreen");

// Function to toggle full-screen mode
function toggleFullScreen() {
    if (document.fullscreenElement) {
        // If the document is already in full-screen, exit full-screen mode
        document.exitFullscreen();
    } else {
        // Request full-screen mode for the specific element
        elementToFullscreen.requestFullscreen()
            .catch(err => {
                console.error('Error attempting to enable full-screen mode: ', err);
            });
    }
}

// Attach a click event listener to the button to toggle full-screen mode
fullscreenButton.addEventListener("click", toggleFullScreen);
