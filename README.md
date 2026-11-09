# Ukenthiran — Freelance Frontend Developer Portfolio

A static portfolio built with **HTML5, CSS3, Bootstrap 5 and vanilla JavaScript**. No React, Node.js, npm or build step is required.

## Files
- `index.html` — all page content and form markup
- `style.css` — responsive styling, layouts and CSS animations
- `script.js` — scroll reveals, WhatsApp links and multi-step form
- `README.md` — setup and deployment guide

## 1. Preview locally
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For a more reliable local preview, use VS Code's Live Server extension.

The page loads Bootstrap, Bootstrap Icons and Google Fonts from CDNs, so an internet connection is needed for those assets.

## 2. Make the enquiry form send email
The form uses Web3Forms (free tier; check the provider's current limits and terms).

1. Visit https://web3forms.com/.
2. Create an access key using the inbox `a.ukenthiran@gmail.com`.
3. Open `script.js`.
4. Replace:
   `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE`
   with your actual access key.
5. Submit a test enquiry from your published website and confirm it arrives in your inbox.

The recipient is configured when you create the Web3Forms access key. Do not publish the portfolio until you have tested delivery.

## 3. Configure WhatsApp
In `script.js`, replace:
`91XXXXXXXXXX`
with your WhatsApp number in international format, digits only. Example format: `919876543210` (do not use this example number).

## 4. Update portfolio content
Edit `index.html`:
- Replace the three illustrative concept projects with your genuine projects and screenshots.
- Update the About section and skills as your experience grows.
- Add real LinkedIn/GitHub profile links if desired.
- Update service descriptions, budget ranges and contact details.

Do not describe the sample concept projects as paid client work or testimonials.

## 5. Free deployment on Cloudflare Pages
This is a static website, so no build command is needed.

1. Create a GitHub account at https://github.com/ and create a new repository.
2. Upload `index.html`, `style.css`, `script.js` and `README.md` to the repository root.
3. Sign in at https://dash.cloudflare.com/.
4. Go to **Workers & Pages → Create → Pages → Connect to Git**.
5. Select your GitHub repository.
6. Set:
   - Framework preset: **None**
   - Build command: **(leave blank)**
   - Build output directory: `/` (or the root directory, depending on the dashboard prompt)
7. Deploy.

Cloudflare will provide a `*.pages.dev` address. You do not need to buy a domain to publish. Check Cloudflare's current Pages plan and usage terms before launch.

## Notes
- The site is responsive and includes reduced-motion support.
- The contact form sends data directly from the browser to Web3Forms. The access key is visible in client-side code; use the provider's recommended domain restrictions / spam protection options where available.
- A successful browser response means the form provider accepted the submission; still verify the email arrives.
