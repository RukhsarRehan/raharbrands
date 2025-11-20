(() => {
  const track = document.getElementById("track");
  const wrap = track.parentElement;
  const cards = Array.from(track.children);

  const isMobile = () => matchMedia("(max-width:767px)").matches;

  let current = 0;

  function center(i) {
    const card = cards[i];
    const axis = isMobile() ? "top" : "left";
    const size = isMobile() ? "clientHeight" : "clientWidth";
    const start = isMobile() ? card.offsetTop : card.offsetLeft;
    wrap.scrollTo({
      [axis]: start - (wrap[size] / 2 - card[size] / 2),
      behavior: "smooth"
    });
  }

  function toggleUI(i) {
    cards.forEach((c, k) => c.toggleAttribute("active", k === i));
  }

  function activate(i, scroll) {
    if (i === current) return;
    current = i;
    toggleUI(i);
    if (scroll) center(i);
  }

  addEventListener(
    "keydown",
    (e) => {
      if (["ArrowRight", "ArrowDown"].includes(e.key)) go(1);
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) go(-1);
    },
    { passive: true }
  );

  cards.forEach((card, i) => {
    card.addEventListener(
      "mouseenter",
      () => matchMedia("(hover:hover)").matches && activate(i, true)
    );
    card.addEventListener("click", () => activate(i, true));
  });

  let sx = 0,
    sy = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (isMobile() ? Math.abs(dy) > 60 : Math.abs(dx) > 60)
        go((isMobile() ? dy : dx) > 0 ? -1 : 1);
    },
    { passive: true }
  );
  if (window.matchMedia("(max-width:767px)").matches) dotsBox.hidden = true;

  addEventListener("resize", () => center(current));

  toggleUI(0);
  center(0);
})();



console.clear()

const btn = document.querySelectorAll('[data-btn]');
const test = document.querySelector('#test');

function panningNext() {
  
  const slides = document.querySelectorAll('.slide');
  const container = document.querySelector('.slider');
  slides.forEach(e => {
    e.dataset.type = '';
    e.style = '';
    e.classList.remove('to-left', 'to-right', 'from-before', 'to-before', 'from-after', 'to-after', 'fade-in', 'fade-out');
  })
  slides[0].dataset.type = 'before'
  slides[0].classList.add('fade-out')
  gsap.to('.fade-out', {duration: 1, scale: '0, 0'})
  
  slides[1].dataset.type = 'before';
  slides[1].classList.add('to-before')
  
  gsap.from('.to-before', {duration: 1, transform: 'translatex(0rem)', scale: '1, 1'})
  
  slides[2].dataset.type = 'active';
  slides[2].classList.add('to-left')
  
  slides[3].dataset.type = 'active';
  slides[3].classList.add('to-left')
  gsap.from('.to-left', {duration: 1, transform: 'translatex(10.5rem)'})
  
  slides[4].dataset.type = 'active';
  slides[4].classList.add('from-after');
  gsap.from('.from-after', {duration: 1, transform: 'translatex(7rem)', scale: '0.8'})
  
  slides[5].dataset.type = 'after';
  slides[5].classList.add('fade-in');
  gsap.from('.fade-in', {duration: 1, scale: '0, 0'})
  
  

  
  setTimeout(() => {
    render(slides, container)
    slides[0].dataset.type = '';
    container.innerHTML += slides[0].outerHTML
    container.firstElementChild.remove()
  }, 1000)
  
  
  
};



