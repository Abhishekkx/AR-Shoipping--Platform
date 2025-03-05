// Function to view product in AR with posture detection
function viewInAR(button) {
    const productCard = button.closest('.product-card');
    if (!productCard) {
        console.error("Product card not found for button:", button);
        return;
    }
    const modelViewer = productCard.querySelector('#hat-viewer');
    if (!modelViewer) {
        console.error("Model viewer element not found in product card:", productCard);
        return;
    }

    console.log(`Attempting to view in AR: ${modelViewer.src}`);
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
                            backButton.style.position = "fixed";
                            backButton.style.bottom = "20px";
                            backButton.style.left = "50%";
                            backButton.style.transform = "translateX(-50%)";
                            backButton.style.padding = "10px 20px";
                            backButton.style.backgroundColor = "#ff6f61";
                            backButton.style.color = "#fff";
                            backButton.style.border = "none";
                            backButton.style.borderRadius = "5px";
                            backButton.style.cursor = "pointer";
                            backButton.addEventListener("click", () => {
                                console.log("Exiting AR mode...");
                                modelViewer.style.display = "none";
                                button.style.display = "block";
                                backButton.remove();
                                clearInterval(poseInterval); // Stop polling
                            });
                            document.body.appendChild(backButton);

                            // Start polling posture data
                            const poseInterval = setInterval(() => {
                                fetch('http://localhost:5000/pose')
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.x && data.y && data.z) {
                                            // Map 2D pose coordinates to 3D space
                                            const x = (data.x - 0.5) * 2; // Normalize to -1 to 1
                                            const y = (0.5 - data.y) * 2 + 0.5; // Adjust for head height
                                            const z = -data.z * 2; // Depth
                                            console.log(`Positioning hat at: x=${x}, y=${y}, z=${z}`);
                                            modelViewer.style.transform = `translate(${x}px, ${y}px, ${z}px)`;
                                        }
                                    })
                                    .catch(error => console.error('Error fetching pose:', error));
                            }, 100); // Update every 100ms
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
});