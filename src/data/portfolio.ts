export interface CapabilityItem {
  id: string;
  title: string;
  label: string;
  icon: 'nodes' | 'database' | 'message' | 'spark' | 'layout' | 'browser' | 'store' | 'shield';
  items: readonly string[];
  relatedSlug: string;
}

export interface RetainerTier {
  id: 'care' | 'growth' | 'partner-desk';
  name: string;
  englishName: string;
  priceDirectPrefix: string;
  priceDirect: string;
  priceDirectUnit: string;
  priceAgencyPrefix: string;
  priceAgency: string;
  priceAgencyUnit: string;
  featured?: boolean;
  badge?: string;
  directSummary: string;
  agencySummary: string;
  featuresAgency: readonly string[];
  featuresDirect: readonly string[];
  mailSubjectDirect: string;
  mailSubjectAgency: string;
}

export interface OngoingServiceItem {
  id: string;
  icon: 'nodes' | 'layout' | 'store' | 'spark' | 'message' | 'shield';
  kicker: string;
  title: string;
  description: string;
  points: readonly string[];
  idealFor: string;
}

export interface WorkflowStepDef {
  id: string;
  tool: string;
  label: string;
  normalNote: string;
  edgeNote: string;
  edgeTrigger?: boolean;
}

export interface WorkflowDemoDef {
  id: string;
  projectSlug: string;
  title: string;
  shortLabel: string;
  fromChip: string;
  toChip: string;
  edgeLabel: string;
  summary: string;
  steps: readonly WorkflowStepDef[];
}

