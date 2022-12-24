const slides = document.querySelector(".home-slider");
let posX1,
    posX2,
    posY1,
    posY2,
    dX,
    dY,
    dirDetected = false;
    
  //feature detection
  //-------------Note 1-----------//
  let passiveIfSupported = false;
  try {
    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
      get: function() {passiveIfSupported = {passive: false};}
    }));
  } catch(err) {}

slides.addEventListener("touchstart", dragStart, passiveIfSupported);
slides.addEventListener("touchmove", dragAction, passiveIfSupported);
slides.addEventListener("touchend", dragEnd, false);

function dragStart(e) {
  posX1 = e.touches[0].clientX;
  posY1 = e.touches[0].clientY;
}

function dragAction(e) {
  //-------------Note 2-----------//
  e.preventDefault();
  
  posX2 = e.touches[0].clientX;
  posY2 = e.touches[0].clientY;
  dX = posX2 - posX1;
  posX1 = e.touches[0].clientX;
  dY = posY2 - posY1;
  
  if (!dirDetected) {
    if (Math.abs(dY) > Math.abs(dX)) {
      slides.removeEventListener("touchmove", dragAction, passiveIfSupported);
      return;
    }
    dirDetected = true;
  }
    
  slides.style.left = (slides.offsetLeft + dX) + "px";
}

  function dragEnd() {
    if (!dirDetected) {
      slides.addEventListener("touchmove", dragAction, passiveIfSupported);
    }
    dirDetected = false;
  }