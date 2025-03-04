// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    } else {
        console.error("Mobile menu button or navigation menu not found.");
    }

    // Add error handling for <model-viewer> elements
    const modelViewers = document.querySelectorAll("model-viewer");
    modelViewers.forEach(viewer => {
        viewer.addEventListener("load", () => {
            console.log(`Model loaded successfully: ${viewer.src}`);
        });
        viewer.addEventListener("error", (event) => {
            console.error(`Error loading model: ${viewer.src}`, event);
            alert("Failed to load the 3D model. Please check the model path or try again.");
        });
    });
});

// Function to view product in AR
function viewInAR(modelSrc, button) {
    console.log(`Attempting to view in AR: ${modelSrc}`);
    const modelViewer = button.nextElementSibling;
    if (!modelViewer) {
        console.error("Model viewer element not found for button:", button);
        return;
    }

    modelViewer.style.display = "block";
    button.style.display = "none";

    // Check if the page is served over HTTPS
    if (window.location.protocol !== "https:") {
        console.error("WebXR requires HTTPS. Current protocol:", window.location.protocol);
        alert("AR functionality requires a secure connection (HTTPS). Please access the site via HTTPS.");
        modelViewer.style.display = "none";
        button.style.display = "block";
        return;
    }

    // Check WebXR support
    if (navigator.xr) {
        console.log("Checking WebXR immersive-ar support...");
        navigator.xr.isSessionSupported("immersive-ar")
            .then(supported => {
                if (supported) {
                    console.log("AR is supported. Activating AR mode...");
                    modelViewer.activateAR()
                        .then(() => {
                            console.log("AR mode activated successfully.");

                            // Add a Back button
                            const backButton = document.createElement("button");
                            backButton.textContent = "Back to Shopping";
                            backButton.classList.add("back-button");
                            backButton.addEventListener("click", () => {
                                console.log("Exiting AR mode...");
                                modelViewer.style.display = "none";
                                button.style.display = "block";
                                backButton.remove();
                            });
                            document.body.appendChild(backButton);
                        })
                        .catch(err => {
                            console.error("Error activating AR mode:", err);
                            alert("Failed to activate AR mode. Please try again.");
                            modelViewer.style.display = "none";
                            button.style.display = "block";
                        });
                } else {
                    console.warn("AR is not supported on this device.");
                    alert("AR is not supported on this device. Please use a compatible device (Android with ARCore or iOS with ARKit).");
                    modelViewer.style.display = "none";
                    button.style.display = "block";
                }
            })
            .catch(err => {
                console.error("Error checking WebXR support:", err);
                alert("An error occurred while checking AR support: " + err.message);
                modelViewer.style.display = "none";
                button.style.display = "block";
            });
    } else {
        console.warn("WebXR is not available in this browser.");
        alert("WebXR is not available. Please use a compatible browser (Chrome on Android or Safari on iOS).");
        modelViewer.style.display = "none";
        button.style.display = "block";
    }
}