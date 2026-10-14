# Changelog

Semua perubahan penting pada proyek PWA Manajemen Keuangan Pribadi didokumentasikan di sini. Format berdasarkan [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0-mvp] - 2026-10-14
### Added
* Rilis perdana struktur MVP *offline-first* PWA.
* Modul basis data lokal berbasis IndexedDB (`js/db.js`).
* Engine kalkulasi Take-Home Pay dan aturan siklus 21-20 (`js/engine.js`).
* Logika penalti lembur otomatis jika terdeteksi *unpaid leave*.
* Kalkulator transfer multi-rekening dengan pemotongan otomatis biaya BI-FAST Rp 2.500 untuk Bank Mandiri.
* Dokumen pendukung `PRD.md` dan `CHANGELOG.md` di root direktori proyek.
