# 3G Real Estate — Non-Coder Maintenance Guide

> This guide is written for non-technical users. No coding knowledge required.

---

## Table of Contents
1. [Adding Analytics (Google, Clarity, etc.)](#1-adding-analytics)
2. [Publishing Content to Live Site](#2-publishing-content)
3. [SEO Settings (Title, Description, Keywords)](#3-seo-settings)
4. [Social Media Links](#4-social-media-links)
5. [Contact Information](#5-contact-information)
6. [When to Ask a Developer](#6-when-to-ask-developer)

---

## 1. Adding Analytics (Google, Clarity, etc.)

**File to edit:** `src/lib/site-config.ts`

**How to add tracking tools:**

### Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com) → Admin → Data Streams
2. Copy your Measurement ID (looks like `G-ABC123DEF0`)
3. Open `src/lib/site-config.ts`
4. Find the `analytics` section
5. Paste your ID on the `googleAnalyticsId` line:
```
googleAnalyticsId: "G-ABC123DEF0",
```

### Microsoft Clarity (Heatmaps & Recordings)
1. Go to [Microsoft Clarity](https://clarity.microsoft.com) → Settings
2. Copy your Project ID
3. Paste it on the `microsoftClarityId` line:
```
microsoftClarityId: "your-project-id",
```

### Google Tag Manager
1. Go to [Tag Manager](https://tagmanager.google.com)
2. Copy your Container ID (looks like `GTM-ABC1234`)
3. Paste it:
```
googleTagManagerId: "GTM-ABC1234",
```

### Facebook Pixel
```
facebookPixelId: "123456789012345",
```

**To disable a tool:** Leave the value empty ` "" ` or add `//` before the line to comment it out.

**After making changes:** Deploy the site (see Section 2).

---

## 2. Publishing Content to Live Site

### What is Publishing?
When you add/edit properties, blogs, or communities in the admin panel, the live website caches (stores) the old version for speed. Publishing clears this cache so visitors see the latest content.

### How to Publish
1. Log into your **Admin Dashboard**
2. Scroll to the **"Publish to Live Site"** card on the right side
3. Click the relevant button:
   - **All Properties** — After adding/editing properties
   - **Communities** — After adding/editing communities
   - **Blog Articles** — After publishing blog posts
   - **Homepage** — After any major changes
4. Wait 2-3 seconds for the green success message

### Auto-Revalidation
The site also automatically refreshes every:
- **Homepage:** 1 minute
- **Properties:** 1 minute
- **Blog:** 5 minutes
- **Communities:** 5 minutes

So even if you forget to publish, changes appear within 5 minutes.

---

## 3. SEO Settings

**File to edit:** `src/lib/site-config.ts`

### Edit Default SEO Values:
```typescript
seo: {
  defaultTitle: "Your New Title Here",
  defaultDescription: "Your new description here...",
  defaultKeywords: "keyword1, keyword2, keyword3",
  ogImage: "/og-image.jpg",  // Social share image
  twitterHandle: "@yourhandle",
}
```

### SEO Best Practices:
- **Title:** Keep under 60 characters, include "Dubai" + main keyword
- **Description:** Keep under 160 characters, compelling call-to-action
- **Keywords:** 5-10 relevant terms, comma-separated

---

## 4. Social Media Links

**File to edit:** `src/lib/site-config.ts`

```typescript
social: {
  instagram: "https://instagram.com/yourhandle",
  facebook: "https://facebook.com/yourpage",
  linkedin: "https://linkedin.com/company/yourcompany",
  twitter: "",      // Leave empty if not using
  youtube: "",      // Leave empty if not using
  tiktok: "",       // Leave empty if not using
}
```

**To remove a link:** Set it to empty `""`.

---

## 5. Contact Information

**File to edit:** `src/lib/site-config.ts`

```typescript
phone: "+971 56 386 7270",
whatsapp: "+971563867270",
email: "info@3guae.com",
address: "Office #1001, Sobha Ivory 1, Business Bay, Dubai, UAE",
```

---

## 6. When to Ask a Developer

**You CAN do yourself:**
- ✅ Change analytics IDs
- ✅ Update SEO text
- ✅ Change contact info
- ✅ Publish content from admin
- ✅ Change social links

**You NEED a developer:**
- ❌ Add new page sections
- ❌ Change website design/colors
- ❌ Add new features (chatbot, map, etc.)
- ❌ Fix broken functionality
- ❌ Update Next.js version
- ❌ Database schema changes

---

## Quick Reference: Important Files

| File | What It Controls |
|------|-----------------|
| `src/lib/site-config.ts` | Site settings, analytics, SEO, contact |
| Admin Dashboard → "Publish to Live Site" | Cache clearing |
| `src/app/globals.css` | Colors, fonts (developer only) |
| `next.config.mjs` | Redirects, image settings (developer only) |

---

## Need Help?

1. Check this guide first
2. Ask AI (Kimi/ChatGPT) with the specific file name
3. Contact your developer for complex changes
