# Deploying FLIGHT99 for Testing & Preview

Since you have already pushed your code to GitHub, deploying your application is very simple. Here are the best free options for hosting your Vite React app.

## Option 1: Vercel (Highly Recommended)
Vercel is the easiest way to deploy React apps and offers the best integration with GitHub.

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and sign up using your **GitHub** account.
2.  **Add New Project**:
    - Click **"Add New..."** -> **"Project"**.
    - Select your GitHub profile.
    - Find and **Import** the `FLIGHT99` repository.
3.  **Configure**:
    - Vercel will automatically detect that you are using Vite.
    - **Framework Preset**: `Vite` (should be auto-selected).
    - **Root Directory**: `./` (default).
    - **Build Command**: `npm run build` (default).
    - **Output Directory**: `dist` (default).
4.  **Deploy**: Click **Deploy**.
    - Within a minute, you will get a live URL (e.g., `flight99.vercel.app`).
    - **Bonus**: Every time you push changes to your `main` branch on GitHub, Vercel will automatically rebuild and update your live site!

## Option 2: Netlify
Netlify is another excellent free option.

1.  **Sign Up/Login**: Go to [netlify.com](https://netlify.com) and sign up using **GitHub**.
2.  **Add New Site**:
    - Click **"Add new site"** -> **"Import an existing project"**.
    - Select **GitHub**.
    - Authorize Netlify and select the `FLIGHT99` repository.
3.  **Configure**:
    - **Build Command**: `npm run build`
    - **Publish Directory**: `dist`
4.  **Deploy**: Click **Deploy Site**.

## Option 3: GitHub Pages
Since you are already on GitHub, you can use GitHub Pages. However, for React apps with client-side routing (like `react-router-dom`), it requires a bit of extra configuration to handle 404s on refresh.

If you prefer this route, let me know, and I can walk you through the setup.

---

**My Recommendation:** Use **Vercel** or **Netlify**. They handle single-page applications (SPAs) perfectly out of the box with zero configuration.
