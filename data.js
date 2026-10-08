/* =====================================================
   DATA.JS — ISI KONTEN YANG BISA ANDA EDIT
   Tidak perlu paham JavaScript: cukup ubah teks di dalam tanda kutip "...".
   Jangan hapus tanda koma (,) kurung kurawal { } atau kurung siku [ ].
   Untuk menambah item, salin satu blok { ... }, lalu tempel setelah koma.
   ===================================================== */
/* ---------- 0. LINK WHATSAPP & GOOGLE FORM ----------
   WHATSAPP_NUMBER : nomor tujuan, format internasional TANPA +, spasi, atau strip.
                     Contoh: 0812-3456-7890 ditulis "6281234567890"
   WHATSAPP_MESSAGE: pesan awal yang otomatis terisi saat tombol diklik.
   GFORM_URL       : link Google Form kuis lanjutan (Bagikan > salin link).
   Kosongkan "" kalau ingin menyembunyikan tombolnya. */
const WHATSAPP_NUMBER = "6289527158204";
const WHATSAPP_MESSAGE = "Halo, saya ingin bertanya tentang KB pascapersalinan.";
const GFORM_URL = "https://forms.gle/GANTI_DENGAN_LINK_FORM_ANDA";
/* ---------- 1. VIDEO EDUKASI ----------
   Isi dengan link EMBED YouTube, contoh:
   "https://www.youtube.com/embed/KODE_VIDEO"
   (di YouTube: Bagikan > Sematkan > ambil alamat src="...")
   Biarkan "" kalau belum ada video. */
const VIDEO_URL = "https://youtu.be/Znkz1nyaaOA?si=zQJCMjTpLSW9okbG";

/* ---------- 2. PILIHAN METODE KB ----------
   name  : judul kartu
   icon  : emoji pada kartu
   color : warna latar kartu, bebas kode warna hex (contoh "#ffe4ec")
   short : teks singkat di kartu
   how / when / pros / notes : isi jendela detail saat kartu diklik
   Ini informasi umum; pastikan diperiksa oleh tenaga kesehatan
   sebelum dipublikasikan. */
const METHODS = [
  {
    name: "IUD / AKDR",
    icon: "🔗",
    color: "#ffe4ec",
    short: "Alat kontrasepsi yang dipasang di dalam rahim.",
    how: "Alat kecil yang dipasang oleh tenaga kesehatan terlatih di dalam rahim untuk mencegah kehamilan.",
    when: "Dapat dipasang segera setelah plasenta lahir (dalam 48 jam pertama) atau setelah masa nifas, sesuai anjuran tenaga kesehatan.",
    pros: "Perlindungan jangka panjang, tidak perlu diingat setiap hari, dan kesuburan dapat kembali setelah dilepas.",
    notes: "Perlu dipasang dan dilepas oleh tenaga kesehatan. Tanyakan pilihan tembaga atau hormonal."
  },
  {
    name: "Implan",
    icon: "📏",
    color: "#ece4fa",
    short: "Kontrasepsi hormonal yang dipasang di bawah kulit lengan.",
    how: "Batang kecil berisi hormon progestin yang dipasang di bawah kulit lengan atas.",
    when: "Umumnya dapat dipasang setelah melahirkan, termasuk pada ibu menyusui. Waktu yang tepat ditentukan tenaga kesehatan.",
    pros: "Perlindungan jangka panjang, tidak mengganggu ASI, dan tidak perlu diingat setiap hari.",
    notes: "Dapat menyebabkan perubahan pola haid. Pemasangan dan pelepasan oleh tenaga kesehatan."
  },
  {
    name: "Suntik KB",
    icon: "💉",
    color: "#dcecfb",
    short: "Kontrasepsi hormonal yang diberikan melalui suntikan.",
    how: "Hormon disuntikkan secara berkala oleh tenaga kesehatan. Pilihan untuk ibu menyusui umumnya suntik progestin.",
    when: "Dapat dimulai setelah melahirkan sesuai anjuran tenaga kesehatan.",
    pros: "Praktis, tidak perlu minum obat setiap hari.",
    notes: "Harus kembali tepat waktu sesuai jadwal suntik. Dapat mengubah pola haid."
  },
  {
    name: "Pil KB",
    icon: "💊",
    color: "#fff0cc",
    short: "Kontrasepsi hormonal yang digunakan secara teratur.",
    how: "Pil diminum setiap hari pada jam yang sama. Ibu menyusui umumnya disarankan pil khusus progestin.",
    when: "Dapat dimulai setelah melahirkan sesuai anjuran tenaga kesehatan. Jenis pil menentukan waktu mulai.",
    pros: "Dapat dihentikan kapan saja dan kesuburan cepat kembali.",
    notes: "Harus diminum teratur; lupa minum menurunkan efektivitas. Jangan memilih jenis pil sendiri, konsultasikan dahulu."
  },
  {
    name: "Kondom",
    icon: "🛡️",
    color: "#dff3e8",
    short: "Kontrasepsi yang digunakan saat berhubungan seksual.",
    how: "Pelindung yang dipakai saat berhubungan seksual untuk mencegah sperma bertemu sel telur.",
    when: "Dapat digunakan kapan saja, termasuk segera setelah masa nifas selesai.",
    pros: "Mudah didapat, tanpa hormon, dan membantu melindungi dari infeksi menular seksual.",
    notes: "Harus dipakai dengan benar setiap kali berhubungan agar efektif."
  },
  {
    name: "MOW / MOP",
    icon: "➰",
    color: "#ece4fa",
    short: "Metode kontrasepsi mantap untuk pasangan yang tidak ingin memiliki anak lagi.",
    how: "MOW (tubektomi) untuk perempuan dan MOP (vasektomi) untuk laki-laki, berupa tindakan medis kecil.",
    when: "Dipertimbangkan hanya bila pasangan sudah yakin tidak ingin memiliki anak lagi. Waktu tindakan ditentukan oleh dokter.",
    pros: "Perlindungan permanen dan sangat efektif.",
    notes: "Bersifat permanen. Diskusikan matang dengan pasangan dan dokter sebelum memutuskan."
  }
];

