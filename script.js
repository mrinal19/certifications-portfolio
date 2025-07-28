document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const text = "Hi, I'm Mrinal – Building Intelligent Systems";
  let index = 0;
  function type() {
    if (index < text.length) {
      document.querySelector('.typing-text').textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  type();

  // Certifications dynamic load
  fetch('certs.json')
    .then(response => response.json())
    .then(data => {
      const grid = document.getElementById('certifications-grid');
      data.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6 text-center';
        
        card.innerHTML = `
          <img src="${cert.logo}" class="w-16 h-16 mx-auto mb-4">
          <h3 class="text-xl font-bold">${cert.title}</h3>
          <p class="text-gray-600 dark:text-gray-300">${cert.issuer}</p>
          <p class="text-gray-500">${cert.date}</p>
          <a href="${cert.link}" target="_blank" class="btn-primary mt-4 inline-block">Verify</a>
        `;
        grid.appendChild(card);
      });
    });

  // Dark mode toggle
  document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });
  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

  // Resume modal
  const resumeBtn = document.getElementById('resumeBtn');
  const modal = document.getElementById('resumeModal');
  const closeModal = document.getElementById('closeModal');
  resumeBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModal.addEventListener('click', () => modal.classList.add('hidden'));

  // Matrix background
  const canvas = document.getElementById('matrixBackground');
  const ctx = canvas.getContext('2d');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  const letters = Array(256).join("1").split("");
  setInterval(() => {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    letters.map((y_pos, index) => {
      const text = String.fromCharCode(3e4 + Math.random() * 33);
      const x_pos = index * 10;
      ctx.fillText(text, x_pos, y_pos);
      letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
    });
  }, 50);
});