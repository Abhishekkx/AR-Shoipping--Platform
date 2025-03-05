document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartCountElement = document.querySelector(".cart-count");

    const updateCartCount = () => {
        cartCountElement.textContent = cartCount;
    };

    const addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            updateCartCount();
            alert("Item added to cart!");
        });
    });

    const buyNowButtons = document.querySelectorAll(".btn-buy-now");
    buyNowButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Coming Soon");
        });
    });

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    const tryOnButtons = document.querySelectorAll(".btn-ar");
    tryOnButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productCard = this.closest(".product-card");
            const modelViewer = productCard.querySelector("model-viewer");
            const videoElement = productCard.querySelector("#videoElement");
            const canvasElement = productCard.querySelector("#canvasElement");
            const isWearable = productCard.closest(".products")?.parentElement.querySelector(".section-title")?.textContent === "Wearables";

            if (!modelViewer) return;

            modelViewer.style.display = "block";
            this.style.display = "none";
            if (videoElement && canvasElement) {
                videoElement.style.display = "block";
                canvasElement.style.display = "block";
            }

            if (navigator.xr) {
                navigator.xr.isSessionSupported("immersive-ar").then(supported => {
                    if (supported && window.location.protocol === "https:") {
                        modelViewer.activateAR().then(() => {
                            console.log("AR mode activated.");
                            createBackButton(modelViewer, this, videoElement, canvasElement);
                        }).catch(err => {
                            console.error("Error activating AR:", err);
                            alert("Failed to activate AR mode.");
                            modelViewer.style.display = "none";
                            this.style.display = "block";
                            if (videoElement && canvasElement) {
                                videoElement.style.display = "block";
                                canvasElement.style.display = "block";
                            }
                        });
                    } else {
                        console.log("Using 2D overlay as fallback.");
                        if (isWearable) {
                            setupPoseDetection(modelViewer, videoElement, canvasElement);
                        }
                    }
                });
            } else {
                console.log("WebXR not available, using 2D overlay.");
                if (isWearable) {
                    setupPoseDetection(modelViewer, videoElement, canvasElement);
                }
            }
        });
    });

    function createBackButton(modelViewer, tryOnButton, videoElement, canvasElement) {
        const backButton = document.createElement("button");
        backButton.textContent = "Back to Shopping";
        backButton.classList.add("btn", "btn-small");
        backButton.style.position = "fixed";
        backButton.style.bottom = "20px";
        backButton.style.left = "50%";
        backButton.style.transform = "translateX(-50%)";
        backButton.style.backgroundColor = "#ff6b6b";
        backButton.addEventListener("click", () => {
            modelViewer.style.display = "none";
            tryOnButton.style.display = "block";
            if (videoElement && canvasElement) {
                videoElement.style.display = "block";
                canvasElement.style.display = "block";
            }
            backButton.remove();
        });
        document.body.appendChild(backButton);
    }

    function setupPoseDetection(modelViewer, videoElement, canvasElement) {
        if (!videoElement || !canvasElement) return;

        const canvasCtx = canvasElement.getContext("2d");

        const pose = new Pose({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        pose.onResults((results) => {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

            if (results.poseLandmarks) {
                drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 4 });
                drawLandmarks(canvasCtx, results.poseLandmarks, { color: '#FF0000', lineWidth: 2 });

                const nose = results.poseLandmarks[0];
                const x = nose.x * canvasElement.width;
                const y = nose.y * canvasElement.height;

                modelViewer.style.left = `${x - 50}px`;
                modelViewer.style.top = `${y - 150}px`;
            }
            canvasCtx.restore();
        });

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await pose.send({ image: videoElement });
            },
            width: 640,
            height: 480
        });
        camera.start();
    }
});