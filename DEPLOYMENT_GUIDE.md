# Deploying FLIGHT99 (Next.js & Supabase)

To get your application live and fully functional, follow these steps to deploy on Vercel and securely attach your Supabase database.

## Option 1: Vercel (Highly Recommended)
Vercel is the easiest way to deploy Next.js apps and offers the best integration with GitHub.

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and sign up using your **GitHub** account.
2.  **Add New Project**:
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub profile.
    - Find and **Import** the `FLIGHT99` repository.
3.  **Configure Environment Variables (CRITICAL STEP)**:
    - Before clicking deploy, expand the **Environment Variables** section.
    - You must add your Supabase credentials here so the live site can talk to your database.
    - Name: `NEXT_PUBLIC_SUPABASE_URL` | Value: *(Paste your Supabase Project URL)*
    - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Value: *(Paste your Supabase anon/public key)*
    - Click **Add** for both.
4.  **Configure Build**:
    - **Framework Preset**: `Next.js` (should be auto-selected).
    - **Root Directory**: `./` (default).
5.  **Deploy**: Click **Deploy**.
    - If you see a "Failed to fetch" error on the live site, double-check that your Environment Variables were entered correctly without any typos or extra spaces.

## Option 2: Netlify
Netlify is another excellent free option, but ensure you also add the environment variables during setup.

1.  **Sign Up/Login**: Go to [netlify.com](https://netlify.com) and sign up using **GitHub**.
2.  **Add New Site**:
    - Click **"Add new site"** -> **"Import an existing project"**.
    - Select **GitHub**.
    - Authorize Netlify and select the `FLIGHT99` repository.
3.  **Configure Environment Variables**:
    - Click on **Show advanced** and add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4.  **Configure Build**:
    - **Build Command**: `next build`
    - **Publish Directory**: `.next`
5.  **Deploy**: Click **Deploy Site**.
