# Rentlyo Platform Admin

SaaS platform yönetim paneli. Yalnızca seed ile tanımlı platform admin kullanıcıları giriş yapabilir; kayıt (register) yoktur.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (renk / font / radius token’ları tek yerden)
- TanStack React Query
- React Hook Form + Zod

## Kurulum

```bash
cd rentlyo-admin
cp .env.local.example .env.local
npm install
npm run dev
```

Uygulama: [http://localhost:3001](http://localhost:3001)

Backend’in `http://localhost:5080` üzerinde çalışması gerekir. CORS için backend’de `PLATFORM_ADMIN_ORIGIN=http://localhost:3001` tanımlıdır.

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_API_URL` | Backend base URL (ör. `http://localhost:5080`) |

## Giriş (development seed)

Backend `PLATFORM_ADMIN_*` ayarlarından oluşturulur (UI’da hardcode edilmez):

- E-posta: `admin@rentlyo.local`
- Şifre: `ChangeMe!Platform1`

## Modüller

- **Dashboard** — tenant / lead özet kartları
- **Şirketler** — liste, detay, askıya al / aktifleştir, website aç-kapa
- **Leadler** — liste ve durum güncelleme (`New` / `Contacted` / `Closed`)

## Tasarım token’ları

Renk, tipografi, radius ve gölgeler: `src/styles/tokens.css`

Tailwind eşlemesi: `src/styles/globals.css` (`@theme inline`)
