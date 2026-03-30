# Moving Sale 🏠✈️

A beautiful, self-hosted moving sale website. Buyers browse listings and express interest — you get email notifications and can manage everything from an admin panel.

**Stack:** React + Vite + Firebase (Firestore + Storage) + EmailJS + GitHub Pages

---

## Quick Setup (15 minutes)

### 1. Firebase Setup (~5 min)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** → name it `moving-sale` → create
3. Go to **Project Settings** (gear icon) → scroll to **"Your apps"** → click **Web** (`</>`)
4. Register app name: `moving-sale` → copy the `firebaseConfig` object
5. Paste config values into `src/config/firebase.js`

**Enable Firestore:**
- Left sidebar → **Build** → **Firestore Database** → **Create database**
- Start in **test mode** (open for 30 days — fine for a moving sale)
- Choose region closest to you (us-central1)

**Enable Storage:**
- Left sidebar → **Build** → **Storage** → **Get started**
- Start in **test mode**

### 2. EmailJS Setup (~5 min)

1. Go to [EmailJS](https://www.emailjs.com) → create free account
2. **Add Email Service:** Email Services → Add New Service → Gmail → connect your Gmail
3. **Create Template:** Email Templates → Create New Template
   - **Subject:** `🏷️ Moving Sale Interest: {{item_title}}`
   - **Body:**
     ```
     New interest from {{from_name}}!

     Item: {{item_title}} ({{item_price}})
     Email: {{from_email}}
     Phone: {{phone}}
     Message: {{message}}
     ```
   - **To Email:** sherel.crasta@gmail.com
   - **CC:** idisanimesh@gmail.com
4. Copy your **Service ID**, **Template ID**, and **Public Key** (from Account → General)
5. Paste into `src/config/emailjs.js`

### 3. Install & Run Locally

```bash
cd /Users/animeshsrivastava/Documents/personal/move_sales_website
npm install
npm run dev
```

Open http://localhost:5173/moving-sale/ in your browser.

### 4. Deploy to GitHub Pages

```bash
# Initialize git and push
git init
git add .
git commit -m "Initial commit: moving sale website"

# Create repo on GitHub named "moving-sale", then:
git remote add origin https://github.com/YOUR_USERNAME/moving-sale.git
git branch -M main
git push -u origin main
```

Then in your GitHub repo:
1. Go to **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. The workflow will auto-deploy on every push to `main`

Your site will be live at: `https://YOUR_USERNAME.github.io/moving-sale/`

---

## Usage

- **Admin login password:** `bugb2026`
- **Add items:** Login → Admin → Add Item (with photos, price, category)
- **Manage inquiries:** Admin → Inquiries (mark read, reply, reserve items)
- **Buyers:** Browse → Click item → Fill interest form → Email sent automatically

## Admin Password

To change the admin password, edit `src/components/LoginView.jsx` line 4.

## Free Tier Limits (more than enough for a moving sale)

| Service | Free Tier |
|---------|-----------|
| Firebase Firestore | 50K reads/day, 20K writes/day |
| Firebase Storage | 5 GB storage, 1 GB/day downloads |
| EmailJS | 200 emails/month |
| GitHub Pages | Unlimited static hosting |
