AR Shopping Platform

Project Overview
The AR Shopping Platform is an e-commerce site using Augmented Reality (AR) to preview furniture in real-world spaces. Powered by `<model-viewer>`, it delivers an immersive experience on mobile devices with ARCore or ARKit, built with HTML, CSS, and JavaScript. This project was developed step-by-step to create a functional, bug-free AR shopping experience, with instructions for setup, testing, and deployment.

Problem Statement
Create an e-commerce website that uses Augmented Reality (AR) to let customers try on products like clothes, accessories, or furniture virtually. This will provide an immersive shopping experience before making a purchase. (Note: This implementation focuses on furniture for simplicity.)

Features
- View 3D furniture models in AR on supported mobile devices (Android with ARCore, iOS with ARKit).
- Simple product listing with "Try in AR" and "Buy Now" buttons.
- Responsive design for desktop and mobile.
- Lightweight and easy-to-extend codebase.

Tech Stack
- HTML5: Structure of the website.
- CSS3: Styling and layout.
- JavaScript: Interactivity and AR activation.
- `<model-viewer>`: AR and 3D model rendering (powered by Google).
- GLB Models: 3D file format for furniture.

Prerequisites
- A modern browser (Chrome, Safari, etc.).
- A mobile device with AR support (Android with ARCore or iOS with ARKit).
- A local server (e.g., Python’s `http.server` or ngrok for mobile testing).
- Git installed to clone the repository.
- 3D models in GLB format (e.g., from Sketchfab).

Project Breakdown into Simpler Tasks
1. Set Up Project Structure: Create a basic HTML/CSS/JavaScript web project with folders for assets.
2. Integrate `<model-viewer>` for AR: Add the `<model-viewer>` library and test with a sample 3D model.
3. Design the E-commerce UI: Build a simple product listing page with a furniture item.
4. Add AR Functionality to Products: Enable AR viewing for furniture items using `<model-viewer>`.
5. Test AR on a Local Server: Run the project locally to ensure AR works on mobile devices.
6. Enhance Shopping Features: Add a "Buy Now" button and basic interactivity.
7. Polish and Debug: Fix any bugs and improve responsiveness.

Step-by-Step Implementation

Step 1: Set Up Project Structure
- Create a folder named `ar-shopping-platform`.
- Inside it, create:
  ar-shopping-platform/
  ├── index.html
  ├── css/
  │   └── styles.css
  ├── js/
  │   └── script.js
  ├── assets/
  │   └── models/ (empty for now)

- Code for index.html:
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AR Shopping Platform</title>
      <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
      <h1>Welcome to AR Shopping</h1>
      <script src="js/script.js"></script>
  </body>
  </html>

- Code for css/styles.css:
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      text-align: center;
  }

- Code for js/script.js:
  console.log("AR Shopping Platform loaded!");

- Test: Open index.html in a browser to see "Welcome to AR Shopping" and check the console.

Step 2: Integrate `<model-viewer>` for AR
- Download a sample GLB model (e.g., chair.glb from https://github.com/google/model-viewer/raw/master/packages/model-viewer/test/models/Chair.glb).
- Place it in `assets/models/`.
- Update index.html:
  <body>
      <h1>Welcome to AR Shopping</h1>
      <div class="product">
          <model-viewer 
              src="assets/models/chair.glb" 
              ar 
              ar-modes="webxr scene-viewer quick-look" 
              camera-controls 
              auto-rotate 
              style="width: 100%; height: 400px;">
          </model-viewer>
      </div>
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <script src="js/script.js"></script>
  </body>

- Update css/styles.css:
  .product {
      max-width: 600px;
      margin: 20px auto;
  }

- Test: Run `python -m http.server 8000` and visit http://localhost:8000. Check if the chair rotates (AR requires mobile testing later).

Step 3: Design the E-commerce UI
- Update index.html:
  <body>
      <header>
          <h1>AR Shopping Platform</h1>
      </header>
      <main>
          <section class="product-list">
              <div class="product-card">
                  <h2>Modern Chair</h2>
                  <model-viewer 
                      src="assets/models/chair.glb" 
                      ar 
                      ar-modes="webxr scene-viewer quick-look" 
                      camera-controls 
                      auto-rotate 
                      style="width: 100%; height: 300px;">
                  </model-viewer>
                  <p>Price: $99.99</p>
              </div>
          </section>
      </main>
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <script src="js/script.js"></script>
  </body>

- Update css/styles.css:
  body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
  }
  header {
      text-align: center;
      margin-bottom: 20px;
  }
  .product-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
  }
  .product-card {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 15px;
      width: 300px;
      margin: 10px;
      text-align: center;
  }
  .product-card h2 {
      font-size: 1.2em;
      margin: 10px 0;
  }
  .product-card p {
      font-size: 1em;
      color: #555;
  }

- Test: Reload http://localhost:8000 to see a styled product card.

Step 4: Add AR Functionality to Products
- Update index.html (inside .product-card):
  <div class="product-card">
      <h2>Modern Chair</h2>
      <model-viewer 
          src="assets/models/chair.glb" 
          ar 
          ar-modes="webxr scene-viewer quick-look" 
          camera-controls 
          auto-rotate 
          style="width: 100%; height: 300px;">
      </model-viewer>
      <p>Price: $99.99</p>
      <button class="ar-button">Try in AR</button>
  </div>

- Update css/styles.css:
  .ar-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
  }
  .ar-button:hover {
      background-color: #0056b3;
  }

- Update js/script.js:
  document.addEventListener("DOMContentLoaded", () => {
      const arButton = document.querySelector(".ar-button");
      const modelViewer = document.querySelector("model-viewer");

      arButton.addEventListener("click", () => {
          modelViewer.activateAR();
      });
  });

