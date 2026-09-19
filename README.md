# KawanKonten API (NestJS)

Backend contoh untuk platform KawanKonten — penghubung micro-influencer
dengan brand — mengimplementasikan fitur inti dari riset awal:
Smart Matching, Dynamic Media Kit & Rate Card, Rating & Review, dan
Pembayaran Aman (escrow).

> Catatan: data disimpan **in-memory** (array di dalam service) supaya
> proyek ini bisa langsung dijalankan tanpa setup database. Untuk
> produksi, ganti setiap `Service` agar memakai TypeORM/Prisma ke
> database sungguhan (PostgreSQL disarankan).

## Instalasi

```bash
npm install
npm run start:dev
```

Server berjalan di `http://localhost:3000`.

## Struktur modul

```
src/
  creators/   -> profil kreator, media kit & rate card otomatis
  brands/     -> profil brand
  projects/   -> campaign yang diposting brand (dengan filter kategori)
  matching/   -> Smart Matching: mencocokkan creator <-> project
  payments/   -> escrow: dana ditahan sampai konten disetujui
  ratings/    -> rating & ulasan dua arah
```

## Alur pemakaian (contoh)

1. **Buat kreator** — rate card otomatis dihitung dari followers & engagement

```bash
curl -X POST http://localhost:3000/creators \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rani Anindita",
    "handle": "@raniandtales",
    "category": ["Kecantikan", "Gaya Hidup"],
    "followers": 24500,
    "engagementRate": 6.8
  }'
```

2. **Buat brand**

```bash
curl -X POST http://localhost:3000/brands \
  -H "Content-Type: application/json" \
  -d '{ "name": "Kopi Rakyat", "industry": "F&B" }'
```

3. **Brand posting project**

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{
    "brandId": "<id brand>",
    "title": "Promosi menu baru",
    "category": ["Kecantikan"],
    "budgetMin": 700000,
    "budgetMax": 1300000,
    "brief": "1 posting feed + 2 story tentang produk baru kami"
  }'
```

4. **Smart Matching** — cari kreator yang cocok untuk project tsb

```bash
curl http://localhost:3000/matching/projects/<id project>
```

5. **Brand memilih salah satu kreator dari hasil matching**

```bash
curl -X PATCH http://localhost:3000/matching/projects/<id project>/select/<id creator>
```

6. **Brand membayar (dana ditahan / escrow)**

```bash
curl -X POST http://localhost:3000/payments \
  -H "Content-Type: application/json" \
  -d '{ "projectId": "<id project>", "amount": 900000 }'
```

7. **Setelah konten disetujui, dana dicairkan**

```bash
curl -X PATCH http://localhost:3000/payments/<id payment>/release
```

8. **Brand memberi rating ke kreator**

```bash
curl -X POST http://localhost:3000/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "<id project>",
    "fromRole": "brand",
    "toCreatorId": "<id creator>",
    "score": 5,
    "comment": "Kontennya bagus dan tepat waktu"
  }'
```

## Struktur biaya (model bisnis)

Didefinisikan di `src/payments/payments.service.ts`:
- **Platform fee**: Rp 5.000 flat per transaksi
- **Commission fee**: 10% dari nilai project

Ubah konstanta `PLATFORM_FEE_FLAT` dan `COMMISSION_FEE_RATE` sesuai
kebutuhan bisnis sebenarnya.
