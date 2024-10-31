const pumpButton = document.querySelector(".presser");
const baloonArea = document.getElementById("baloonArea"); 
let clickCount = 0;
let baloons = [];

pumpButton.addEventListener("click", () => {
  clickCount++;
  console.log(`Click count: ${clickCount}`);

  if (clickCount === 1) {
      createbaloon();
  } else if (clickCount === 5) {
      inflatebaloon(baloons[baloons.length - 1], 0.8); 
      startFloating(baloons[baloons.length - 1]);
      clickCount = 0;
  } else {
      inflatebaloon(baloons[baloons.length - 1], clickCount * 0.8);
  }

  gsap.to(".parts", {
      scale: 0.7, 
      duration: 0.3,
      yoyo: true, 
      repeat: 1,  
  });

  gsap.to(".presser", {
      y: "180%",
      duration: 0.3,
      yoyo: true, 
      repeat: 1, 
  });
});



function createbaloon() {

  const balloonContainer = document.createElement("div");
  balloonContainer.classList.add("baloonContainer");

  const subdiv1 = document.createElement("div");
  subdiv1.classList.add("subdiv1");

  const balloonImg = document.createElement("img");
  const choosedBalloon = Math.floor(Math.random() * 10) + 1;
  balloonImg.src = './Graphics/Baloons/b' + choosedBalloon + '.png';
  balloonImg.id = "baloon";

  const letterImg = document.createElement("img");
  let letter = 10000 + Math.floor(Math.random() * 26) + 1;
  letterImg.src = "./Graphics/Letters/Symbol " + letter + ".png";
  letterImg.id = "letter";

  subdiv1.appendChild(balloonImg);
  subdiv1.appendChild(letterImg);
  balloonContainer.appendChild(subdiv1);
  baloons.push(balloonContainer);
  baloonArea.appendChild(balloonContainer);
}


function inflatebaloon(baloon, scale) {
  gsap.to(baloon, {
    scale: scale,
    y: "-=16", 
    duration: 0.5,
  });
}

function startFloating(baloon) {
    const containerRect = baloonArea.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let finalScale = parseFloat(gsap.getProperty(baloon, "scale"));
  
    const initialX = windowWidth; 
    const initialY = windowHeight;
  
    function randomDirection() {
  
      gsap.to(baloon, {
        scale: finalScale,
        x: () => getRandomBetween(-1120, 280),
        y: () => getRandomBetween(-375, 60),
        duration: 3 + Math.random() * 4,
        ease: "power1.inOut",
        onComplete: randomDirection
      });
    }
    tieThread(baloon);
    randomDirection(); 
    
    baloon.addEventListener('click', () => burstbaloon(baloon));
  }
  
  

  function burstbaloon(baloonContainer) {
    const balloonImg = baloonContainer.querySelector("#baloon"); 
  baloonContainer.querySelector("#letter").remove();
  baloonContainer.querySelector("#thread").remove();
    balloonImg.src = "./Graphics/burst.png";
  
    gsap.to(baloonContainer, {
      scale: 1.5,
      opacity: 0,
      duration: 0.9,
      onComplete: () => {
        baloonContainer.remove(); 
        baloons = baloons.filter((b) => b !== baloonContainer);
      },
    });
  }
  


  function tieThread(baloon) {
    const Thread = document.createElement("img");
    Thread.src = "./Graphics/Thread.png";
    Thread.id = "thread";

    const subdiv2 = document.createElement("div");
    subdiv2.classList.add("subdiv2");

    subdiv2.appendChild(Thread);
    baloon.appendChild(subdiv2);
  
    const currentBottom = parseFloat(getComputedStyle(baloon).bottom);
    baloon.style.bottom = `${currentBottom - 85}px`;
}


function getRandomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}