/* ============================================================
   LIRIK LAGU ANGGOTA — isi sendiri di sini.
   Kunci = nama anggota persis seperti di script.js.

   Tiap baris boleh berupa:
     "teks lirik"                                  → polos
     { l:"lirik", tr:"terjemahan", ro:"romaji" }   → dengan terjemahan/romaji (untuk lagu Jepang)
     { t:12.5, l:"lirik", tr:"terjemahan" }        → t = detik lagu; lirik menyala & auto-scroll
                                                      saat lagu sampai detik itu (klik baris = loncat ke detik itu)
   Kalau tidak ada "t", lirik tampil statis (bisa di-scroll).
   Tombol "terjemahan" muncul otomatis kalau ada baris yang punya "tr".
   ============================================================ */
window.LYRICS = {
  "Zen Auladi":                  { lines: [{ t:1:23, l:"..." }] },
  "Billy Jonas Wijaya":          { lines: "assets/lyrics/billy.txt" },
  "Pandu Satrio":                { lines: [ ] },
  "M. Naufal Ariadiansyah":      { lines: [ ] },
  "M. Faris Nur Rizqi":          { lines: [ ] },
  "Althafian Rizqullah Susilo":  { lines: [ /* lagu Jepang: pakai { t:.., l:"jepang", ro:"romaji", tr:"terjemahan" } */ ] },
  "Muhamad Kiram Albara":        { lines: [ ] },
  "Muhammad Nazmy Syarief":      { lines: [ ] },
  "Syafi":                       { lines: [ ] }
};
