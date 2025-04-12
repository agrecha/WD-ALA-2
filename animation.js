// Variables to store comet and asteroid elements
let comets = [];
let asteroids = [];

// Function to create and animate a comet
function createComet() {
  const comet = document.createElement('div');
  comet.classList.add('comet');
  comet.style.left = `${Math.random() * 100}vw`;  // Random starting position
  comet.style.top = `${Math.random() * 100}vh`; // Random starting position
  document.body.appendChild(comet);
  comets.push(comet);

  // Add explosion effect when the comet "hits" the screen
  setTimeout(() => {
    comet.remove();
  }, 4000);
}

// Function to create and animate an asteroid
function createAsteroid() {
  const asteroid = document.createElement('div');
  asteroid.classList.add('asteroid');
  asteroid.style.left = `${Math.random() * window.innerWidth}px`;
  asteroid.style.top = `-20px`; // Start from the top of the screen
  document.body.appendChild(asteroid);
  asteroids.push(asteroid);

  // Add explosion effect when the asteroid hits the bottom
  setTimeout(() => {
    asteroid.remove();
  }, 5000);
}

// Function to detect if comet and asteroid are colliding
function detectCollision() {
  comets.forEach(comet => {
    asteroids.forEach(asteroid => {
      const cometRect = comet.getBoundingClientRect();
      const asteroidRect = asteroid.getBoundingClientRect();

      // Check if their bounding boxes intersect (collision detection)
      if (cometRect.left < asteroidRect.right &&
          cometRect.right > asteroidRect.left &&
          cometRect.top < asteroidRect.bottom &&
          cometRect.bottom > asteroidRect.top) {

        // If collision detected, create explosion at the collision point
        const collisionX = (cometRect.left + cometRect.right) / 2;
        const collisionY = (cometRect.top + cometRect.bottom) / 2;

        createExplosion(collisionX, collisionY);

        // Remove the comet and asteroid after collision
        comet.remove();
        asteroid.remove();
      }
    });
  });
}

// Explosion effect when a comet or asteroid collides
function createExplosion(x, y) {
  const explosion = document.createElement('div');
  explosion.classList.add('explosion');
  explosion.style.left = `${x - 25}px`; // Center explosion at comet's or asteroid's position
  explosion.style.top = `${y - 25}px`; // Center explosion at comet's or asteroid's position
  document.body.appendChild(explosion);

  // Remove explosion after animation ends
  setTimeout(() => {
    explosion.remove();
  }, 800);
}

// Create comets and asteroids every 3 seconds
setInterval(createComet, 3000);
setInterval(createAsteroid, 2000); // Asteroids appear more often

// Detect collision every 50 milliseconds
setInterval(detectCollision, 50);
