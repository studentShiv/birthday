const center = document.querySelector("#center");

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800"
];

let lastIndex = -1;

// throttle
const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = Date.now();
    if (now - prev > delay) {
      prev = now;
      func(...args);
    }
  };
};

function getRandomImage() {
  let index;
  do {
    index = Math.floor(Math.random() * images.length);
  } while (index === lastIndex);
  lastIndex = index;
  return images[index];
}

center.addEventListener(
  "mousemove",
  throttleFunction((event) => {
    const x = event.clientX;
    const y = event.clientY;

    const div = document.createElement("div");
    div.className = "imageDiv";
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    const img = document.createElement("img");
    img.src = getRandomImage();

    div.appendChild(img);
    center.appendChild(div);

    gsap.fromTo(
      img,
      { y: "30%", scale: 1.1, opacity: 0 },
      {
        y: "0%",
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      }
    );

    gsap.to(img, {
      y: "-20%",
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.2,
      ease: "power3.inOut",
      onComplete: () => div.remove()
    });
  }, 250)
);