- Test: Use a mobile device later with ngrok to confirm AR works.

Step 5: Test AR on a Local Server
- Run: `python -m http.server 8000`.
- Test on desktop (model rotates) and prepare for mobile testing with ngrok.

Step 6: Enhance Shopping Features
- Update index.html (inside .product-card):
  <div class="product-card">
      <h2>Modern Chair</h2>
      <model-viewer 
          src="assets/models/chair.glb" 
          ar 
          ar-modes="webxr scene-viewer quick-look" 
          camera-controls 
          auto-rotate 
          style="width: 100%; height: 300px;">
      </model-viewer>
      <p>Price: $99.99</p>
      <button class="ar-button">Try in AR</button>
      <button class="buy-button">Buy Now</button>
  </div>

- Update css/styles.css:
  .buy-button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
  }
  .buy-button:hover {
      background-color: #218838;
  }

- Update js/script.js:
  document.addEventListener("DOMContentLoaded", () => {
      const arButton = document.querySelector(".ar-button");
      const buyButton = document.querySelector(".buy-button");
      const modelViewer = document.querySelector("model-viewer");

      arButton.addEventListener("click", () => {
          modelViewer.activateAR();
      });

      buyButton.addEventListener("click", () => {
          alert("Thank you for your purchase! (Demo)");
      });
  });

- Test: Check "Buy Now" alert and prepare for AR testing.

Step 7: Polish and Debug
- Final index.html (with two products):
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>AR Shopping Platform</title>
      <link rel="stylesheet" href="css/styles.css">
  </head>
  <body>
      <header>
          <h1>AR Shopping Platform</h1>
      </header>
      <main>
          <section class="product-list">
              <div class="product-card">
                  <h2>Modern Chair</h2>
                  <model-viewer 
                      src="assets/models/chair.glb" 
                      ar 
                      ar-modes="webxr scene-viewer quick-look" 
                      camera-controls 
                      auto-rotate 
                      style="width: 100%; height: 300px;">
                  </model-viewer>
                  <p>Price: $99.99</p>
                  <button class="ar-button">Try in AR</button>
                  <button class="buy-button">Buy Now</button>
              </div>
              <div class="product-card">
                  <h2>Wooden Table</h2>
                  <model-viewer 
                      src="assets/models/table.glb" 
                      ar 
                      ar-modes="webxr scene-viewer quick-look" 
                      camera-controls 
                      auto-rotate 
                      style="width: 100%; height: 300px;">
                  </model-viewer>
                  <p>Price: $149.99</p>
                  <button class="ar-button">Try in AR</button>
                  <button class="buy-button">Buy Now</button>
              </div>
          </section>
      </main>
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
      <script src="js/script.js"></script>
  </body>
  </html>

- Final js/script.js (for multiple products):
  document.addEventListener("DOMContentLoaded", () => {
      const arButtons = document.querySelectorAll(".ar-button");
      const buyButtons = document.querySelectorAll(".buy-button");

      arButtons.forEach((button, index) => {
          const modelViewer = document.querySelectorAll("model-viewer")[index];
          button.addEventListener("click", () => {
              modelViewer.activateAR();
          });
      });

      buyButtons.forEach(button => {
          button.addEventListener("click", () => {
              alert("Thank you for your purchase! (Demo)");
          });
      });
  });

- Test: Add table.glb to assets/models/ and test both products.

GitHub Setup
1. Initialize Git:
   git init
   git add .
   git commit -m "Initial commit: AR Shopping Platform"

2. Create a GitHub Repo:
   - Go to https://github.com/, log in, and click "New Repository."
   - Name: ar-shopping-platform
   - Description: "E-commerce site with AR to preview furniture in real-world space using `<model-viewer>`. Built with HTML, CSS, JS."
   - Create it without a README (we’ll add our own).

3. Push to GitHub:
   git remote add origin https://github.com/your-username/ar-shopping-platform.git
   git branch -M main
   git push -u origin main

Testing AR on a Mobile Device with ngrok
1. Install ngrok:
   - Download from https://ngrok.com/download and unzip it.
   - Move `ngrok` to a folder in your PATH (optional) or run it from its directory.

2. Start Your Local Server:
   python -m http.server 8000

3. Expose the Server with ngrok:
   - In a new terminal, run:
     ./ngrok http 8000
   - Copy the HTTPS URL (e.g., https://1234-5678.ngrok.io).

4. Test on Your Phone:
   - Open the ngrok HTTPS URL in your phone’s browser (Chrome for Android, Safari for iOS).
   - Click "Try in AR" to see the furniture in your real-world space.

5. Troubleshooting:
   - AR Button Missing: Ensure your phone supports ARCore/ARKit and the browser is compatible.
   - Model Not Loading: Check the `src` path in `<model-viewer>`.
   - ngrok Errors: Restart ngrok or sign up for a free account at ngrok.com.

Usage
- On a desktop, view and rotate 3D models.
- On a mobile device, tap "Try in AR" to place furniture in your environment.
- Click "Buy Now" for a demo purchase alert.

Project Structure
ar-shopping-platform/
├── index.html         # Main HTML file
├── css/
│   └── styles.css     # Styling
├── js/
│   └── script.js      # JavaScript logic
├── assets/
│   └── models/        # 3D models (e.g., chair.glb, table.glb)
└── README.txt         # This file

Screenshots
(Add screenshots here by dragging images into GitHub after upload)
- Product listing
- AR view on mobile

Future Improvements
- Add a backend for a real shopping cart.
- Support more product categories (e.g., clothes, accessories).
- Use WebXR for advanced AR features.

Contributing
Feel free to fork this repo, submit issues, or send pull requests!

License
MIT License - feel free to use and modify this project.
