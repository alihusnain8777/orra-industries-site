# ORRA Industries Website — Live karne ka tareeqa

Is folder mein poori website hai: public pages (Google ke liye), Admin Panel (`/admin`) aur Buyer Panel (`/account`).
Database aur login **Supabase** par, hosting **Vercel** par. Dono free plan par chal jaate hain.

Kul waqt: takreeban 30–40 minute.

---

## Step 1 — GitHub par code daalein

1. https://github.com par account banayein (agar nahi hai).
2. Upar **+** → **New repository** → naam `orra-industries-site` → **Private** → **Create repository**.
3. Naye repository page par **"uploading an existing file"** link par click karein.
4. Is zip ko apne computer par **unzip** karein, aur andar ki saari files aur folders (`api`, `public`, `supabase`, `package.json`, `vercel.json`, waghera) drag karke upload karein → **Commit changes**.

## Step 2 — Supabase (database)

**Yeh ho chuka hai.** Database `orra-industries` aap ke Supabase account mein ban chuka hai: tables, security rules, photo storage, aur 32 products, 6 guides aur ORRA ki settings sab daal di gayi hain. Database ka address aur public key code mein pehle se lagi hai.

(Sirf apni maloomat ke liye: `supabase/` folder mein woh SQL files hain jo chalayi gayi.)

## Step 3 — Vercel par website chalayein

1. https://vercel.com → **Sign up with GitHub**.
2. **Add New → Project** → apni `orra-industries-site` repository → **Import**.
3. **Framework Preset: Other** rehne dein. Koi environment variable daalne ki zaroorat nahi.

4. **Deploy**. 1 minute mein aap ko link milega, jaise `orra-industries-site.vercel.app`. Yahi aap ki live website hai.

## Step 4 — Apne aap ko Admin banayein

1. Website par `/account` kholein → **Create account** (apni email aur password).
2. Claude ko apni email batayein, woh aap ko admin bana dega. (Ya khud: Supabase → **SQL Editor** → `supabase/3-make-admin.sql` mein apni email likh kar **Run**.)
3. Website par `/admin` kholein. Ab aap Admin Panel mein hain.

Kisi aur staff member ko admin banana ho to wo bhi account banaye, phir uski email ke saath Step 4.2 dobara chalayein.

## Step 5 — Google par laayein

1. https://search.google.com/search-console → **Add property** → **URL prefix** → apna Vercel link (jaise `https://orra-industries-site.vercel.app`).
2. Verification ke liye **HTML tag** chunein. Us mein `content="..."` wali value copy karein.
3. Vercel → Project → **Settings → Environment Variables** → naya variable:
   - `GOOGLE_SITE_VERIFICATION` = woh copy ki hui value
   → Save → **Deployments** mein upar wali deployment par **⋯ → Redeploy**.
4. Search Console mein wapas **Verify** dabayein.
5. Baen menu **Sitemaps** → `sitemap.xml` likh kar **Submit**.
6. **URL Inspection** mein homepage ka link daal kar **Request indexing** dabayein.

Google ko pages dikhane mein aam taur par **kuch din se 2–3 hafte** lagte hain. Yeh normal hai.

## Baad mein: apna domain

Jab ORRA Industries ka domain khareed lein (jaise `orraindustries.com`): Vercel → Project → **Settings → Domains** → domain likhein → Vercel jo DNS records bataye, woh domain wali company mein daal dein. Phir environment variable `SITE_URL` = `https://www.orraindustries.com` add karke redeploy karein, aur Search Console mein nayi property add karein.

---

## Website mein kya kya hai

- **Google-friendly pages**: har page ka apna URL, title, description, canonical, Open Graph, Organization aur Product schema, `sitemap.xml`, `robots.txt`.
- **Admin Panel** (`/admin`): products, photos, categories, RFQs (stage + quotation + buyer ko message), messages, buyers, homepage content, guides, testimonials, settings & SEO, activity log.
- **Buyer Panel** (`/account`): apne quotes ka status, admin ke replies, RFQ cart, saved products, profile.
- **Bina account ke** bhi visitor RFQ form aur contact form bhej sakta hai; woh seedha Admin Panel mein aata hai.

## Live karne se pehle khud check karein

Yeh cheezein maine apne andaze se rakhi hain, Admin Panel se sahi kar dein:
- Products ke **GSM, fabric** aur size chart ki values
- **Terms of Business** (deposit, payment, returns) aur **Privacy Policy** ki text (`public/app.js` mein `pgLegal`)
- Factory size, staff aur capacity (Admin → Homepage & pages; khaali chhodenge to website par nahi dikhte)
- Business hours aur LinkedIn link (Admin → Settings; khaali ho to nahi dikhte)
- Testimonials sirf asli clients ke daalein

## Local par chalana (developer ke liye)

```
SUPABASE_URL=... SUPABASE_ANON_KEY=... node dev-server.js
```
phir http://localhost:3000 kholein.
