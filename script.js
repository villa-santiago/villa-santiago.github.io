document.addEventListener("DOMContentLoaded", () => {
    const ctaButton = document.getElementById("cta-button");
  
    // Path to the SVG logo
    const svgLogoPath = "https://raw.githubusercontent.com/villa-santiago/villa-santiago.github.io/refs/heads/main/heart.svg"; // Replace with your actual SVG path
  
    // Path to the sound effect
    const soundEffectPath = "/Users/santiagovilla/Desktop/cosa/sound.wav"; // Replace with your actual sound file
  
    // Function to play sound
    function playSound() {
      const audio = new Audio(soundEffectPath);
      audio.play();
    }
  
    // Function to create confetti
    function createConfetti(x, y) {
      const confetti = document.createElement("img");
      confetti.src = svgLogoPath;
      confetti.classList.add("confetti");
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
  
      // Randomize movement and rotation
      const angle = Math.random() * 360; // Random direction
      const distance = Math.random() * 300 + 100; // Distance between 100px to 400px
      const duration = Math.random() * 1 + 1; // Animation duration (1–2 seconds)
      const size = Math.random() * 20 + 10; // Size between 10px and 30px
      const rotation = Math.random() * 720 - 360; // Random rotation between -360 and 360 degrees
  
      confetti.style.setProperty("--angle", `${angle}deg`);
      confetti.style.setProperty("--distance", `${distance}px`);
      confetti.style.setProperty("--duration", `${duration}s`);
      confetti.style.setProperty("--rotation", `${rotation}deg`);
      confetti.style.width = `${size}px`; // Random size
  
      document.body.appendChild(confetti);
  
      // Remove confetti after animation ends
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }
  
    // Generate multiple confetti pieces on click
    function generateConfetti(event) {
      const count = 50; // Number of confetti pieces
      const x = event.clientX;
      const y = event.clientY;
  
      for (let i = 0; i < count; i++) {
        createConfetti(x, y);
      }
    }
  
    // Add click event listener to the CTA button
    ctaButton.addEventListener("click", (event) => {
      generateConfetti(event);
      playSound(); // Play sound effect on click
    });
  });
  