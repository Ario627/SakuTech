export type Arc = {
  id: string;
  title: string;
  description: string;
  targetSkill: string;
  totalChapters: number;
  difficulty: "starter" | "explorer" | "hacker";
};

export const arcs: Arc[] = [
  {
    id: "arc-01",
    title: "Pertemuan yang Tidak Sengaja",
    description:
      "Meja pojok perpustakaan itu biasanya kosong. Tapi di sore ini, Alaska harus berbagi tempat dengan seseorang yang senyumnya bikin dia lupa cara bernapas.",
    targetSkill: "Dasar Tag HTML & Elemen Teks",
    totalChapters: 7,
    difficulty: "starter",
  },
  {
    id: "arc-02",
    title: "Pesan yang Tersimpan",
    description:
      "Sepucuk kertas terlipat rapi di dalam buku paket sejarah. Alaska menemukan cara baru untuk mengobrol dengan Erine tanpa harus bersuara di tengah kelas yang hening.",
    targetSkill: "Atribut HTML & Link (Anchor Tag)",
    totalChapters: 6,
    difficulty: "starter",
  },
  {
    id: "arc-03",
    title: "Jalan Bareng yang Berantakan",
    description:
      "Rencana sepulang sekolah yang sudah disusun rapi mendadak hancur karena hujan. Mereka terjebak di halte berdua, dengan canggung yang menyelimuti dan detak jantung yang saling bersahutan.",
    targetSkill: "Dasar CSS & Pewarnaan (Styling)",
    totalChapters: 8,
    difficulty: "explorer",
  },
  {
    id: "arc-04",
    title: "Salah Paham di Ujung Senja",
    description:
      "Satu kalimat yang tak sengaja terdengar menghancurkan segalanya. Alaska menatap punggung Erine yang menjauh, bertanya-tanya apakah semua ini memang sebuah kesalahan dari awal.",
    targetSkill: "CSS Flexbox & Layouting",
    totalChapters: 7,
    difficulty: "explorer",
  },
  {
    id: "arc-05",
    title: "Klarifikasi yang Tertunda",
    description:
      "Menghindar bukan lagi pilihan. Di tengah riuhnya kantin, Alaska memberanikan diri melangkah maju. Ada kata maaf yang sudah terlalu lama tertahan di ujung lidah.",
    targetSkill: "Interaksi Dasar JavaScript (DOM)",
    totalChapters: 6,
    difficulty: "hacker",
  },
  {
    id: "arc-06",
    title: "Confess di Bawah Hujan",
    description:
      "Terkadang, kamu hanya butuh satu momen gila untuk jujur pada perasaanmu sendiri. Di bawah rintik hujan sore itu, Alaska akhirnya menyuarakan apa yang selama ini hanya bisa dia simpan.",
    targetSkill: "Logika Pengkondisian (If-Else) JS",
    totalChapters: 8,
    difficulty: "hacker",
  },
];

export function getArcById(id: string): Arc | undefined {
  return arcs.find((arc) => arc.id === id);
}