/* ---------- 3. MITOS & FAKTA ---------- */
const MYTHS = [
  {
    myth: "Kalau sedang menyusui, Ibu pasti tidak bisa hamil.",
    fact: "Menyusui dapat memberikan perlindungan terhadap kehamilan dalam kondisi tertentu, tetapi tidak otomatis membuat semua Ibu tidak dapat hamil."
  },
  {
    myth: "KB membuat Ibu sulit hamil lagi selamanya.",
    fact: "Sebagian besar metode KB bersifat sementara. Kesuburan dapat kembali setelah penggunaan dihentikan, kecuali metode mantap."
  },
  {
    myth: "KB selalu mengurangi produksi ASI.",
    fact: "Banyak metode aman digunakan oleh Ibu menyusui. Tenaga kesehatan dapat membantu memilih metode yang sesuai."
  },
  {
    myth: "KB hanya urusan Ibu.",
    fact: "Keputusan ber-KB sebaiknya dibicarakan bersama pasangan. Ayah juga dapat berperan, misalnya dengan kondom atau MOP."
  },
  {
    myth: "Metode KB yang cocok untuk tetangga pasti cocok untuk saya.",
    fact: "Setiap Ibu memiliki kondisi kesehatan dan kebutuhan berbeda, sehingga pilihan metode perlu dikonsultasikan."
  },
  {
    myth: "KB baru dipikirkan setelah haid kembali datang.",
    fact: "Ibu dapat hamil sebelum haid pertama datang kembali setelah melahirkan, sehingga KB sebaiknya direncanakan lebih awal."
  }
];

/* ---------- 4. KUIS ----------
   answer = nomor jawaban benar, dimulai dari 0 (0 = pilihan pertama) */
const QUIZ = [
  {
    q: "KBPP adalah pelayanan KB yang diberikan setelah persalinan sampai dengan berapa hari?",
    options: ["7 hari", "42 hari", "100 hari"],
    answer: 1,
    explain: "KBPP diberikan setelah persalinan sampai dengan 42 hari."
  },
  {
    q: "Kapan Ibu sebaiknya mulai mengenali pilihan KB?",
    options: ["Sejak masa kehamilan", "Hanya setelah haid kembali", "Saat bayi berusia 1 tahun"],
    answer: 0,
    explain: "Merencanakan sejak hamil memberi waktu untuk mencari informasi dan berdiskusi dengan pasangan dan tenaga kesehatan."
  },
  {
    q: "Apa yang sebaiknya dilakukan sebelum memilih metode KB?",
    options: ["Mengikuti pilihan tetangga", "Berkonsultasi dengan bidan atau tenaga kesehatan", "Menunggu sampai ada keluhan"],
    answer: 1,
    explain: "Pilihan metode perlu menyesuaikan kondisi kesehatan, kebutuhan, dan rencana kehamilan berikutnya."
  },
  {
    q: "Manakah yang termasuk metode kontrasepsi mantap?",
    options: ["Pil KB", "Kondom", "MOW / MOP"],
    answer: 2,
    explain: "MOW dan MOP bersifat permanen, untuk pasangan yang tidak ingin memiliki anak lagi."
  },
  {
    q: "Benarkah Ibu menyusui pasti tidak bisa hamil?",
    options: ["Benar, pasti tidak bisa hamil", "Tidak, tetap bisa hamil", "Hanya bisa hamil setelah 3 tahun"],
    answer: 1,
    explain: "Menyusui memberi perlindungan hanya pada kondisi tertentu, bukan untuk semua Ibu."
  }
];
