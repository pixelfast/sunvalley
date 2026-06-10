# SunValley Landscaping — Website

A warm, family-business-style landscaping website for Phoenix, AZ.

## File Structure

```
sunvalley/
├── index.html          Main page (all sections)
├── css/
│   └── style.css       All styles
├── js/
│   └── main.js         Slideshow, nav, form handling
├── php/
│   └── contact.php     Server-side contact form mailer
├── images/             Drop your photos here (see below)
└── README.md
```

## Required Images

Place these photos in the `/images/` folder. Recommended free sources:
- https://unsplash.com (search: landscaping, arizona garden, backyard patio)
- https://pexels.com

| Filename           | What it shows                         | Recommended size |
|--------------------|---------------------------------------|------------------|
| slide1.jpg         | Beautiful lawn / front yard           | 1920×1080px      |
| slide2.jpg         | Landscape design / garden plants      | 1920×1080px      |
| slide3.jpg         | Patio / hardscaping                   | 1920×1080px      |
| about-team.jpg     | Team photo or completed project       | 800×600px        |

Until you have real photos, the slides will show as a solid olive green (which looks fine).

## Setup

### 1. Configure the contact form
Edit `php/contact.php` and change these two lines:
```php
$to_email   = 'hello@sunvalleyaz.com';   // your real email
$from_email = 'noreply@sunvalleyaz.com'; // your domain email
```

### 2. Upload via FTP
Upload the entire `sunvalley/` folder to your hosting account's `public_html/` 
(or a subdirectory if this isn't the root site).

Your structure on the server should look like:
```
public_html/
├── index.html
├── css/style.css
├── js/main.js
├── php/contact.php
└── images/...
```

### 3. Test the contact form
Fill out the form on the live site and confirm you receive the email.
If email doesn't arrive, check your cPanel → Email → Track Delivery.

---

## Git Workflow (recommended)

### First-time setup
```bash
cd sunvalley
git init
git add .
git commit -m "Initial site build"
```

### Your day-to-day workflow
```bash
# 1. Make your changes in a text editor

# 2. Check what changed
git status

# 3. Stage and save a snapshot
git add .
git commit -m "Add real team photo and update phone number"

# 4. See what files changed since last deploy (helpful for FTP)
git diff HEAD~1 --name-only
```

### Before making big changes
```bash
# Always commit your working state first!
git add .
git commit -m "Working version before redesigning services section"

# Now experiment freely — you can always get back with:
git checkout -- .
```

---

## Customization Checklist

- [ ] Replace placeholder photos in `/images/`
- [ ] Update phone number in `index.html` (search: `602-555-0173`)
- [ ] Update email in `index.html` and `php/contact.php`
- [ ] Update trust bar stats (years, customer count)
- [ ] Replace placeholder customer reviews with real ones
- [ ] Add real Google Maps embed in the contact section (optional)
- [ ] Add your Google Analytics or tracking code (optional)
