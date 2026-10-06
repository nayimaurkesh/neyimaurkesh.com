document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('heroVideo');
  const hero = document.getElementById('about');
  const bigPlay = document.getElementById('videoBigPlay');
  const playTrigger = document.getElementById('playVideoBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const progressFill = document.getElementById('progressFill');
  const videoProgress = document.getElementById('videoProgress');
  const vTime = document.getElementById('vTime');
  const muteBtn = document.getElementById('muteBtn');
  const soundIcon = document.getElementById('soundIcon');
  const muteIcon = document.getElementById('muteIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');

  // 1. Play / Pause Handling
  function togglePlay() {
    if (video.paused) {
      video.play();
      hero.classList.add('playing');
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      video.pause();
      hero.classList.remove('playing');
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  if (bigPlay) bigPlay.addEventListener('click', togglePlay);
  if (playTrigger) playTrigger.addEventListener('click', togglePlay);
  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);

  // 2. Video Progress Tracking
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      progressFill.style.width = pct + '%';

      const curM = Math.floor(video.currentTime / 60);
      const curS = Math.floor(video.currentTime % 60).toString().padStart(2, '0');
      const durM = Math.floor(video.duration / 60);
      const durS = Math.floor(video.duration % 60).toString().padStart(2, '0');
      vTime.textContent = `${curM}:${curS} / ${durM}:${durS}`;
    }
  });

  // 3. Seek Progress
  videoProgress.addEventListener('click', (e) => {
    const rect = videoProgress.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  });

  // 4. Mute / Unmute
  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    if (video.muted) {
      soundIcon.style.display = 'none';
      muteIcon.style.display = 'block';
    } else {
      soundIcon.style.display = 'block';
      muteIcon.style.display = 'none';
    }
  });

  // 5. Fullscreen
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  });

  // 6. Navbar Scroll Background
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 7. Modals for Case Studies
  const caseDetails = {
    modal1: {
      tag: "Bilingual Private Tutoring",
      title: "French Household Immersion in Paris",
      desc: "Delivering daily 3-hour immersive bilingual (Mandarin & English) tutoring for 7-year-old Romy (Monday to Friday), accompanied by English foundation tutoring for children aged 5 and 10 in Paris.",
      stats: [
        { val: "15 hrs", label: "Weekly Volume" },
        { val: "3 Children", label: "Age 5, 7, 10" },
        { val: "100%", label: "Satisfaction" }
      ],
      points: [
        "Interactive phonics, oral storytelling, and Montessori-inspired sensorial acquisition.",
        "Smooth coordination and weekly developmental progress debriefs with French parents.",
        "Consistent habit-building and natural accent acquisition."
      ]
    },
    modal2: {
      tag: "Language Academy",
      title: "École de Chinois Objectif Bilingue Paris",
      desc: "Serving as Chinese instructor and linguistic coach since January 2023, teaching weekend bilingual classes for children from French-speaking and multilingual backgrounds.",
      stats: [
        { val: "2023+", label: "Teaching Tenure" },
        { val: "Active", label: "Classrooms" },
        { val: "Youth HSK", label: "Curriculum Alignment" }
      ],
      points: [
        "Curriculum planning incorporating active pedagogy, songs, and cultural games.",
        "Cultivating long-term intrinsic interest in Chinese characters and cultural understanding.",
        "Patience, empathy, and classroom dynamics management."
      ]
    },
    modal3: {
      tag: "Cross-Border Business",
      title: "EU-Asia Operations & Executive Coordination",
      desc: "Providing cross-border business support, market research, and high-precision executive translation for organizations bridging European and Asian markets.",
      stats: [
        { val: "4 Langs", label: "Quadrilingual" },
        { val: "EU-Asia", label: "Scope" },
        { val: "B2B", label: "Delivery" }
      ],
      points: [
        "Fast, accurate translation of commercial proposals, partner agreements, and presentations.",
        "Diplomatic, culturally calibrated communication avoiding common East-West misalignments.",
        "High reliability and confidentiality in executive matters."
      ]
    },
    modal4: {
      tag: "Hospitality",
      title: "Front Desk & International Guest Concierge",
      desc: "Hands-on front office operations, arrivals/departures, room status audit, and personalized concierge assistance for discerning international guests in Paris.",
      stats: [
        { val: "PMS", label: "System Fluency" },
        { val: "Bespoke", label: "Paris Concierge" },
        { val: "24/7", label: "Professionalism" }
      ],
      points: [
        "Efficient check-in and check-out workflows with thorough invoice and payment reconciliation.",
        "Empathetic, tactful resolution of guest inquiries and complaints.",
        "Curated local Paris dining, cultural, and transit recommendations in four languages."
      ]
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-modal');
      const data = caseDetails[id];
      if (data) {
        modalBody.innerHTML = `
          <span style="display:inline-block;padding:3px 10px;background:rgba(139,157,119,0.12);border-radius:100px;font-size:0.65rem;font-weight:700;color:#5E7252;text-transform:uppercase;margin-bottom:10px;">${data.tag}</span>
          <h2 style="font-family:'Playfair Display',serif;font-size:1.45rem;color:#2C2C2C;margin-bottom:12px;">${data.title}</h2>
          <p style="font-size:0.88rem;color:#6B6B6B;line-height:1.65;margin-bottom:18px;">${data.desc}</p>
          <div style="display:flex;gap:16px;background:#FAF6F1;padding:16px;border-radius:12px;margin-bottom:18px;">
            ${data.stats.map(s => `
              <div style="flex:1;text-align:center;">
                <div style="font-family:'Playfair Display',serif;font-size:1.25rem;font-weight:700;color:#5E7252;">${s.val}</div>
                <div style="font-size:0.65rem;color:#6B6B6B;text-transform:uppercase;">${s.label}</div>
              </div>
            `).join('')}
          </div>
          <ul style="padding-left:18px;font-size:0.85rem;color:#3D3D3D;line-height:1.6;">
            ${data.points.map(p => `<li style="margin-bottom:6px;">${p}</li>`).join('')}
          </ul>
        `;
        modalOverlay.classList.add('show');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('show');
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('show');
    });
  }

  // 8. Contact Form Mailto Handler
  const contactForm = document.getElementById('contactMiniForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const contact = document.getElementById('senderContact').value.trim();
      const msg = document.getElementById('senderMsg').value.trim();

      const subject = encodeURIComponent(`[Website Inquiry] from ${name}`);
      const body = encodeURIComponent(
        `Hello Neyima,

` +
        `I am reaching out via your website portfolio:

` +
        `• Name/Family: ${name}
` +
        `• Contact Info: ${contact}
` +
        `• Details: ${msg}

` +
        `Best regards,
${name}`
      );
      window.location.href = `mailto:nayimaurkesh@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
