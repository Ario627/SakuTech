export type Paragraph =
  | { type: "narration"; text: string }
  | { type: "dialog"; character: "alaska" | "erine"; text: string };

export type Quiz = {
  id: string;
  setup: string;
  slots: (string | null)[];
  options: string[];
  correctAnswer: string[];
  hint: string | null;
};

export type Chapter = {
  id: string;
  arcId: string;
  chapterNumber: number;
  title: string;
  paragraphs: Paragraph[];
  character: "alaska" | "erine" | "narrator";
  quiz: Quiz | null;
  rewardParagraph: Paragraph[];
};

export const chapters: Chapter[] = [
  {
    id: "arc1-ch1",
    arcId: "arc-01",
    chapterNumber: 1,
    title: "Aroma Petrikor dan Buku Tua",
    character: "narrator",
    paragraphs: [
      {
        type: "narration",
        text: "Hujan turun tanpa peringatan sore itu, menjebak sebagian besar siswa di koridor sekolah. Tapi tidak dengan Alaska.",
      },
      {
        type: "narration",
        text: "Cowok itu sudah mengamankan tempat persembunyian favoritnya sejak bel pulang berbunyi: meja paling pojok di perpustakaan lantai dua.",
      },
      {
        type: "narration",
        text: "Tempat itu beraroma khas kertas tua dan debu yang menenangkan. Tidak ada yang pernah duduk di sana karena posisinya tersembunyi di balik rak ensiklopedia.",
      },
      {
        type: "narration",
        text: "Setidaknya, itu yang Alaska pikirkan sampai dia mendengar suara langkah kaki mendekat.",
      },
      {
        type: "narration",
        text: "Seorang gadis dengan seragam yang bahunya sedikit basah karena gerimis tiba-tiba berdiri di depan mejanya. Rambutnya diikat asal, dan dia memeluk sebuah buku tebal di dadanya.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Permisi... kursi di depan kamu kosong?",
      },
    ],
    quiz: {
      id: "q-arc1-ch1",
      setup:
        " [ SYSTEM INTERRUPT ] Memori terkunci. Untuk membuka kelanjutan cerita ini, susun fondasi awal (Heading) yang tepat untuk menampung respons Alaska.",
      slots: ["___", "Respons Alaska", "___"],
      options: ["<h1>", "<p>", "</h1>", "</p>", "<body>"],
      correctAnswer: ["<h1>", "</h1>"],
      hint: "Ini adalah elemen paling besar (Heading 1). Gunakan tag pembuka dan penutup yang sesuai.",
    },
    rewardParagraph: [
      { type: "dialog", character: "alaska", text: "Eh... kosong. Duduk aja." },
      {
        type: "narration",
        text: "Alaska gelagapan, buru-buru menyingkirkan tasnya dari atas meja. Gadis itu tersenyum kecil, lalu menarik kursi kayu di hadapannya.",
      },
      {
        type: "narration",
        text: "Tiba-tiba, aroma debu perpustakaan tergantikan oleh wangi vanilla yang lembut.",
      },
    ],
  },
  {
    id: "arc1-ch2",
    arcId: "arc-01",
    chapterNumber: 2,
    title: "Buku yang Terbalik",
    character: "alaska",
    paragraphs: [
      {
        type: "narration",
        text: "Sepuluh menit berlalu dalam hening. Hanya ada suara rintik hujan yang menghantam kaca jendela di sebelah mereka.",
      },
      {
        type: "narration",
        text: "Alaska pura-pura fokus membaca novel di tangannya. Padahal, sejak tadi matanya terus mencuri pandang ke arah gadis di depannya.",
      },
      {
        type: "narration",
        text: "Gadis itu tampak sangat serius menatap buku tebalnya. Sesekali dia menyelipkan anak rambut yang jatuh ke belakang telinga. Gerakan sederhana yang entah kenapa membuat dada Alaska berdesir.",
      },
      {
        type: "narration",
        text: "Tiba-tiba, mata gadis itu naik, menangkap basah tatapan Alaska.",
      },
      { type: "dialog", character: "erine", text: "Ceritanya seru banget ya?" },
      { type: "dialog", character: "alaska", text: "Lumayan. Kenapa?" },
      {
        type: "dialog",
        character: "erine",
        text: "Nggak apa-apa sih. Cuma hebat aja kamu bisa baca buku kebalik kayak gitu.",
      },
    ],
    quiz: {
      id: "q-arc1-ch2",
      setup:
        " [ SYSTEM INTERRUPT ] Alaska panik! Waktu seolah membeku. Susun tag Paragraf (<p>) untuk mencairkan suasana dan melanjutkan adegan.",
      slots: ["___", "Sialan, batinku.", "___"],
      options: ["<p>", "<h1>", "</p>", "</h1>", "<br>"],
      correctAnswer: ["<p>", "</p>"],
      hint: "Gunakan tag standar untuk membuat sebuah paragraf teks biasa.",
    },
    rewardParagraph: [
      {
        type: "narration",
        text: "Wajah Alaska langsung terasa panas. Dia buru-buru memutar bukunya dengan canggung.",
      },
      {
        type: "narration",
        text: "Melihat tingkahnya, gadis itu tertawa pelan. Tawa yang sangat renyah, mengalahkan suara hujan di luar sana.",
      },
      {
        type: "dialog",
        character: "alaska",
        text: "Gue cuma... lagi ngecek kualitas cetakannya.",
      },
    ],
  },
  {
    id: "arc1-ch3",
    arcId: "arc-01",
    chapterNumber: 3,
    title: "Sebuah Nama",
    character: "narrator",
    paragraphs: [
      {
        type: "narration",
        text: "Tawa kecil itu sukses memecahkan kecanggungan di antara mereka. Dinding tak kasat mata di meja pojok itu seolah runtuh begitu saja.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Alasan yang bagus. Aku Erine, omong-omong.",
      },
      {
        type: "narration",
        text: "Gadis itu menyodorkan tangan kanannya melintasi meja. Ada bekas tinta pulpen biru di ujung jari telunjuknya.",
      },
      {
        type: "narration",
        text: "Alaska menatap tangan itu selama dua detik penuh sebelum menyambutnya.",
      },
      { type: "dialog", character: "alaska", text: "Alaska." },
      {
        type: "narration",
        text: "Kulitnya terasa hangat. Sangat kontras dengan udara dingin dari kaca jendela di sebelahnya.",
      },
    ],
    quiz: {
      id: "q-arc1-ch3",
      setup:
        " [ SYSTEM OVERRIDE ] Tensi romantis meningkat! Database memori membutuhkan struktur List (Daftar) untuk merekam momen ini. Lengkapi tag Unordered List (<ul>) dan List Item (<li>).",
      slots: ["___", "___", "Tangan yang hangat", "___", "___"],
      options: ["<ul>", "</ul>", "<li>", "</li>", "<b>"],
      correctAnswer: ["<ul>", "<li>", "</li>", "</ul>"],
      hint: "Buka daftar (<ul>) terlebih dahulu, lalu masukkan itemnya (<li>), tutup itemnya, lalu tutup daftarnya.",
    },
    rewardParagraph: [
      {
        type: "narration",
        text: "Alaska melepaskan jabatan tangan itu lebih lambat dari yang seharusnya.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Nama yang dingin untuk orang yang tangannya gampang keringetan.",
      },
      {
        type: "narration",
        text: "Erine tersenyum jahil, lalu kembali menunduk menatap bukunya seolah tidak terjadi apa-apa. Meninggalkan Alaska yang masih berusaha menetralkan detak jantungnya.",
      },
    ],
  },
  {
    id: "arc1-ch4",
    arcId: "arc-01",
    chapterNumber: 4,
    title: "Garis Bawah Sederhana",
    character: "alaska",
    paragraphs: [
      {
        type: "narration",
        text: "Setelah perkenalan singkat itu, perpustakaan kembali hening. Tapi rasanya jauh berbeda dari sebelumnya.",
      },
      {
        type: "narration",
        text: "Alaska memberanikan diri mencuri pandang lagi. Erine sedang menggarisbawahi sesuatu di buku cetaknya dengan stabilo kuning.",
      },
      {
        type: "narration",
        text: "Alisnya sedikit bertaut, dan dia menggigit pelan bibir bawahnya saat sedang berkonsentrasi. Alaska diam-diam mencatat ekspresi itu di kepalanya.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Kenapa ngeliatin terus? Ada yang aneh di muka aku?",
      },
      {
        type: "narration",
        text: "Erine bertanya tanpa mendongak dari bukunya.",
      },
    ],
    quiz: {
      id: "q-arc1-ch4",
      setup:
        " [ SYSTEM INTERRUPT ] Alaska ketahuan lagi! Berikan PENEKANAN pada alasannya menggunakan tag Emphasis (<em>) agar dia tidak terlihat konyol.",
      slots: ["Karena kamu", "___", "menarik", "___"],
      options: ["<strong>", "</strong>", "<em>", "</em>", "<i>"],
      correctAnswer: ["<em>", "</em>"],
      hint: "Gunakan tag <em> untuk memberikan penekanan miring pada kata 'menarik'.",
    },
    rewardParagraph: [
      {
        type: "dialog",
        character: "alaska",
        text: "Nggak ada. Cuma heran aja ada orang yang stabiloin buku perpus.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Ini buku aku sendiri, Alaska. Tuh lihat label namanya.",
      },
      {
        type: "narration",
        text: "Skakmat. Alaska mengutuk kebodohannya sendiri dalam hati, sementara Erine kembali menahan senyum.",
      },
    ],
  },
  {
    id: "arc1-ch5",
    arcId: "arc-01",
    chapterNumber: 5,
    title: "Bel Tanda Berpisah",
    character: "narrator",
    paragraphs: [
      {
        type: "narration",
        text: "Suara nyaring bel sekolah tanda perpustakaan akan ditutup memecah keheningan sore itu.",
      },
      {
        type: "narration",
        text: "Erine mendesah pelan, menutup bukunya dengan enggan, lalu mulai memasukkan barang-barangnya ke dalam tas ransel kanvasnya.",
      },
      {
        type: "narration",
        text: "Hujan di luar sudah reda, menyisakan langit senja kemerahan yang menembus masuk lewat jendela retak di samping mereka.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Yah, udah harus pulang. Padahal lagi seru.",
      },
      {
        type: "narration",
        text: "Alaska menatapnya. Ingin rasanya dia menahan gadis itu lima menit lagi. Atau lima jam lagi. Tapi dia tidak punya alasan apa-apa.",
      },
    ],
    quiz: {
      id: "q-arc1-ch5",
      setup:
        " [ SYSTEM OVERRIDE ] Jangan biarkan dia pergi begitu saja! Susun struktur Line Break (<br>) untuk memberi jeda waktu bagi Alaska memikirkan kalimat perpisahan yang keren.",
      slots: ["Sampai jumpa besok.", "___", "Itupun kalau hujan lagi."],
      options: ["<br>", "<hr>", "<break>", "</br>", "<line>"],
      correctAnswer: ["<br>"],
      hint: "Pilih tag yang sifatnya 'self-closing' untuk sekadar membuat baris baru tanpa jarak paragraf.",
    },
    rewardParagraph: [
      { type: "dialog", character: "alaska", text: "Besok... ke sini lagi?" },
      {
        type: "narration",
        text: "Erine yang sudah menyandang tasnya menghentikan langkah. Dia menoleh ke belakang, menatap Alaska dengan sorot mata yang sulit diartikan.",
      },
    ],
  },
  {
    id: "arc1-ch6",
    arcId: "arc-01",
    chapterNumber: 6,
    title: "Sebuah Janji Tersirat",
    character: "erine",
    paragraphs: [
      {
        type: "narration",
        text: "Bagi Erine, Alaska itu cowok yang aneh. Sok dingin, ketahuan baca buku terbalik, tapi tatapan matanya jujur.",
      },
      {
        type: "narration",
        text: "Dia melihat cowok itu berdiri dari kursinya, tampak gugup menunggu jawabannya.",
      },
      { type: "dialog", character: "erine", text: "Tergantung." },
      { type: "dialog", character: "alaska", text: "Tergantung apa?" },
      {
        type: "dialog",
        character: "erine",
        text: "Tergantung apakah besok meja ini masih kosong atau nggak.",
      },
    ],
    quiz: {
      id: "q-arc1-ch6",
      setup:
        " [ SYSTEM INTERRUPT ] Alaska butuh kejelasan! Tautkan janji mereka menggunakan tag Anchor (Link) agar Erine tahu Alaska akan selalu menunggu.",
      slots: ["___", "Aku yang akan kosongin meja ini", "___"],
      options: ["<a>", "</a>", "<link>", "</link>", "<href>"],
      correctAnswer: ["<a>", "</a>"],
      hint: "Gunakan tag anchor <a> untuk membuat sebuah tautan atau ikatan.",
    },
    rewardParagraph: [
      {
        type: "dialog",
        character: "alaska",
        text: "Gue bakal duduk di sini dari jam istirahat pertama kalau perlu.",
      },
      {
        type: "narration",
        text: "Jawaban itu meluncur begitu saja tanpa disaring. Erine mengerjapkan matanya, sedikit kaget, lalu senyumnya mengembang sempurna.",
      },
      {
        type: "dialog",
        character: "erine",
        text: "Oke, Alaska. Sampai ketemu besok.",
      },
    ],
  },
  {
    id: "arc1-ch7",
    arcId: "arc-01",
    chapterNumber: 7,
    title: "Sisa Wangi Vanilla",
    character: "narrator",
    paragraphs: [
      {
        type: "narration",
        text: "Erine berjalan menjauh, sosoknya perlahan menghilang di balik deretan rak ensiklopedia yang tinggi.",
      },
      {
        type: "narration",
        text: "Alaska menghempaskan punggungnya kembali ke sandaran kursi kayu. Dia menghela napas panjang, mencoba menetralkan degup jantungnya yang sedari tadi berantakan.",
      },
      {
        type: "narration",
        text: "Di atas meja, tepat di tempat Erine duduk tadi, sebuah stabilo kuning tertinggal.",
      },
      {
        type: "narration",
        text: "Alaska mengambilnya. Ujung plastiknya masih terasa hangat.",
      },
      {
        type: "narration",
        text: "Sore itu, hujan mungkin sudah reda. Tapi bagi Alaska, badai yang sesungguhnya baru saja dimulai.",
      },
    ],
    quiz: null, // Chapter penutup Arc 1, kasih user nafas lega tanpa kuis.
    rewardParagraph: [
      {
        type: "narration",
        text: "Arc 1 Selesai. Kamu telah mengamankan momen pertama mereka.",
      },
      {
        type: "narration",
        text: "Siapkan hatimu untuk Arc berikutnya: Pesan yang Tersimpan.",
      },
    ],
  },
];
