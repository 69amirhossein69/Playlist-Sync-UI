gsap.from(".container", {
  duration: 0.8,
  opacity: 0,
  y: 30,
  ease: "power3.out",
});
gsap.from("h1", {
  duration: 0.8,
  opacity: 0,
  y: 20,
  delay: 0.2,
  ease: "power3.out",
});
gsap.from(".toggle-container", {
  duration: 0.8,
  opacity: 0,
  y: 20,
  delay: 0.4,
  ease: "power3.out",
});
gsap.from(".content", {
  duration: 0.8,
  opacity: 0,
  y: 20,
  delay: 0.6,
  ease: "power3.out",
});

const toggleBtns = document.querySelectorAll('.toggle-btn');
const contents = document.querySelectorAll('.content');
const root = document.documentElement;
const body = document.body;

function setTheme(target) {
  if (target === "youtube-to-spotify") {
    root.style.setProperty("--primary-color", "var(--youtube-red)");
    root.style.setProperty("--bg-color", "var(--youtube-dark)");
  } else {
    root.style.setProperty("--primary-color", "var(--spotify-green)");
    root.style.setProperty("--bg-color", "var(--spotify-black)");
  }

  body.style.background = `
  radial-gradient(circle at top left, var(--bg-color), transparent),
  radial-gradient(circle at bottom right, var(--primary-color), transparent)
`;
  body.style.backgroundColor = "var(--bg-color)";
}

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    toggleBtns.forEach(b=>b.classList.remove('active'))
    contents.forEach(c=>c.classList.remove('active'))
    btn.classList.add('active')
    const target = btn.dataset.target;
    document.getElementById(target).classList.add('active');
    setTheme(target);
    gsap.from("#" + target, {duration: 0.5, opacity: 0, y: 10, ease: "power2.out"});




  });
});
setTheme('youtube-to-spotify');


async function syncPlaylists(source) {
  const loader = document.getElementById('loader');
  const result = document.getElementById('result');
  const playlistId = document.getElementById(`${source}-playlist-id`).value;

  loader.style.display = 'block';
  result.className = 'result';
  result.textContent = '';
  gsap.to(loader, {duration: 0.3, opacity: 1, scale: 1, ease: "power2.out"});

  try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = "Playlist successfully synced!";
      result.textContent = data;
      result.classList.add('success');
  } catch (error) {
      result.textContent = 'Error: ' + error.message;
      result.classList.add('error');
  } finally {
      gsap.to(loader, {duration: 0.3, opacity: 0, scale: 0, ease: "power2.in", onComplete: () => {
          loader.style.display = 'none';
      }});
      gsap.from(result, {duration: 0.5, opacity: 0, y: 10, ease: "power2.out"});
  }

  return false;
}