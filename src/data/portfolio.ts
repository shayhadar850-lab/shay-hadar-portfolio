export interface CapabilityItem {
  id: string;
  title: string;
  label: string;
  icon: 'nodes' | 'database' | 'message' | 'spark' | 'layout' | 'browser';
  items: readonly string[];
  relatedSlug: string;
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

export const capabilities: readonly CapabilityItem[] = [
  {
    id: 'automation',
    title: 'אוטומציות ותהליכי עבודה',
    label: 'n8n · Make · Webhooks',
    icon: 'nodes',
    items: [
      'תכנון תהליך מקצה לקצה, מבחירת הטריגר ועד למסירת התוצאה',
      'שימוש ב־n8n וב־Make, תזמונים יומיים, בדיקות קלט וטיפול בחריגים',
    ],
    relatedSlug: 'whatsapp-sales-agent',
  },
  {
    id: 'crm',
    title: 'CRM ואינטגרציות נתונים',
    label: 'CRM · REST APIs · Notion',
    icon: 'database',
    items: [
      'חיבור מערכות CRM לטפסים, לידים, קטלוגים ומערכות עסקיות',
      'מיפוי שדות, סנכרון נתונים וניהול שלבי מעקב. Notion CRM מוצג בתיק העבודות',
    ],
    relatedSlug: 'model-studio',
  },
  {
    id: 'marketing',
    title: 'אוטומציות שיווק ופרסום',
    label: 'Social · Campaigns · Reporting',
    icon: 'message',
    items: [
      'חיבור ערוצי סושיאל כגון פייסבוק ואינסטגרם לכלי פרסום, CRM ומודלים חיצוניים',
      'הכנת טיוטות, תורי אישור, תזמון משימות ודוחות יומיים',
    ],
    relatedSlug: 'maildesk',
  },
  {
    id: 'ai',
    title: 'חיבור מודלים וכלי AI',
    label: 'LLMs · MCP · Tool Calling',
    icon: 'spark',
    items: [
      'שילוב מודלי שפה חיצוניים דרך API לסיווג, סיכום ויצירת תוכן',
      'פיתוח כלי MCP, חיבור סוכנים למערכות חיצוניות וניהול הקשר',
    ],
    relatedSlug: 'gpt-desktop-agent',
  },
  {
    id: 'web',
    title: 'עיצוב ופיתוח אתרים',
    label: 'Web Design · Astro · Responsive',
    icon: 'layout',
    items: [
      'עיצוב ובנייה של אתרים, דפי נחיתה וממשקי עבודה מותאמים לנייד',
      'חיבור האתר לכלי מדידה, לטפסים ול־CRM לפי הצורך',
    ],
    relatedSlug: 'learning-studio',
  },
  {
    id: 'extensions',
    title: 'תשתיות ותוספי דפדפן',
    label: 'Chrome MV3 · Cloudflare · Supabase',
    icon: 'browser',
    items: [
      'תוספי Chrome לקריאה והזנה של מידע עסקי דרך ממשקי דפדפן',
      'Backend, אחסון נתונים, פריסה בענן, אימות והרשאות',
    ],
    relatedSlug: 'chrome-marketplace',
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
    id: 'focused-task',
    label: 'משימת אינטגרציה ממוקדת',
    subtitle: 'חיבור מהיר בין מערכות קיימות לפי אפיון מוגדר',
    focus: 'חיבור טפסים, Webhooks, n8n/Make, סנכרון CRM או חיבור API נקודתי.',
    deliverables: [
      'אפיון קלט, פלט וכללי קצה לפני תחילת הכתיבה',
      'מימוש מלא כולל בדיקות שדות, סינון כפילויות וטיפול בחריגים',
      'תיעוד מסירה ברור: מה מפעיל את התהליך, מה חוזר ואיך מנטרים',
    ],
    handoff: 'מתאים כמשימה ראשונה להיכרות הדדית עם הצוות שלכם.',
    mailSubject: 'שיתוף פעולה — משימת אינטגרציה ממוקדת',
  },
  {
    id: 'system-build',
    label: 'מערכת, תוסף או ממשק עבודה',
    subtitle: 'בניית כלי עבודה ייעודי או אתר מחובר לתהליך העסקי',
    focus: 'אתר Astro מהיר, לוח בקרה פנימי, תוסף Chrome MV3 או כלי MCP ייעודי.',
    deliverables: [
      'עיצוב ובניית ממשק רספונסיבי מלא בעברית (RTL) או אנגלית',
      'שכבת Backend / Workers / Supabase עם אימות והרשאות בצד השרת',
      'בדיקות אוטומטיות למסלולי ליבה ומסירה נקייה בקוד מתועד',
    ],
    handoff: 'ניתן לבנות ישירות בריפוזיטורי שלכם ותחת המותג של הסוכנות.',
    mailSubject: 'שיתוף פעולה — פיתוח מערכת או ממשק עבודה',
  },
  {
    id: 'agency-partner',
    label: 'קבלנות משנה לסוכנות (White-label)',
    subtitle: 'זרוע ביצוע טכנית לפרויקטים חוזרים של לקוחות הקצה שלכם',
    focus: 'אתם מובילים את הקשר מול הלקוח; אני מטפל בצד הטכני, האינטגרציות והבדיקות.',
    deliverables: [
      'השתלבות בעבודה לפי תהליכי המסירה וה־QA של הסוכנות',
      'שילוב אוטומציות שיווק, CRM, אתרים וכלי AI תחת סטנדרט אחיד',
      'זמינות למשימות המשך, הרחבות ותחזוקת אינטגרציות לפי צורך',
    ],
    handoff: 'מתחילים מפרויקט אחד ובוחנים התאמה לעבודה שוטפת.',
    mailSubject: 'שיתוף פעולה כקבלן משנה (White-label)',
  },
  {
    id: 'monitoring-ops',
    label: 'ניטור, פיקוח ותפעול מערכות',
    subtitle: 'שירות עצמאי מאחורי הקלעים לחברות IT, SaaS ואינטגרטורים',
    focus: 'החברה מנהלת את הקשר עם לקוחותיה; אני מבצע ניטור, בדיקות יזומות, טיפול ראשוני בחריגים והסלמה לפי נוהל.',
    deliverables: [
      'ניטור זמינות מערכות ותהליכים ובדיקת התרעות ותקלות לפי נוהל',
      'בדיקות יזומות של כשלי אוטומציה, סנכרון נתונים, הזמנות וטפסים',
      'תיעוד, פתיחת קריאה, הסלמה לגורם האחראי ובקרת איכות תקופתית',
    ],
    handoff: 'פתוח לבדיקת התאמה או לפיילוט מוגדר בשעות ובהיקף מוסכמים (לא מוקד 24/7 ולא למערכות קריטיות/בטיחותיות).',
    mailSubject: 'ניטור, פיקוח ותפעול מערכות',
  },
] as const;

export const engineeringPillars = [
  {
    title: 'תכנון וניתוח מערכות מידע',
    detail: 'מיפוי צורכי משתמשים, זרימת נתונים וכללים עסקיים לפני שבונים.',
  },
  {
    title: 'ניהול טכנולוגיה וחדשנות',
    detail: 'בחירת פתרון לפי הצורך העסקי ויכולת ההטמעה שלו.',
  },
  {
    title: 'חשבונאות והבנה פיננסית',
    detail: 'חיבור בין עלויות, תמחור ובקרות בתהליכי מסחר.',
  },
  {
    title: 'מיקרו־כלכלה ומקרו־כלכלה',
    detail: 'הבנת תמריצים, ביקוש ותנאי השוק שבהם עסק פועל.',
  },
] as const;

export const faqs: readonly FaqItem[] = [
  {
    q: 'איך מתנהלת עבודה כקבלן משנה (White-label) מול סוכנות?',
    a: 'אתם מנהלים את הקשר, הציפיות והאפיון מול לקוח הקצה. אני מבצע את המשימה הטכנית לפי ההגדרה שסיכמנו — עם בדיקות מקצה לקצה ותיעוד מסירה מסודר שאפשר להעביר הלאה תחת המותג שלכם.',
  },
  {
    q: 'אילו מערכות, APIs וכלים אפשר לחבר יחד?',
    a: 'אתרי Web וטפסים, n8n ו־Make, מערכות CRM (כגון Notion CRM וחיבורי REST/Webhook), תיבות Gmail דרך OAuth/SMTP/IMAP, זירות מסחר כמו eBay API, תוספי Chrome MV3 ומודלי AI כולל כלי MCP.',
  },
  {
    q: 'איך מונעים תקלות כמו שליחה כפולה או פעולה חלקית באוטומציה?',
    a: 'כפי שמתועד במקרי הבוחן באתר (כמו Model Studio ו־MailDesk), התכנון כולל הפרדה בין הכנת טיוטה לביצוע, שמירת יומן מצב מתמשך (כגון SQLite או Supabase) ואימות Read-back כאשר סטטוס קריאה חיצונית אינו ודאי.',
  },
  {
    q: 'איך משלבים כלי AI ו־MCP בלי לאבד שליטה על התוצר?',
    a: 'כל כלי מוגדר עם סכמת קלט מפורשת, גבולות גזרה ברורים ותורי אישור לפני פעולות רגישות. ב־GPT Desktop Agent, למשל, כשל בקריאת מצב מוחזר בנפרד מכשל בביצוע כדי לא להריץ פעולה פעמיים.',
  },
  {
    q: 'מה מקבלים בפועל בסיום משימה או פרויקט?',
    a: 'מערכת עובדת ובדוקה בתרחישים אמיתיים, תיעוד של הטריגרים, מבנה הנתונים, תלויות והרשאות, ופירוט כיצד המערכת מטפלת בחריגים — כדי שגם הצוות שלכם יוכל להבין ולהמשיך לתפעל אותה.',
  },
  {
    q: 'האם אפשר להתחיל ממשימה קטנה וממוקדת?',
    a: 'בהחלט. רוב שיתופי הפעולה מתחילים במשימה אחת ברורה עם קריטריוני קבלה מוסכמים, ורק לאחר שרואים את איכות הביצוע והתקשורת מרחיבים לפרויקטים נוספים.',
  },
  {
    q: 'איך פועל שירות הניטור, הפיקוח ותפעול המערכות כקבלן משנה?',
    a: 'זהו שירות עצמאי לחברות IT, שירותים מנוהלים, SaaS ואינטגרטורים. מתחילים מבדיקת התאמה או פיילוט מוגדר שבו קובעים מראש את המערכות, שעות הפעילות, זמני התגובה, הרשאות הגישה ונוהל ההסלמה. הפעילות מוגבלת להיקף ולשעות שהוסכמו ואינה מהווה מוקד 24/7 או כיסוי למערכות קריטיות ובטיחותיות.',
  },
  {
    q: 'האם הנתונים בהדגמות ובצילומי המסך באתר הם של לקוחות אמיתיים?',
    a: 'לא. ההדגמות האינטראקטיביות בדף רצות מקומית בדפדפן להמחשת ארכיטקטורה בלבד ואינן שולחות מידע החוצה, וצילומי המסך מ־Model Studio, MailDesk ו־Notion to Marketplace צולמו עם נתוני דוגמה מקומיים או חיתוך שמונע חשיפת פרטים.',
  },
] as const;

export const contactTopics = [
  { id: 'general', label: 'שיתוף פעולה טכנולוגי', subject: 'שיתוף פעולה טכנולוגי' },
  { id: 'monitoring', label: 'ניטור, פיקוח ותפעול מערכות', subject: 'ניטור, פיקוח ותפעול מערכות' },
  { id: 'agency', label: 'קבלנות משנה לסוכנות', subject: 'שיתוף פעולה כקבלן משנה (White-label)' },
  { id: 'automation', label: 'אוטומציה ואינטגרציית CRM', subject: 'פנייה בנושא אוטומציה ואינטגרציית CRM' },
  { id: 'ai-mcp', label: 'כלי AI, MCP או תוסף Chrome', subject: 'פנייה בנושא כלי AI / MCP / תוסף דפדפן' },
  { id: 'web', label: 'עיצוב ופיתוח אתר / ממשק', subject: 'פנייה בנושא עיצוב ופיתוח אתר או ממשק' },
] as const;
