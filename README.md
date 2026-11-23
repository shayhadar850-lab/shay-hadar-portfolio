# Shay Hadar — Automation & Integrations

תיק עבודות בעברית וב־RTL, בנוי ב־Astro וב־TypeScript. האתר הסטטי כולל מקרי בוחן, תרשימי ארכיטקטורה ופרטי פנייה לסוכנויות ולצוותי תוכנה.

[האתר](https://shay-hadar-portfolio.shayhadar850.workers.dev)

## פיתוח

הפרויקט נבדק עם Node.js 24.22.3 ו־npm. השתמשו בגרסת Node.js שנתמכת על ידי גרסת Cloudflare CLI הנעולה בפרויקט.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` בודק טיפוסים ומייצר את האתר ב־`dist/`. תוכן מקרי הבוחן נשמר ב־`src/content/projects/` עם סכמת שדות ב־`src/content.config.ts`. צילומים המיועדים לפרסום נשמרים ב־`public/media/`. מחרוזות ניווט, שפת המסמך וכיוון הכתיבה מוגדרים ב־`src/i18n/he.ts`. גרסה נוספת יכולה להשתמש באותן תבניות עם מילון ותוכן מקומיים.

## רכיבי React ו־shadcn

רכיבי האתר נמצאים ב־`src/components/`. רכיבי React בפורמט shadcn נשמרים ב־`src/components/ui/` וניתנים לייבוא דרך `@/components/ui`. ההפרדה מאפשרת ל־shadcn CLI להוסיף רכיבים בלי לערבב אותם בתבניות Astro. קובץ הסגנון המשותף הוא `src/styles/global.css`, עם Tailwind CSS 4 והצבעים של האתר. TypeScript מוגדר ב־`tsconfig.json`. הגדרות הנתיבים של shadcn שמורות ב־`components.json`.

בהתקנה ראשונה על פרויקט Astro אחר אפשר להוסיף את React ואת Tailwind באמצעות `npx astro add react tailwind`, להגדיר את כינוי הנתיב `@/*`, ולהריץ `npx shadcn@latest init`. בפרויקט הזה כבר קיימים הקבצים והנתיבים הללו. אין צורך להריץ את פקודת האתחול בעת התקנת האתר.

Glass Fold מציג רקע WebGL בבאנר. בדפדפן ללא WebGL נגן וידאו מקומי מציג את אותו אפקט. ההנפשה מכבדת את העדפת הפחתת התנועה של המכשיר. הרכיב מבוסס על [GradFlow](https://gradflow.meerbahadin.dev).

## פריסה ל־Cloudflare

האתר משתמש ב־Workers Static Assets. הגדרות ה־Worker נמצאות ב־`cloudflare.config.ts`. פקודת הפריסה בונה תחילה את האתר, ואז שולחת את `dist/` ל־Worker.

```sh
npx cf auth login
npm run deploy
```

בסביבת CI מגדירים `CLOUDFLARE_API_TOKEN` ו־`CLOUDFLARE_ACCOUNT_ID` במשתני הסביבה של שירות הפריסה. אין משתני סביבה הדרושים ל־Frontend. שינוי שם ה־Worker או כתובת האתר מחייב עדכון `cloudflare.config.ts` ו־`src/config.ts`. הכותרות הסטטיות מוגדרות ב־`public/_headers`.

## רישיון וייחוס

הפרויקט מבוסס על תבנית [Case](https://github.com/erlandv/case) מאת Erland. הודעת רישיון MIT המקורית כלולה ב־[LICENSE](./LICENSE). צילומי הממשק והתוכן מתעדים את הפרויקטים של שי הדר.
