/* =====================================================
   MAIN.JS — Logika interaksi halaman
   Daftar isi:
   1. Helper
   2. Menu navigasi (mobile + penanda menu aktif)
   3. Kartu metode KB + jendela detail
   4. Mitos & fakta
   5. Video
   6. Kuis
   7. Rencana KB saya (disimpan di perangkat)
   Isi teks/konten ada di data.js. File ini biasanya tidak perlu diubah.
   ===================================================== */

/* ---------- 1. HELPER ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
const $ = (id) => document.getElementById(id);

/* ---------- 2. NAVIGASI ---------- */
(function initNav() {
  const toggle = $("navToggle");
  const menu = $("navMenu");

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  // Tandai menu sesuai bagian yang sedang dilihat
  const links = [...menu.querySelectorAll("a")];
  const map = new Map();
  links.forEach((a) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) map.set(target, a);
  });
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove("is-active"));
        map.get(entry.target).classList.add("is-active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  map.forEach((_, section) => observer.observe(section));
})();

/* ---------- 3. METODE KB ---------- */
(function initMethods() {
  const grid = $("methodGrid");
  const modal = $("methodModal");
  const body = $("modalBody");

  METHODS.forEach((m) => {
    const btn = el("button", "method");
    btn.type = "button";
    btn.style.background = m.color;
    btn.append(el("span", "method__icon", m.icon), el("span", "method__name", m.name), el("span", "method__short", m.short));
    btn.addEventListener("click", () => openModal(m));
    grid.append(btn);
  });

  function openModal(m) {
    body.replaceChildren();
    const title = el("h3", null, m.name);
    title.id = "modalTitle";
    const dl = el("dl");
    [["Cara kerja", m.how], ["Waktu penggunaan", m.when], ["Kelebihan", m.pros], ["Perlu diperhatikan", m.notes]].forEach(([k, v]) => {
      dl.append(el("dt", null, k), el("dd", null, v));
    });
    const reminder = el("p", "note", "Konsultasikan dengan bidan atau tenaga kesehatan sebelum memilih.");
    reminder.style.marginTop = "1rem";
    body.append(title, dl, reminder);
    modal.showModal();
  }

  $("modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); }); // klik di luar untuk menutup

  // Isi pilihan di formulir "Rencana KB Saya"
  const select = $("planMethod");
  ["Belum menentukan", ...METHODS.map((m) => m.name)].forEach((name) => {
    const opt = el("option", null, name);
    opt.value = name;
    select.append(opt);
  });
})();

/* ---------- 4. MITOS & FAKTA ---------- */
(function initMyths() {
  const grid = $("mythGrid");
  MYTHS.forEach((item) => {
    const card = el("button", "myth");
    card.type = "button";
    card.setAttribute("aria-expanded", "false");

    const mythP = el("p");
    mythP.append(el("span", "myth__tag", "❌ Mitos: "), document.createTextNode(item.myth));

    const factP = el("p", "myth__fact");
    factP.append(el("span", "myth__tag", "✅ Fakta: "), document.createTextNode(item.fact));

    card.append(mythP, el("span", "myth__hint", "Klik untuk lihat fakta"), factP);
    card.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(open));
    });
    grid.append(card);
  });
})();

/* ---------- 5. VIDEO ---------- */
(function initVideo() {
  const box = $("videoBox");
  if (VIDEO_URL) {
    const frame = el("iframe");
    frame.src = VIDEO_URL;
    frame.title = "Video edukasi KB pascapersalinan";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    box.append(frame);
  } else {
    const empty = el("div", "video__empty");
    empty.append(el("span", null, "🎬"), el("strong", null, "Video segera hadir"), el("p", null, "Isi VIDEO_URL di js/data.js untuk menampilkan video di sini."));
    box.append(empty);
  }
})();

/* ---------- 6. KUIS ---------- */
(function initQuiz() {
  const box = $("quizBox");
  let index = 0;
  let score = 0;

  function renderQuestion() {
    const item = QUIZ[index];
    box.replaceChildren();
    box.append(el("h2", null, "Kuis: seberapa paham kamu?"));
    box.append(el("p", "quiz__progress", `Pertanyaan ${index + 1} dari ${QUIZ.length}`));
    box.append(el("p", "quiz__q", item.q));

    const opts = el("div", "quiz__opts");
    const explain = el("div", "quiz__explain");
    explain.hidden = true;
    const next = el("button", "btn btn--primary", index === QUIZ.length - 1 ? "Lihat hasil" : "Pertanyaan berikutnya");
    next.type = "button";
    next.hidden = true;

    item.options.forEach((text, i) => {
      const b = el("button", "quiz__opt", text);
      b.type = "button";
      b.addEventListener("click", () => {
        const correct = i === item.answer;
        if (correct) score++;
        [...opts.children].forEach((c, ci) => {
          c.disabled = true;
          if (ci === item.answer) c.classList.add("is-right");
        });
        if (!correct) b.classList.add("is-wrong");
        explain.textContent = (correct ? "Benar! " : "Belum tepat. ") + item.explain;
        explain.hidden = false;
        next.hidden = false;
        next.focus();
      });
      opts.append(b);
    });

    next.addEventListener("click", () => {
      index++;
      index < QUIZ.length ? renderQuestion() : renderResult();
    });
    box.append(opts, explain, next);
  }

  function renderResult() {
    box.replaceChildren();
    const msg = score === QUIZ.length ? "Luar biasa! Kamu sudah paham dasar-dasarnya." : score >= QUIZ.length / 2 ? "Bagus! Baca lagi bagian yang masih terlewat." : "Yuk, pelajari lagi materinya di atas.";
    const again = el("button", "btn btn--primary", "Ulangi kuis");
    again.type = "button";
    again.addEventListener("click", () => { index = 0; score = 0; renderQuestion(); });
    box.append(el("h2", null, "Hasil kuis"), el("p", "quiz__score", `${score} / ${QUIZ.length}`), el("p", null, msg), again);
  }

  renderQuestion();
})();

/* ---------- 7. RENCANA KB SAYA ---------- */
(function initPlan() {
  const form = $("planForm");
  const status = $("planStatus");
  const KEY = "kbpp_rencana"; // nama penyimpanan di browser

  function flash(text) {
    status.textContent = text;
    setTimeout(() => (status.textContent = ""), 2500);
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!saved) return;
      [...form.elements].forEach((f) => {
        if (!f.name || !(f.name in saved)) return;
        if (f.type === "checkbox") f.checked = saved[f.name];
        else f.value = saved[f.name];
      });
    } catch (e) { /* penyimpanan tidak tersedia, abaikan */ }
  }

  $("planSave").addEventListener("click", () => {
    const data = {};
    [...form.elements].forEach((f) => {
      if (!f.name) return;
      data[f.name] = f.type === "checkbox" ? f.checked : f.value;
    });
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      flash("Rencana tersimpan ✓");
    } catch (e) {
      flash("Tidak dapat menyimpan di browser ini.");
    }
  });

  $("planReset").addEventListener("click", () => {
    form.reset();
    try { localStorage.removeItem(KEY); } catch (e) {}
    flash("Catatan dihapus.");
  });

  $("planPrint").addEventListener("click", () => window.print());

  load();
})();
