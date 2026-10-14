# Product Requirements Document (PRD): PWA Manajemen Keuangan Pribadi (MVP)

## 1. Overview & Tujuan Produk
Aplikasi *Progressive Web App* (PWA) offline-first untuk pencatatan dan pengelolaan keuangan pribadi berdasarkan siklus penggajian unik (tanggal 21 bulan berjalan s.d. tanggal 20 bulan berikutnya).

## 2. Aturan Bisnis & Spesifikasi Fungsional

### A. Siklus Pembukuan (Billing Cycle)
* Periode anggaran terkunci otomatis dari tanggal **21** bulan `N-1` sampai tanggal **20** bulan `N`.

### B. Komponen Pendapatan & Potongan
* **Gaji Pokok**: Rp 5.161.769
* **Uang Makan**: Rp 12.000 × Jumlah Hari Kerja Efektif
* **Dana Tambahan**: Rp 1.000.000
* **Potongan Wajib**:
  * BPJS Kesehatan: 1% dari Gaji Pokok
  * JHT (Jaminan Hari Tua): 2% dari Gaji Pokok
  * Jaminan Pensiun: 1% dari Gaji Pokok
* **Potongan Unpaid Leave & Penalti Lembur**:
  * Potongan harian dihitung proporsional dari Gaji Pokok / 22 hari kerja.
  * Aturan Lembur: Jika dalam blok 6 hari kerja terdapat $\ge 1$ hari *unpaid leave*, jatah lembur (standar Rp 250.000 / 2.5 jam) otomatis hangus menjadi Rp 0.

### C. Alokasi Pengeluaran Rutin
* **Kebutuhan Istri & Anak**: Rp 2.700.000 s.d. Rp 3.000.000 (Rekening BCA Istri)
* **Tabungan Darurat**: Rp 250.000
* **Cicilan Service Kendaraan**: Rp 250.000
* **Kasbon Koperasi**: Rp 500.000
* **Iuran Koperasi**: Rp 100.000 (diterapkan setiap 2 bulan sekali)

### D. Manajemen Rekening & Transfer
* **BCA (Utama & Istri)**: Biaya transfer antar BCA Rp 0.
* **Bank Mandiri**: Setiap transaksi transfer dikenakan dan dicatat otomatis biaya admin **BI-FAST sebesar Rp 2.500**.

## 3. Spesifikasi Teknis MVP
* **Frontend**: Vanilla JavaScript (ES6+), HTML5, Tailwind CSS.
* **Database**: IndexedDB (`db_keuangan_pribadi` v1.0).
* **Offline Capability**: Service Worker (`sw.js`).
