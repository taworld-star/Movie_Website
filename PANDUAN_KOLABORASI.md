# 🚀 Panduan Kolaborasi Tim - Movie Website

## **Alur Kerja Cepat (Fitur 2 Orang)**

---

### **1️⃣ Setup Awal (Lakukan 1x)**

```bash
git clone <url-repository>
cd Movie_Website
git config user.name "Nama Anda"
git config user.email "email@anda.com"
```

---

### **2️⃣ Membuat Branch untuk Fitur Baru**

**Anda (Fitur 1):**
```bash
git checkout main
git pull origin main
git checkout -b feature/fitur-1
```

**Teman Anda (Fitur 2):**
```bash
git checkout main
git pull origin main
git checkout -b feature/fitur-2
```

> **Penting:** Setiap orang harus punya branch berbeda, jadi tidak ada konflik!

---

### **3️⃣ Kerjakan Fitur di Branch Masing-masing**

Lakukan coding di file yang sudah didiskusikan. Contoh divisi:

| Anda (Fitur 1) | Teman (Fitur 2) |
|---|---|
| `app.js` - Logic fitur 1 | `apiTransaction.js` - API |
| `index.html` - UI fitur 1 | `style.css` - Styling |

---

### **4️⃣ Commit & Push Berkala**

Jangan tunggu semuanya selesai, commit 2-3 kali per sesi:

```bash
# Cek file yang berubah
git status

# Tambah file
git add .

# Commit dengan pesan deskriptif
git commit -m "feat: nama fitur singkat"

# Push ke branch Anda
git push origin feature/fitur-1  (atau feature/fitur-2)
```

**Contoh pesan commit yang baik:**
```
feat: Tambah form login
fix: Perbaiki validasi email
docs: Update README
refactor: Reorganisasi kode
```

---

### **5️⃣ Sync Perubahan Teman**

Jika ingin tahu apa yang dikerjakan teman:

```bash
# Download info terbaru
git fetch origin

# Lihat commit teman
git log origin/feature/fitur-2 --oneline

# Lihat perubahan file teman
git diff feature/fitur-1 origin/feature/fitur-2
```

---

### **6️⃣ Update dari Main (Jika Ada Perubahan)**

```bash
# Update main branch
git pull origin main

# Merge ke branch Anda
git merge main

# Jika ada konflik, resolve (lihat bagian Troubleshooting)
```

---

### **7️⃣ Testing Sebelum Merge**

Sebelum merge ke main:

```bash
# Pastikan tidak ada error
npm start          (atau jalankan app Anda)

# Test fitur di browser
# Pastikan tidak ada bug

# Commit jika ada perbaikan
git add .
git commit -m "fix: perbaikan minor"
git push origin feature/fitur-anda
```

---

### **8️⃣ Merge ke Main**

**Opsi 1: Via GitHub/GitLab (Recommended)**
1. Push final commit: `git push origin feature/fitur-1`
2. Buka GitHub/GitLab → **Create Pull Request (PR)**
3. Beri deskripsi singkat fitur yang dibuat
4. Teman review code Anda
5. Click **Merge** jika approve
6. Delete branch yang sudah merged

**Opsi 2: Local Command**
```bash
git checkout main
git pull origin main
git merge feature/fitur-1
git push origin main
git branch -d feature/fitur-1
git push origin --delete feature/fitur-1
```

---

## **🔴 Hal yang HARUS Dihindari**

❌ Edit file yang sedang dikerjakan teman  
❌ Push ke branch main langsung tanpa review  
❌ Lupa commit dan push (data bisa hilang)  
❌ Merge ke main sebelum testing  
❌ Tidak komunikasi siapa kerjain apa  

---

## **💬 Komunikasi Tim**

**Sebelum mulai**, jelaskan ke teman:
```
"Aku kerjain Fitur 1: login form (index.html & app.js)"
"Aku kerjain Fitur 2: API transaction (apiTransaction.js & style.css)"
```

**Saat update:**
- Kasih tahu teman setiap kali push
- Jika ada perubahan file bersama, diskusi dulu
- Report bug di group chat

---

## **⚠️ Troubleshooting**

### **Push Ditolak (Teman sudah push lebih dulu)**
```bash
git pull origin feature/fitur-anda  # Pull dulu
git push origin feature/fitur-anda  # Baru push
```

### **Ada Konflik saat Merge**
```bash
# Git akan tunjuk file mana yang konflik
# Buka file tersebut, hapus marker:
# <<<<<<< HEAD
# xxxxxxx
# =======
# yyyyy
# >>>>>>> branch-teman

# Pilih kode yang benar atau gabung keduanya
# Kemudian:
git add .
git commit -m "resolve: selesaikan konflik"
git push
```

### **Lupa Branch Mana yang Sedang Dikerjakan**
```bash
git branch          # Cek branch lokal
git branch -a       # Cek semua branch (lokal + remote)
```

### **Mau Batalkan Commit Terakhir (Belum Push)**
```bash
git reset --soft HEAD~1
```

### **Mau Lihat File Apa Saja yang Berubah**
```bash
git status          # Ringkas
git diff            # Detail perubahan
```

---

## **📋 Checklist Sebelum Merge**

- ✅ Semua file sudah di-commit
- ✅ Tidak ada error di console
- ✅ Sudah test fitur di browser
- ✅ Branch sudah up-to-date dengan main (`git pull origin main`)
- ✅ Teman sudah review (jika ada PR)
- ✅ Tidak ada konflik

---

## **🔗 Command Cheat Sheet**

```bash
# Branch Management
git branch                          # Cek branch sekarang
git branch -a                       # Cek semua branch
git checkout -b feature/nama        # Buat & switch branch
git checkout main                   # Switch ke main
git branch -d feature/nama          # Hapus branch lokal
git push origin --delete feature/nama  # Hapus di remote

# Pull & Push
git pull origin main                # Update main
git push origin feature/fitur-anda  # Push branch Anda
git fetch origin                    # Download info terbaru

# Commit
git status                          # Lihat perubahan
git add .                           # Add semua file
git add file.js                     # Add file tertentu
git commit -m "pesan"               # Commit
git log --oneline -5                # Lihat 5 commit terakhir

# Merge & Resolve
git merge main                      # Merge main ke branch sekarang
git diff feature/fitur-2            # Bandingkan dengan branch lain
```

---

## **📝 Workflow Singkat (Repeat)**

```
1. git checkout -b feature/fitur-anda          ← 1x di awal
2. [Edit files & coding]
3. git status
4. git add .
5. git commit -m "feat: deskripsi"
6. git push origin feature/fitur-anda
7. Repeat 2-6 sampai selesai fitur
8. Create PR di GitHub/GitLab
9. Teman review & approve
10. Merge ke main
11. Delete branch
```

---

## **✨ Tips Sukses Kolaborasi**

1. **Commit Sering** - Jangan tunggu semuanya selesai
2. **Push Rutin** - Aman dari data loss
3. **Komunikasi Jelas** - Siapa kerjain file apa
4. **Test Sebelum Merge** - Hindari bug di main
5. **Review Bersama** - Double check sebelum merge
6. **Dokumentasi** - Update README/docs saat ada fitur baru

---

**Selamat mengembangkan! Jika ada pertanyaan, silakan tanya. 🎬✨**