export interface CollaborationTrack {
  id: string;
  label: string;
  subtitle: string;
  focus: string;
  deliverables: readonly string[];
  handoff: string;
  mailSubject: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const retainerTiers: readonly RetainerTier[] = [
  {
    id: 'care',
    name: 'תחזוקה ודפי נחיתה',
    englishName: 'Care & Pages',
    priceAgencyPrefix: 'החל מ־',
    priceAgency: '290',
    priceAgencyUnit: '/ לקוח לחודש',
    priceDirectPrefix: 'החל מ־',
    priceDirect: '490',
    priceDirectUnit: '/ חודש',
    agencySummary: 'ניטור, תחזוקה ותיקון תקלות — כולל בניית דפי נחיתה ללא הגבלה.',
    directSummary: 'ראש שקט מלא לאתר, לחנות ולאוטומציות — כולל דפי נחיתה ללא הגבלה.',
    featuresAgency: [
      'בניית דפי נחיתה ללא הגבלה (לפי תור)',
      'תחזוקה ותיקון תקלות שוטף לאתר ולחנות',
      'ניטור זמינות, אבטחה וגיבויים יומיים',
      'בדיקת טפסים, סליקה, Make ו־CRM',
      'דוח תקינות חודשי תחת המותג שלכם',
    ],
    featuresDirect: [
      'בניית דפי נחיתה ללא הגבלה (לפי תור)',
      'תחזוקה ותיקון תקלות שוטף לאתר ולחנות',
      'ניטור זמינות, אבטחה וגיבויים יומיים',
      'בדיקת טפסים, סליקה, Make ו־CRM',
      'עדכונים שוטפים ודוח תקינות חודשי',
    ],
    mailSubjectDirect: 'פנייה לחבילת תחזוקה ודפי נחיתה',
    mailSubjectAgency: 'פנייה לחבילת תחזוקה ודפי נחיתה (White-label)',
  },
  {
    id: 'growth',
    name: 'מערכות בהתאמה אישית',
    englishName: 'Custom Systems',
    priceAgencyPrefix: '',
    priceAgency: '970',
    priceAgencyUnit: '/ לקוח לחודש',
    priceDirectPrefix: '',
    priceDirect: '1,490',
    priceDirectUnit: '/ חודש',
    featured: true,
    badge: 'מומלץ',
    agencySummary: 'בניית מערכות לפי בקשה והתאמה אישית — כולל תחזוקה ותיקון שוטף.',
    directSummary: 'פיתוח והתאמת מערכות עסקיות לפי צורך — כולל תחזוקה ותיקון שוטף.',
    featuresAgency: [
      'בנייה של עד 2 מערכות בהתאמה אישית בחודש',
      'מערכות ניהול מלאי, CRM ותהליכים עסקיים',
      'מערכות ניהול סושיאל, דיוור ולידים',
      'כולל ניטור, תחזוקה ותיקון תקלות שוטף',
      'תיעוד ומסירה נקייה תחת המותג שלכם',
    ],
    featuresDirect: [
      'בנייה של עד 2 מערכות בהתאמה אישית בחודש',
      'מערכות ניהול מלאי, CRM ותהליכים עסקיים',
      'מערכות ניהול סושיאל, דיוור ולידים',
      'כולל ניטור, תחזוקה ותיקון תקלות שוטף',
      'אפיון, הקמה וליווי שוטף במקום אחד',
    ],
    mailSubjectDirect: 'פנייה לחבילת מערכות בהתאמה אישית (1,490 ₪/חודש)',
    mailSubjectAgency: 'פנייה לחבילת מערכות בהתאמה אישית — White-label (970 ₪/לקוח)',
  },
  {
    id: 'partner-desk',
    name: 'זרוע ביצוע מנוהלת',
    englishName: 'Partner Desk',
    priceAgencyPrefix: '',
    priceAgency: '2,990',
    priceAgencyUnit: '/ חודש',
    priceDirectPrefix: '',
    priceDirect: '3,490',
    priceDirectUnit: '/ חודש',
    agencySummary: 'צוות ביצוע שוטף ל־4–5 לקוחות סוכנות במקביל.',
    directSummary: 'ניהול טכנולוגי מלא לחנות איקומרס, אוטומציות, SEO ושיווק.',
    featuresAgency: [
      'ניהול חנויות איקומרס וקטלוגים מלא',
      'אוטומציות מתקדמות, API, CRM ו־AI',
      'SEO מורחב + 12–16 פוסטים לסושיאל',
      'תחזוקה, תיקון תקלות וכלים לפי תור',
      'עבודה ישירה ב־Slack / Notion + קדימות',
    ],
    featuresDirect: [
      'ניהול מלא לחנות Shopify / WooCommerce / eBay',
      'אוטומציות מתקדמות, API, CRM ו־AI',
      'SEO מורחב (4 תכנים) + 12–16 פוסטים לסושיאל',
      'תחזוקה, תיקון תקלות ושיפור המרות שוטף',
      'מענה מועדף באותו יום עסקים + תעדוף חודשי',
    ],
    mailSubjectDirect: 'פנייה לחבילת זרוע ביצוע מנוהלת',
    mailSubjectAgency: 'פנייה ל־Partner Desk לסוכנות (White-label)',
  },
] as const;

export const ongoingServices: readonly OngoingServiceItem[] = [
  {
    id: 'automations-crm',
    icon: 'nodes',
    kicker: 'Make · n8n · CRM · APIs',
    title: 'ניטור ותחזוקת אוטומציות ו־CRM',
    description:
      'טיפול שוטף במערכות שכבר עלו לאוויר: זיהוי כשלים שקטים, תיקון Webhooks ו־APIs, מניעת כפילויות ושינויים קטנים בלי לשאוב זמן מהצוות הבכיר.',
    points: [
      'התרעות Watchdog כשהליד לא הגיע ל־CRM או כשתהליך נעצר בשקט',
      'תיקון חיבורי Make, n8n, Zapier, Monday, HubSpot, Fireberry ו־Notion',
      'הוספת שדות, שינוי ניתובי לידים ובדיקות תקינות אחרי כל עדכון',
    ],
    idealFor: 'חברות אינטגרציה ועסקים עם CRM פעיל',
  },
  {
    id: 'websites-maintenance',
    icon: 'layout',
    kicker: 'Web · Landing Pages · Care',
    title: 'תחזוקת אתרים ודפי נחיתה',
    description:
      'שמירה על אתרים ודפי נחיתה מהירים, מאובטחים ומעודכנים — כולל שינויי תוכן ועיצוב שוטפים, בדיקת טפסים, חיבורי מדידה ופתרון תקלות.',
    points: [
      'עדכונים טכניים, גיבויים, SSL, אבטחה ושיפור מהירות טעינה',
      'עריכת דפים קיימים, העלאת דפי נחיתה לקמפיינים וחיבור טפסים ל־CRM',
      'עבודה עם Astro, WordPress, Webflow, Cloudflare Pages ודפי HTML/JS',
    ],
    idealFor: 'עסקים וסוכנויות שיווק',
  },
  {
    id: 'ecommerce-ops',
    icon: 'store',
    kicker: 'Shopify · WooCommerce · eBay',
    title: 'ניהול ותחזוקת חנויות איקומרס',
    description:
      'תפעול טכני שוטף לחנויות אונליין וקטלוגים מרובי ערוצים — מהעלאת מוצרים ועדכון מחירים ועד סנכרון מלאי, הזמנות ואוטומציות תפעול.',
    points: [
      'ניהול קטלוגים, תמונות, מפרטים, דפי מוצר וקולקציות באופן שוטף',
      'חיבורי API לספקים, סנכרון מלאי/מחירים ומניעת כפילויות (כמו ב־Model Studio)',
      'בדיקת תהליכי רכישה, קופונים, משלוחים וחיבור לכלי דיוור ו־CRM',
    ],
    idealFor: 'בעלי חנויות אונליין וסוכנויות איקומרס',
  },
  {
    id: 'seo-ongoing',
    icon: 'spark',
    kicker: 'Technical SEO · Performance',
    title: 'SEO טכני ואופטימיזציה שוטפת',
    description:
      'תחזוקת SEO שוטפת ששומרת על האתר והחנות תקינים ומהירים בעיני גוגל — משיפור מהירות ומבנה ועד תיקון תקלות אינדוקס ועדכון תוכן.',
    points: [
      'שיפור Core Web Vitals, דחיסת תמונות, היררכיית כותרות וקישורים פנימיים',
      'טיפול בשגיאות Search Console, מפות אתר, הפניות 301 וסכמות (Schema)',
      'אופטימיזציה שוטפת של עמודי שירות/מוצר, מטא־תגים ודוח מצב חודשי',
    ],
    idealFor: 'אתרי תדמית, חנויות איקומרס וסוכנויות דיגיטל',
  },
  {
    id: 'marketing-social-systems',
    icon: 'message',
    kicker: 'Social Automation · Email · Leads',
    title: 'מערכות שיווק ופרסום אוטומטיות',
    description:
      'הקמה ותחזוקה של תשתיות שיווק שעובדות באופן קבוע: ממערכת שמכינה ומתזמנת פוסטים לרשתות חברתיות ועד דיוור מבוקר, מעקב לידים ודוחות.',
    points: [
      'מערכות פרסום והעלאת פוסטים אוטומטית לפייסבוק, אינסטגרם ולינקדאין עם תור אישור',
      'תשתית דיוור ומעקב תגובות (בדומה ל־MailDesk) וחיבור קמפיינים ל־CRM',
      'איסוף לידים, סינון כפילויות, שליחת תזכורות ודוחות ביצועים שבועיים',
    ],
    idealFor: 'עסקים שרוצים נוכחות שוטפת וסוכנויות שיווק',
  },
  {
    id: 'watchdog-ai',
    icon: 'shield',
    kicker: 'Watchdog · AI · MCP · Docs',
    title: 'בקרת איכות, AI וניטור יזום',
    description:
      'במקום לגלות תקלה רק כשהלקוח מתקשר — הקמה ותחזוקה של מנגנוני בקרה אוטומטיים, שילוב כלי AI לתפעול ותיעוד מלא של כל המערכות.',
    points: [
      'בדיקות Heartbeat ו־Read-back שמוודאות שפעולות הושלמו במערכת היעד',
      'שילוב מודלי AI וכלי MCP לסיווג פניות, ניסוח טיוטות וסיכום מידע עסקי',
      'תיעוד מסודר של הרשאות, טריגרים ונוהלי הסלמה לשליטה מלאה של הלקוח',
    ],
    idealFor: 'חברות שירות, SaaS ואינטגרטורים',
  },
] as const;

export const capabilities: readonly CapabilityItem[] = [
  {
    id: 'automation',
    title: 'אוטומציות ותהליכי עבודה',
    label: 'n8n · Make · Webhooks',
    icon: 'nodes',
    items: [
      'הקמה, ניטור ותחזוקה של תהליכים ב־n8n וב־Make כולל טיפול בחריגים',
      'תזמונים יומיים, בדיקות תקינות וזיהוי כשלים שקטים לפני שהלקוח מרגיש',
    ],
    relatedSlug: 'whatsapp-sales-agent',
  },
  {
    id: 'crm',
    title: 'CRM ואינטגרציות נתונים',
    label: 'CRM · REST APIs · Notion',
    icon: 'database',
    items: [
      'חיבור ותחזוקה של מערכות CRM לטפסים, לידים, קטלוגים ומערכות עסקיות',
      'מיפוי שדות, סנכרון דו־כיווני ומניעת כפילויות לאורך זמן',
    ],
    relatedSlug: 'model-studio',
  },
  {
    id: 'marketing',
    title: 'מערכות שיווק, סושיאל ודיוור',
    label: 'Social · Campaigns · Reporting',
    icon: 'message',
    items: [
      'הקמה ותחזוקה של מערכות העלאת פוסטים אוטומטית לפייסבוק, אינסטגרם ולינקדאין',
      'תורי אישור תוכן, דיוור מבוקר, חיבור קמפיינים ל־CRM ודוחות שוטפים',
    ],
    relatedSlug: 'maildesk',
  },
  {
    id: 'ecommerce',
    title: 'חנויות איקומרס וקטלוגים',
    label: 'Shopify · WooCommerce · eBay',
    icon: 'store',
    items: [
      'ניהול קטלוגים, דפי מוצר, מחירים וסנכרון מלאי והזמנות בין ערוצים',
      'שערי איכות ובקרות Read-back למניעת שגיאות פרסום ועדכון',
    ],
    relatedSlug: 'model-studio',
  },
  {
    id: 'web',
    title: 'אתרים, דפי נחיתה ו־SEO טכני',
    label: 'Web · Astro · Core Web Vitals',
    icon: 'layout',
    items: [
      'בנייה ותחזוקה של אתרים ודפי נחיתה מהירים בעברית (RTL) ומותאמים לנייד',
      'SEO טכני שוטף, שיפור מהירות, תקינות אינדוקס וחיבור מדידה וטפסים',
    ],
    relatedSlug: 'learning-studio',
  },
  {
    id: 'ai',
    title: 'כלי AI, MCP ותשתיות ענן',
    label: 'LLMs · MCP · Cloudflare · MV3',
    icon: 'spark',
    items: [
      'שילוב מודלי שפה, כלי MCP ותוספי Chrome MV3 לתפעול וחיסכון בזמן',
      'פיתוח ופריסה על Cloudflare Workers ו־Supabase עם ניטור ובקרות',
    ],
    relatedSlug: 'gpt-desktop-agent',
  },
] as const;

export const workflowDemos: readonly WorkflowDemoDef[] = [
  {
    id: 'model-studio',
    projectSlug: 'model-studio',
    title: 'Model Studio → eBay API',
    shortLabel: 'קטלוג → eBay',
    fromChip: 'Chrome MV3',
    toChip: 'eBay API',
    edgeLabel: 'דמה נתק אחרי שליחה (Read-back)',
    summary: 'הדמיית קליטת מוצר, שמירה ב־Supabase, הכנת הצעה ואימות מצב מול eBay API.',
    steps: [
      {
        id: 'source',
        tool: 'Source / Chrome MV3',
        label: 'קליטת מוצר',
        normalNote: 'נקלט מפרט מוצר לדוגמה (מזהה #104) עם תמונות ופרמטרים בסיסיים.',
        edgeNote: 'נקלט מפרט מוצר לדוגמה (מזהה #104) עם תמונות ופרמטרים בסיסיים.',
      },
      {
        id: 'worker',
        tool: 'Cloudflare Worker',
        label: 'בדיקת מוכנות',
        normalNote: 'בדיקות חובה עברו: מחיר, כותרת, קטגוריה ומדיניות חשבון תקינים.',
        edgeNote: 'בדיקות חובה עברו: מחיר, כותרת, קטגוריה ומדיניות חשבון תקינים.',
      },
      {
        id: 'supabase',
        tool: 'Supabase',
        label: 'שמירת טיוטה וגרסה',
        normalNote: 'נשמרה תמונת מצב (Snapshot) של הטיוטה ותיעוד פעולה בבסיס הנתונים.',
        edgeNote: 'נשמרה תמונת מצב (Snapshot) לפני השליחה כדי לזהות שינוי מקביל.',
      },
      {
        id: 'ebay',
        tool: 'eBay API · OAuth',
        label: 'הכנת הצעה ופרסום',
        normalNote: 'הצעה הוכנה ופורסמה בהדגמה עם מזהה מודעה מסונכרן.',
        edgeNote: 'החיבור נקטע לפני קבלת אישור — התהליך נמנע משליחה כפולה ועובר לבדיקה.',
        edgeTrigger: true,
      },
      {
        id: 'readback',
        tool: 'Read-back Guard',
        label: 'אימות מצב סופי',
        normalNote: 'קריאה חוזרת אימתה שהמודעה תואמת לטיוטה ב־Supabase.',
        edgeNote: 'בקרת Read-back קראה את מצב המודעה מ־eBay ועדכנה סטטוס בלי ליצור כפילות.',
        edgeTrigger: true,
      },
    ],
  },
  {
    id: 'whatsapp-crm',
    projectSlug: 'whatsapp-sales-agent',
    title: 'WhatsApp → Notion CRM',
    shortLabel: 'WhatsApp → CRM',
    fromChip: 'WhatsApp',
    toChip: 'Notion CRM',
    edgeLabel: 'דמה מגבלת שולח / הגנת קלט',
    summary: 'הדמיית קליטת פנייה, שליפת הקשר קטלוגי מ־Notion, ניסוח עם Gemma ותיעוד ב־CRM.',
    steps: [
      {
        id: 'wa',
        tool: 'whatsapp-web.js',
        label: 'קליטת הודעה',
        normalNote: 'התקבלה הודעת לקוח לדוגמה; אירועי מערכת והודעות קבוצה סוננו.',
        edgeNote: 'התקבלה הודעה משולח מחוץ לרשימה המותרת בהגדרות הבדיקה.',
        edgeTrigger: true,
      },
      {
        id: 'handler',
        tool: 'Message Handler',
        label: 'נרמול וסינון',
        normalNote: 'חולץ מזהה שיחה, זוהתה שפת הפנייה ונבדקו כללי אבטחת קלט.',
        edgeNote: 'שכבת הסינון עצרה את ההודעה לפני קריאה למודל השפה ותיעדה חסימה.',
        edgeTrigger: true,
      },
      {
        id: 'context',
        tool: 'Conversation State',
        label: 'ניהול הקשר',
        normalNote: 'נטענה היסטוריית שיחה פעילה ושלב מכירה עם ניהול תוקף (TTL).',
        edgeNote: 'הקשר השיחה לא עודכן משום שהפנייה סוננה בשלב הבקרה.',
      },
      {
        id: 'gemma',
        tool: 'Notion + Gemma API',
        label: 'קטלוג וניסוח מענה',
        normalNote: 'נתוני מוצר נשלפו ממטמון הקטלוג ב־Notion ומודל Gemma ניסח תשובה.',
        edgeNote: 'קריאת API למודל נחסכה אוטומטית — אין שליחה ללא אישור קלט.',
      },
      {
        id: 'crm',
        tool: 'Reply / CRM Sync',
        label: 'תשובה ותיעוד',
        normalNote: 'התשובה הוחזרה לצ׳אט והאינטראקציה תועדה בכרטיס ה־Notion CRM.',
        edgeNote: 'נרשם אירוע סינון ביומן בלבד; לא נשלחה הודעה חיצונית.',
      },
    ],
  },
  {
    id: 'maildesk',
    projectSlug: 'maildesk',
    title: 'MailDesk → Gmail + Guard',
    shortLabel: 'MailDesk → Gmail',
    fromChip: 'CSV · SQLite',
    toChip: 'Gmail Guard',
    edgeLabel: 'דמה תשובה או בקשת הסרה',
    summary: 'הדמיית ייבוא אנשי קשר, תזמון בחלון פעילות, שליחה מבוקרת ועצירה אוטומטית בעת תשובה.',
    steps: [
      {
        id: 'csv',
        tool: 'CSV Validator',
        label: 'ייבוא וסינון כפילויות',
        normalNote: 'נבדק קובץ דוגמה: כתובות לא תקינות, כפילויות וכתובות חסומות סוננו.',
        edgeNote: 'נבדק קובץ דוגמה: כתובות לא תקינות, כפילויות וכתובות חסומות סוננו.',
      },
      {
        id: 'draft',
        tool: 'Campaign Draft',
        label: 'בניית רצף ותצוגה',
        normalNote: 'הורכבו תבניות עם משתני שם וחברה ואושרו בתצוגה מקדימה.',
        edgeNote: 'הורכבו תבניות עם משתני שם וחברה ואושרו בתצוגה מקדימה.',
      },
      {
        id: 'schedule',
        tool: 'Timezone Scheduler',
        label: 'תזמון וחלון פעילות',
        normalNote: 'השליחה שובצה בחלון הפעילות לפי אזור הזמן ומגבלת החשבון.',
        edgeNote: 'לפני שלב ההמשך מתבצעת בדיקת תשובות והסרות מול תיבת הדואר.',
      },
      {
        id: 'gmail',
        tool: 'Gmail OAuth / SMTP',
        label: 'שליחה משויכת שולח',
        normalNote: 'ההודעה שויכה לתיבת השולח המקורית לשמירה על רצף שרשור.',
        edgeNote: 'זוהתה תשובה / בקשת הסרה בתיבה — השליחה של הודעת ההמשך בוטלה.',
        edgeTrigger: true,
      },
      {
        id: 'ledger',
        tool: 'SQLite Ledger',
        label: 'יומן ועצירת המשך',
        normalNote: 'המצב נשמר ביומן SQLite למניעת כפילות גם אחרי הפעלה מחדש.',
        edgeNote: 'הרצף נעצר סופית ב־SQLite והכתובת סומנה ביומן החסימות.',
        edgeTrigger: true,
      },
    ],
  },
] as const;

export const projectFilterGroups = [
  { id: 'all', label: 'הכל' },
  { id: 'ai-mcp', label: 'AI ו־MCP' },
  { id: 'commerce-browser', label: 'מסחר ותוספי דפדפן' },
  { id: 'crm-mail', label: 'CRM ודיוור' },
] as const;

export const projectGroupMap: Record<string, string> = {
  'gpt-desktop-agent': 'ai-mcp',
  'learning-studio': 'ai-mcp',
  'model-studio': 'commerce-browser',
  'chrome-marketplace': 'commerce-browser',
  'maildesk': 'crm-mail',
  'whatsapp-sales-agent': 'crm-mail',
};

export const projectShortBadge: Record<string, string> = {
  'gpt-desktop-agent': 'MCP',
  'model-studio': 'eBay',
  'maildesk': 'Gmail',
  'whatsapp-sales-agent': 'CRM',
  'chrome-marketplace': 'MV3',
  'learning-studio': 'AI',
};

export const collaborationTracks: readonly CollaborationTrack[] = [
  {
    id: 'agency-retainer',
    label: 'ריטיינר White-label לסוכנות',
    subtitle: 'מאגר קיבולת חודשי משותף על פני מספר לקוחות — עם מרווח רווח ברור',
    focus: 'אתם מנהלים את הקשר מול הלקוח ומוכרים חבילות תחזוקה/שיווק/אוטומציה; אני מתפעל מאחורי הקלעים בעלות חודשית קבועה.',
    deliverables: [
      'קיבולת חודשית משותפת שניתן להפנות בכל חודש ללקוח שהכי צריך אותה',
      'טיפול בתקלות אוטומציה, CRM, אתרים, חנויות איקומרס, SEO ומערכות סושיאל',
      'תיעוד מסודר תחת המותג שלכם ודיווח חודשי שמוכן להעברה ללקוח',
    ],
    handoff: 'תמחור שותף נוח ב־White-label שמאפשר לכם למכור ריטיינרים ללקוחות שלכם ברווחיות גבוהה.',
    mailSubject: 'שיתוף פעולה White-label בריטיינר חודשי',
  },
  {
    id: 'direct-business',
    label: 'ריטיינר ישיר לעסק / חנות',
    subtitle: 'כתובת טכנית אחת לניהול, תחזוקה ושיפור שוטף של כלל המערכות הדיגיטליות',
    focus: 'מתאים לעסקים, חברות שירות וחנויות איקומרס שרוצים יציבות ושיפור מתמיד בלי לגייס עובד ובלי הצעות מחיר על כל תיקון.',
    deliverables: [
      'ניטור ותיקון שוטף לאתר, לחנות האונליין, ל־CRM ולאוטומציות',
      'קידום SEO טכני וניהול מערכות שיווק (פרסום אוטומטי לסושיאל, דיוור ולידים)',
      'פגישת תעדוף חודשית + חודש ראשון כחודש ניסיון ללא התחייבות להמשך',
    ],
    handoff: 'מתחילים מבדיקת קליטה קצרה או ישירות מחודש ראשון במסלול המתאים.',
    mailSubject: 'פנייה לריטיינר חודשי ישיר לעסק',
  },
  {
    id: 'pilot-audit',
    label: 'פיילוט / בדיקת קליטה (שלב 0)',
    subtitle: 'דרך קלה ומהירה לבדוק עבודה משותפת לפני שמתחייבים לחבילה חודשית',
    focus: 'מיפוי תהליכים קיימים, תיקון תקלה אחת בוערת או חיבור מערכת ניטור בסיסית בתכולה מוגדרת מראש.',
    deliverables: [
      'סקירת המערכות, הטריגרים, ההרשאות ונקודות הכשל השקטות',
      'תיקון ממוקד של צוואר בקבוק אחד + בדיקת קבלה במערכת היעד',
      'המלצה ברורה לאיזה מסלול ריטיינר (אם בכלל) הכי משתלם להמשיך',
    ],
    handoff: 'החל מ־650 ₪ חד־פעמי — חלק מעלות הפיילוט מתקזזת במעבר לריטיינר חודשי.',
    mailSubject: 'פנייה לפיילוט ובדיקת קליטה לפני ריטיינר',
  },
  {
    id: 'setup-and-care',
    label: 'הקמת מערכת + מעבר לתחזוקה',
    subtitle: 'בניית מערכת שיווק, חנות, אתר או אינטגרציה חדשה — ואז תפעול שוטף שלה',
    focus: 'למי שעדיין אין לו מערכת פרסום אוטומטית לרשתות, אוטומציית לידים או תשתית איקומרס מסודרת ורוצה גם הקמה וגם גב אחרי העלייה לאוויר.',
    deliverables: [
      'אפיון ובנייה של המערכת הראשונית בתמחור פרויקט מוגדר מראש',
      'חיבור כלי בקרה, מניעת כפילויות ויומני פעילות כבר מהיום הראשון',
      'מעבר חלק לאחד משלושת מסלולי הריטיינר לשקט תפעולי ושיפור מתמשך',
    ],
    handoff: 'פרויקטי הקמה גדולים מתומחרים בנפרד מהריטיינר השוטף.',
    mailSubject: 'הקמת מערכת חדשה ומעבר לריטיינר תחזוקה',
  },
] as const;

export const engineeringPillars = [
  {
    title: 'תכנון וניתוח מערכות מידע',
    detail: 'מיפוי תהליכים, זרימת נתונים ונקודות כשל לפני שנוגעים בקוד או באוטומציה.',
  },
  {
    title: 'ניהול תפעול ובקרות איכות',
    detail: 'בניית מנגנוני ניטור, Read-back ותיעוד שמונעים תקלות שקטות לאורך זמן.',
  },
  {
    title: 'חשיבה עסקית וכלכלית',
    detail: 'ראייה פיננסית ותפעולית שמחברת כל אוטומציה ושיפור למרווח הרווח ולחיסכון בזמן.',
  },
  {
    title: 'אחריות מקצה לקצה',
    detail: 'שילוב של אתרים, איקומרס, SEO, CRM, שיווק ו־AI תחת כתובת מקצועית אחת.',
  },
] as const;

export const faqs: readonly FaqItem[] = [
  {
    q: 'האם הריטיינרים מתאימים גם לעסקים ישירים או רק לסוכנויות?',
    a: 'לשניהם. לסוכנויות וחברות אוטומציה אני עובד מאחורי הקלעים ב־White-label עם תמחור שותף מסודר ודוחות תחת המותג שלהן, ולעסקים וחנויות אונליין ישירות אני משמש ככתובת טכנית אחת לניטור, תחזוקה, SEO ומערכות שיווק.',
  },
  {
    q: 'איך עובד שיתוף הפעולה מול סוכנויות (White-label)?',
    a: 'אתם מנהלים את הקשר והתמחור מול הלקוח שלכם, ואני מבצע את התחזוקה, האוטומציות, ה־SEO, האיקומרס והפרסום השוטף מאחורי הקלעים במחיר קבוע — בלי חיוב לפי שעה ועם דוח חודשי שמוכן להעברה ללקוח.',
  },
  {
    q: 'מה נכנס בפועל תחת הריטיינר החודשי?',
    a: 'ניטור ותיקון אוטומציות (Make, n8n, Webhooks, APIs) ו־CRM, תחזוקת אתרים ודפי נחיתה, ניהול ותחזוקת חנויות איקומרס (Shopify, WooCommerce, eBay), קידום SEO טכני ושוטף, והקמה/תחזוקה של מערכות שיווק אוטומטיות כמו פרסום פוסטים לרשתות חברתיות, דיוור ודוחות.',
  },
  {
    q: 'מה קורה בחודש שקט שאין בו כמעט תקלות?',
    a: 'התכולה החודשית לא הולכת לאיבוד — בחודש שקט מנצלים את הקיבולת מתוך תור השיפורים המוסכם: אופטימיזציית SEO, שיפור מהירות אתר, ניקוי נתונים ב־CRM, אוטומציה קטנה חדשה או בדיקות תקינות יזומות.',
  },
  {
    q: 'איך מתחילים בלי לקחת סיכון גדול?',
    a: 'יש שתי דרכים נוחות: אפשר להתחיל מפיילוט קליטה ממוקד (החל מ־650 ₪) שבו פותרים תקלה קיימת או ממפים את המערכות ורואים את איכות העבודה בפועל, או להיכנס ישירות לחודש ראשון כחודש ניסיון ללא התחייבות להמשך.',
  },
  {
    q: 'מה זמני התגובה וגבולות האחריות (SLA)?',
    a: 'הפעילות מתבצעת בימי עסקים א׳–ה׳ (09:00–18:00). בחבילת הבסיס המענה הראשוני הוא עד סוף יום העסקים הבא, בבינונית תוך יום עסקים אחד, ובחבילה הגדולה באותו יום עסקים. השירות אינו מוקד 24/7 ואינו מחליף אחריות של ספקי צד שלישי (כגון תקלות תשתית עולמיות של Make, Meta או Shopify).',
  },
  {
    q: 'איך מונעים תקלות שקטות, כפילויות או פרסום שגוי באוטומציות?',
    a: 'כפי שמתועד במקרי הבוחן באתר (כמו Model Studio ו־MailDesk), התכנון כולל הפרדה בין טיוטה/תור אישור לבין ביצוע, יומני מצב מתמשכים, אימות Read-back מול מערכת היעד, והתרעות Watchdog כשהתהליך נעצר בשקט.',
  },
  {
    q: 'האם הנתונים בהדגמות ובצילומי המסך באתר הם של לקוחות אמיתיים?',
    a: 'לא. ההדגמות האינטראקטיביות בדף רצות מקומית בדפדפן להמחשת ארכיטקטורה בלבד ואינן שולחות מידע החוצה, וצילומי המסך צולמו עם נתוני דוגמה מקומיים בלבד לשמירה מלאה על סודיות.',
  },
] as const;

export const contactTopics = [
  { id: 'systems', label: 'מערכות בהתאמה אישית · 970 ₪', subject: 'פנייה לחבילת מערכות בהתאמה אישית (970 ₪/חודש)' },
  { id: 'care', label: 'תחזוקה ודפי נחיתה · מ־290 ₪', subject: 'פנייה לחבילת תחזוקה ודפי נחיתה (החל מ־290 ₪/חודש)' },
  { id: 'partner-desk', label: 'זרוע ביצוע מנוהלת · 2,990 ₪', subject: 'פנייה לחבילת זרוע ביצוע מנוהלת (2,990 ₪/חודש)' },
  { id: 'onetime', label: 'הזמנה חד־פעמית / הקמת מערכת', subject: 'פנייה לפרויקט חד־פעמי / הקמת מערכת' },
  { id: 'pilot', label: 'פיילוט / בדיקת התאמה', subject: 'פנייה לפיילוט ובדיקת התאמה' },
  { id: 'general', label: 'שיתוף פעולה טכנולוגי', subject: 'פנייה בנושא שיתוף פעולה טכנולוגי' },
] as const;
