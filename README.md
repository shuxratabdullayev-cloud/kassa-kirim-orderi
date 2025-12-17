# Naqd Pul Kirim Order Tizimi

Professional kassaga naqd pul kirimini boshqarish va kuzatish uchun zamonaviy web ilova.

🔗 **Demo**: [GitHub Pages Link](https://USERNAME.github.io/naqd-kirim/)

## 🎯 Funksionalliklar

### Asosiy Imkoniyatlar
- ✅ Naqd pul kirim orderini qabul qilish
- ✅ Qabul raqami avtomatik generatsiya (KK-2025-0001)
- ✅ To'lovchi ma'lumotlari (F.I.O, telefon)
- ✅ Summa va to'lov maqsadi
- ✅ Debit va kredit schyotlari (buxgalteriya hisobi)
- ✅ Orderlarni ko'rish, tahrirlash, o'chirish
- ✅ Qabul chop etish (print)

### Statistika Dashboard
- 📊 Bugungi kirim summasi
- 📅 Oylik kirim summasi
- 💰 Jami kirim summasi
- 📝 Orderlar soni

### Buxgalteriya Schyotlari

**Debit Schyotlari:**
- 5010 - Kassa (milliy valyuta)
- 5020 - Kassa (xorijiy valyuta)
- 5110 - Bankdagi hisob raqamdagi pul mablag'lari

**Kredit Schyotlari:**
- 4010 - Xaridorlar va buyurtmachilar
- 4210 - Xodimlarga berilgan ish haqi uchun bo'naklar
- 4220 - Xizmat safariga berilgan bo'naklar
- 4610 - Ta'sischilarning ustavdagi ulush bo'yicha qarzi
- 5110 - Bankdagi hisob raqamdagi pul mablag'lari (bankdan pul olinganda)
- 6630 - Ta'sischilardan ustavdagi ulush uchun qarzlar
- 8710 - Taqsimlanmagan foyda
- 9020 - Sotishdan daromad
- 9030 - Xizmat ko'rsatishdan daromad
- 9390 - Boshqa operatsion daromadlar

## 🚀 Ishga Tushirish

### Lokal Kompyuterda

1. Repository'ni clone qiling:
   ```bash
   git clone https://github.com/USERNAME/naqd-kirim.git
   cd naqd-kirim
   ```

2. `index.html` faylini brauzerda oching
3. Tayyor! Hech qanday qo'shimcha o'rnatish kerak emas

### GitHub Pages'da Deploy

1. GitHub'da repository yarating (Public)
2. Fayllarni yuklang:
   ```bash
   git init
   git add .
   git commit -m "Naqd pul kirim tizimi"
   git branch -M main
   git remote add origin https://github.com/USERNAME/naqd-kirim.git
   git push -u origin main
   ```

3. Repository Settings > Pages:
   - Source: "Deploy from a branch"
   - Branch: "main" / Folder: "/ (root)"
   - Save

4. Link tayyor: `https://USERNAME.github.io/naqd-kirim/`

## 💻 Texnologiyalar

- **HTML5** - Semantic markup
- **CSS3** - Modern styling, green theme
- **Vanilla JavaScript** - No dependencies
- **LocalStorage API** - Ma'lumotlarni saqlash

## 📝 Foydalanish

### 1. Kirim Qabul Qilish
1. Formani to'ldiring (to'lovchi, summa, debit/kredit schyotlari)
2. "Kirim Qabul Qilish" tugmasini bosing
3. Qabul raqami avtomatik beriladi

### 2. Qabul Chop Etish
1. Jadvalda "🖨️" tugmasini bosing
2. Qabul ma'lumotlarini ko'ring
3. "Chop Etish" tugmasini bosing

### 3. Statistika
Dashboard'da avtomatik ko'rsatiladi:
- Bugungi kirim
- Oylik kirim
- Jami kirim
- Orderlar soni

## 🎨 Dizayn Xususiyatlari

- Yashil rang sxemasi (pul kirim uchun)
- Dark mode
- Glassmorphism effects
- Smooth animations
- Professional kassa dizayni
- Responsive (mobil va desktop)

## 📱 Brauzer Qo'llab-quvvatlash

- Chrome (tavsiya etiladi)
- Firefox
- Safari
- Edge
- Opera

## 🔒 Ma'lumotlar Xavfsizligi

Ma'lumotlar faqat brauzeringizda LocalStorage'da saqlanadi. Hech qanday server yoki tashqi xizmatga yuborilmaydi.

## 📄 Litsenziya

MIT License - Erkin foydalanish uchun

## 🤝 Hissa Qo'shish

Pull request'lar qabul qilinadi! Katta o'zgarishlar uchun avval issue oching.

## 📧 Murojaat

Savollar yoki takliflar bo'lsa, issue oching yoki pull request yuboring.

---

**Eslatma**: Bu ilova to'liq offline ishlaydi va internet talab qilmaydi (faqat Google Fonts yuklanishi uchun).

**Versiya**: 1.0.0  
**Sana**: 2025-12-17
