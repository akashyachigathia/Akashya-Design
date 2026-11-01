

  if (typeof Lenis !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      lerp: 0.1,
      anchors: true,
    });
  }





function heroTextAnimation(){
  const heading = document.querySelector(".hero_heading");
const heroCaption = document.querySelector(".hero_caption");

if (
  heading &&
  heroCaption &&
  typeof gsap !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  heading.setAttribute(
    "aria-label",
    [...heading.querySelectorAll(".heading_line")]
      .map(function (line) {
        return line.textContent.trim();
      })
      .join(" ")
  );

  heading.querySelectorAll(".heading_line").forEach(function (line) {
    const words = line.textContent.trim().split(/\s+/);

    line.textContent = "";
    line.setAttribute("aria-hidden", "true");

    words.forEach(function (word, index) {
      const wordSpan = document.createElement("span");

      wordSpan.className = "word";

      Array.from(word).forEach(function (letter) {
        const charSpan = document.createElement("span");

        charSpan.className = "char";
        charSpan.textContent = letter;

        wordSpan.appendChild(charSpan);
      });

      line.appendChild(wordSpan);

      if (index < words.length - 1) {
        line.appendChild(document.createTextNode(" "));
      }
    });
  });

  gsap.fromTo(
    heading.querySelectorAll(".char"),
    {
      opacity: 0,
      filter: "blur(8px)"
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.35,
      stagger: 0.045,
      ease: "power2.out",
      delay: 0.25
    }
  );

  // Caption appears after two seconds
  gsap.fromTo(
    heroCaption,
    {
      opacity: 0,
      y: 10,
      filter: "blur(6px)"
    },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.6,
      delay: 3.5,
      ease: "power2.out"
    }
  );
}
}

// --------------------------------------------------------------------------



// emailCopyFeature

function emailCopyFeature (){
var email = document.getElementById('Email');
var copyMessage = document.getElementById('copyMessage');
var hideMessage;
if (!email || !copyMessage) return;

email.addEventListener('click', async function (event) {
  event.preventDefault();
console.log('HELLO')
  try {
    await navigator.clipboard.writeText('akashyachigathia@gmail.com');

    copyMessage.textContent = 'Copied';
    clearTimeout(hideMessage);
    copyMessage.classList.add('show');

    hideMessage = setTimeout(function () {
      copyMessage.classList.remove('show');
    }, 2000);
  } catch {
    // No message if copying fails
  }
});
}






// ----------------------------------------------------------------------------

function avatarMovement() {
const avatar = document.querySelector("#interactiveAvatar");
if (!avatar) return;

const avatarImages = {
  "top-left": "avatar-directions/avatar-top-left.webp",
  "top-center": "avatar-directions/avatar-top.webp",
  "top-right": "avatar-directions/avatar-top-right.webp",

  "center-left": "avatar-directions/avatar-left.webp",
  "center-center": "avatar-directions/avatar-center.webp",
  "center-right": "avatar-directions/avatar-right.webp",

  "bottom-left": "avatar-directions/avatar-bottom-left.webp",
  "bottom-center": "avatar-directions/avatar-bottom.webp",
  "bottom-right": "avatar-directions/avatar-bottom-right.webp",
};

Object.values(avatarImages).forEach(function (imagePath) {
  const image = new Image();
  image.src = imagePath;
});

let currentDirection = "center-center";

window.addEventListener("pointermove", function (event) {
  const horizontal =
    event.clientX < window.innerWidth / 3
      ? "left"
      : event.clientX > (window.innerWidth / 3) * 2
        ? "right"
        : "center";

  const vertical =
    event.clientY < window.innerHeight / 3
      ? "top"
      : event.clientY > (window.innerHeight / 3) * 2
        ? "bottom"
        : "center";

  const direction = `${vertical}-${horizontal}`;

  if (direction !== currentDirection) {
    avatar.src = avatarImages[direction];
    currentDirection = direction;
  }
});

document.addEventListener("mouseleave", function () {
  avatar.src = avatarImages["center-center"];
  currentDirection = "center-center";
});
}








heroTextAnimation();
avatarMovement();
emailCopyFeature();

// Load the live website only when the visitor chooses to explore it.
function setupProjectPreview() {
  document.querySelectorAll(".first_project").forEach((card) => {
  if (!card.querySelector("[data-project-preview]")) return;
  const box = card.querySelector("[data-project-preview]");
  const viewport = card.querySelector(".preview_viewport");
  const poster = card.querySelector(".preview_poster");
  const toggle = card.querySelector(".preview_toggle");
  const status = card.querySelector(".preview_status");
  const desktop = window.matchMedia("(min-width: 768px)");
  let frame = null;

  function sizePreview() {
    if (!frame || !viewport.clientWidth) return;
    const scale = viewport.clientWidth / 1440;
    frame.style.height = `${viewport.clientHeight / scale}px`;
    frame.style.transform = `scale(${scale})`;
  }

  function closePreview() {
    if (frame) frame.remove();
    frame = null;
    viewport.hidden = true;
    poster.hidden = false;
    box.classList.remove("is-active");
    toggle.textContent = "Explore preview";
    toggle.setAttribute("aria-expanded", "false");
    status.textContent = "";
  }

  toggle.hidden = !desktop.matches;
  toggle.addEventListener("click", () => {
    if (frame) { closePreview(); return; }
    if (!desktop.matches) return;
    frame = document.createElement("iframe");
    frame.title = `${card.querySelector("h2").textContent.trim()} interactive website preview`;
    frame.src = card.querySelector(".preview_link").href;
    viewport.hidden = false;
    poster.hidden = true;
    box.classList.add("is-active");
    viewport.appendChild(frame);
    sizePreview();
    toggle.textContent = "Close preview";
    toggle.setAttribute("aria-expanded", "true");
    status.textContent = "Scroll inside the preview to explore. Close it to return to page scrolling. If it does not load, use Open website.";
  });
  desktop.addEventListener("change", () => {
    if (!desktop.matches) closePreview();
    toggle.hidden = !desktop.matches;
  });
  if (typeof ResizeObserver !== "undefined") {
    new ResizeObserver(sizePreview).observe(viewport);
  } else {
    window.addEventListener("resize", sizePreview);
  }
  });
}
setupProjectPreview();
