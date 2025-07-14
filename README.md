# Better Social Media Hashtag Generator

A simple, stylish hashtag generator using Together AI and Netlify serverless functions.

## 📂 Structure

- `index.html` — the front-end (uses Tailwind CSS)
- `/netlify/functions/generate.js` — Netlify function to call Together AI securely
- `netlify.toml` — Netlify config

## 🚀 How to deploy

1. Upload this repo to GitHub.
2. Create a new site on [Netlify](https://app.netlify.com/), and link your GitHub repo.
3. Add your Together AI API key as an environment variable: