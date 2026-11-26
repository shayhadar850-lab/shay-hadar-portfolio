export type ToolLogoId =
  | 'make'
  | 'n8n'
  | 'rest-apis'
  | 'webhooks'
  | 'hubspot'
  | 'fireberry'
  | 'monday'
  | 'notion'
  | 'airtable'
  | 'cloudflare'
  | 'vercel'
  | 'supabase'
  | 'shopify'
  | 'paypal'
  | 'ebay'
  | 'google-calendar'
  | 'google-drive'
  | 'mcp'
  | 'higgsfield'
  | 'canva';

export interface CoreSpecialtyItem {
  id: string;
  kicker: string;
  title: string;
  description: string;
  icon: 'nodes' | 'spark' | 'shield';
  points: readonly string[];
  relatedSlug: string;
  relatedLabel: string;
}

export interface ToolItem {
  id: ToolLogoId;
  name: string;
  projectSlug?: string;
  projectTitle?: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  tools: readonly ToolItem[];
}

export interface FeaturedProjectMeta {
  slug: 'model-studio' | 'maildesk' | 'gpt-desktop-agent';
  summary: string;
  problem: string;
  built: string;
  evidence: string;
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

export const featuredProjectsMeta: readonly FeaturedProjectMeta[] = [
  {
    slug: 'model-studio',
    summary: 'ניהול קטלוג, פרסום באמצעות eBay API ואימות מצב המודעה במערכת היעד.',
    problem: 'מידע על מוצרים, תמונות, מפרטים ודרישות קטגוריה מפוזרים בין מקורות שונים ויוצרים טעויות או כפילויות בפרסום.',
    built: 'סביבת עבודה ב־Cloudflare Workers ו־Supabase, תוסף Chrome MV3 לקליטת מוצרים, הכנת הצעה ועדכון מודעות דרך eBay API עם מנגנון Read-back.',
    evidence: 'פריסה פעילה ב־Cloudflare עם בדיקות פרסום, עריכת מודעה, העלאת תמונות ואימות מצב מול eBay.',
  },
  {
    slug: 'maildesk',
    summary: 'ניהול דיוור ומעקב בכמה חשבונות Gmail, כולל עצירת הודעות המשך כשמתקבלת תשובה.',
    problem: 'ניהול פניות ומעקב ידני בין כמה תיבות מייל מקשה לדעת מי כבר קיבל הודעה ומתי לעצור את ההמשך.',
    built: 'יישום מקומי בעברית לייבוא CSV, בניית רצפי הודעות, תזמון לפי אזור זמן ומגבלת חשבון, סנכרון Gmail ויומן SQLite מתמשך.',
    evidence: '4 בדיקות מקומיות שעברו לסינון כפילויות, תזמון לפי אזור זמן, יומן שליחה ועצירת המשך בעת תשובה או הסרה.',
  },
  {
    slug: 'gpt-desktop-agent',
    summary: 'חיבור סוכן AI לכלים במחשב ובדפדפן דרך MCP.',
    problem: 'תהליכי עבודה משלבים אתרים, קבצים ויישומי שולחן עבודה — סוכן AI צריך לבצע בהם פעולות מבוקרות ישירות מתוך השיחה.',
    built: 'שרת MCP ב־Python עם כלים מובנים לפעולות Windows ו־Chrome, תוסף גשר לדפדפן ומסלול חיבור מאומת דרך Cloudflare Tunnel.',
    evidence: 'אימות חיבור חי לתוסף Chrome, בדיקות דחיית קלט לא תקין, ניתוב לפי מופע ולשונית והפרדת קריאת מצב מביצוע.',
  },
] as const;

export const coreSpecialties: readonly CoreSpecialtyItem[] = [
  {
    id: 'automations-integrations',
    kicker: 'Make · n8n · CRM · APIs · Webhooks',
    title: 'אוטומציות ואינטגרציות',
    description:
      'חיבור CRM, טפסים, מערכות עסקיות ונתונים באמצעות API ו־Webhooks — כדי להפוך עבודה ידנית חוזרת לתהליכים אמינים שעובדים לבד.',
    icon: 'nodes',
    points: [
      'חיבור מערכות CRM (כמו HubSpot, Fireberry, monday.com ו־Notion) לטפסים, לידים וקטלוגים',
      'בניית תהליכים ב־Make וב־n8n לצד אינטגרציות קוד ישירות מול REST APIs ו־Webhooks',
      'מיפוי שדות, מניעת כפילויות וטיפול מסודר בשגיאות ובתקלות רשת',
    ],
    relatedSlug: 'whatsapp-sales-agent',
    relatedLabel: 'דוגמה: WhatsApp → Notion CRM',
  },
  {
    id: 'internal-tools-ai',
    kicker: 'Internal Tools · Chrome MV3 · AI · MCP',
    title: 'פיתוח כלים פנימיים ושילוב AI',
    description:
      'ממשקים מותאמים, תוספי Chrome וכלים שמחברים מודלי AI למערכות חיצוניות באמצעות MCP — מותאמים בדיוק לאופן שבו הצוות עובד בפועל.',
    icon: 'spark',
    points: [
      'בניית דשבורדים וכלי תפעול פנימיים על Cloudflare Workers, Vercel ו־Supabase',
      'פיתוח תוספי Chrome MV3 לקיצור הזנת נתונים, איסוף מידע ומיפוי טפסים',
      'חיבור מודלי AI לכלים עסקיים, קטלוגים וממשקי עבודה דרך MCP ובקרות קלט',
    ],
    relatedSlug: 'gpt-desktop-agent',
    relatedLabel: 'דוגמה: GPT Desktop Agent (MCP)',
  },
  {
    id: 'monitoring-qa',
    kicker: 'Watchdog · Read-back · Diagnostics · Docs',
    title: 'ניטור, תחזוקה ובקרת איכות',
    description:
      'איתור כשלים, התרעות, אימות שהפעולה הושלמה במערכת היעד ותיעוד — גם עבור מערכות ואינטגרציות שכבר עובדות אצלכם.',
    icon: 'shield',
    points: [
      'אבחון ותיקון כשלים שקטים באינטגרציות קיימות, Webhooks וחיבורי API',
      'הוספת בקרות Read-back, יומני פעילות והתרעות לפני שהבעיה מגיעה ללקוחות',
      'בדיקות אוטומטיות ותיעוד ברור של טריגרים, הרשאות וזרימת נתונים לצוות',
    ],
    relatedSlug: 'model-studio',
    relatedLabel: 'דוגמה: אימות Read-back ב־Model Studio',
  },
] as const;

export const toolCategories: readonly ToolCategory[] = [
  {
    id: 'automation-integrations',
    title: 'אוטומציה ואינטגרציות',
    tools: [
      { id: 'make', name: 'Make' },
      { id: 'n8n', name: 'n8n' },
      { id: 'rest-apis', name: 'REST APIs', projectSlug: 'model-studio', projectTitle: 'Model Studio' },
      { id: 'webhooks', name: 'Webhooks' },
    ],
  },
  {
    id: 'crm-work-management',
    title: 'CRM וניהול עבודה',
    tools: [
      { id: 'hubspot', name: 'HubSpot' },
      { id: 'fireberry', name: 'Fireberry' },
      { id: 'monday', name: 'monday.com' },
      { id: 'notion', name: 'Notion', projectSlug: 'chrome-marketplace', projectTitle: 'Notion to Marketplace' },
      { id: 'airtable', name: 'Airtable' },
    ],
  },
  {
    id: 'cloud-deploy-db',
    title: 'ענן, פריסה ומסדי נתונים',
    tools: [
      { id: 'cloudflare', name: 'Cloudflare', projectSlug: 'model-studio', projectTitle: 'Model Studio' },
      { id: 'vercel', name: 'Vercel' },
      { id: 'supabase', name: 'Supabase', projectSlug: 'model-studio', projectTitle: 'Model Studio' },
    ],
  },
  {
    id: 'ecommerce-payments',
    title: 'איקומרס ותשלומים',
    tools: [
      { id: 'shopify', name: 'Shopify' },
      { id: 'paypal', name: 'PayPal' },
      { id: 'ebay', name: 'eBay API', projectSlug: 'model-studio', projectTitle: 'Model Studio' },
    ],
  },
  {
    id: 'workflows-collaboration',
    title: 'תהליכי עבודה ושיתוף',
    tools: [
      { id: 'google-calendar', name: 'Google Calendar' },
      { id: 'google-drive', name: 'Google Drive' },
    ],
  },
  {
    id: 'ai-design-content',
    title: 'AI, עיצוב ותוכן',
    tools: [
      { id: 'mcp', name: 'MCP', projectSlug: 'gpt-desktop-agent', projectTitle: 'GPT Desktop Agent' },
      { id: 'higgsfield', name: 'Higgsfield' },
      { id: 'canva', name: 'Canva' },
    ],
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
    label: 'משימה ממוקדת או ייצוב מערכת',
    subtitle: 'דרך מהירה להתחיל: פתרון תקלה קיימת, חיבור API או הקמת בקרת איכות',
    focus: 'איתור כשלים באינטגרציה פעילה, חיבור בין שתי מערכות, מניעת כפילויות או הוספת התרעות וניטור בתכולה מוגדרת מראש.',
    deliverables: [
      'מיפוי נקודות הכשל, הטריגרים וזרימת הנתונים במערכת הקיימת',
      'יישום התיקון או החיבור הנדרש ובדיקת אימות מול מערכת היעד',
      'תיעוד מסודר לצוות כדי שאפשר יהיה לתחזק ולהמשיך משם בקלות',
    ],
    handoff: 'היקף, תוצרים ולוח זמנים נקבעים מראש לפני שמתחילים.',
    mailSubject: 'פנייה לגבי משימה ממוקדת או ייצוב אינטגרציה',
  },
  {
    id: 'new-system',
    label: 'פיתוח מערכת או כלי פנימי',
    subtitle: 'בניית כלי מותאם, אוטומציה מורכבת, תוסף דפדפן או שילוב AI ו־MCP',
    focus: 'כשתהליך ידני גוזל שעות עבודה או שאין כלי מדף שמתאים לתהליך שלכם — אני מאפיין, בונה, בודק ומוסר מערכת מוכנה לשימוש.',
    deliverables: [
      'אפיון זרימת המידע, חריגים, הרשאות ומבנה נתונים לפני הפיתוח',
      'פיתוח הממשק, האוטומציה או שרת ה־MCP כולל בקרות בטיחות ו־Read-back',
      'בדיקות קצה על תרחישים אמיתיים, תיעוד מלא והדרכת שימוש קצרה',
    ],
    handoff: 'הקוד, התיעוד וההגדרות נשארים בבעלות מלאה של הארגון.',
    mailSubject: 'פנייה לגבי פיתוח מערכת או כלי פנימי',
  },
  {
    id: 'team-integration',
    label: 'השתלבות עם הצוות בפרויקט',
    subtitle: 'לקיחת אחריות על אינטגרציה, אוטומציה או רכיב מוגדר לצד הצוות שלכם',
    focus: 'אני משתלב בזרימת העבודה הקיימת שלכם (GitHub, Notion, Slack או monday.com) ולוקח בעלות טכנית על החלק שהוגדר.',
    deliverables: [
      'עבודה מסודרת לפי משימות מוגדרות, תיאום ממשקים וסקירות קוד/תהליך',
      'טיפול בחיבורי צד שלישי, Webhooks, עיבוד נתונים ובקרות איכות',
      'מסירה מתועדת שמתאימה לסטנדרט ההנדסי והתפעולי של הצוות',
    ],
    handoff: 'גמיש לפי שלבי הפרויקט — ממשימה נקודתית ועד ליווי לאורך ההשקה.',
    mailSubject: 'פנייה לגבי השתלבות בפרויקט עם הצוות',
  },
  {
    id: 'ongoing-support',
    label: 'ליווי טכני ותחזוקה שוטפת',
    subtitle: 'שמירה על אינטגרציות, אוטומציות וכלים פנימיים יציבים לאורך זמן',
    focus: 'מתאים לארגונים וצוותי תפעול שכבר מפעילים אוטומציות ורוצים כתובת טכנית לניטור, תיקון כשלים ושיפורים מדורגים.',
    deliverables: [
      'ניטור יזום וטיפול מהיר כש־API משתנה או כש־Webhook נכשל בשקט',
      'עדכוני שדות, התאמת תהליכים ושיפורים שוטפים מתוך תור משימות מוסכם',
      'דוח מצב תקופתי ותיעוד עדכני של כל השינויים במערכת',
    ],
    handoff: 'תכולה מוגדרת מראש ופעילות בימי עסקים א׳–ה׳ 09:00–18:00.',
    mailSubject: 'פנייה לגבי ליווי טכני ותחזוקה שוטפת',
  },
] as const;

export const engineeringPillars = [
  {
    title: 'תכנון וניתוח מערכות מידע',
    detail: 'מיפוי תהליכים, זרימת נתונים ונקודות כשל לפני שנוגעים בקוד או באוטומציה.',
  },
  {
    title: 'אימות ובקרות איכות',
    detail: 'בניית מנגנוני ניטור, Read-back ויומני פעילות שמונעים תקלות שקטות וכפילויות.',
  },
  {
    title: 'חיבור בין תפעול לטכנולוגיה',
    detail: 'ראייה תפעולית ועסקית שמחברת כל אינטגרציה וכלי פנימי לחיסכון אמיתי בזמן ובשגיאות.',
  },
  {
    title: 'אחריות מקצה לקצה',
    detail: 'מאפיון וחיבור APIs ועד בדיקות, פריסה בענן ותיעוד מסודר לצוות.',
  },
] as const;

export const faqs: readonly FaqItem[] = [
  {
    q: 'למי העבודה איתי מתאימה?',
    a: 'לארגונים, לחברות טכנולוגיה ולצוותי תפעול שרוצים לחבר בין מערכות (CRM, טפסים, איקומרס, מסדי נתונים וכלי עבודה), להפוך תהליכים ידניים לאוטומטיים, לבנות כלים פנימיים או לייצב מערכות קיימות.',
  },
  {
    q: 'האם אפשר להתחיל ממשימה אחת ממוקדת לפני פרויקט גדול?',
    a: 'כן. הרבה שיתופי פעולה מתחילים מאיתור ותיקון של תקלה באינטגרציה קיימת, חיבור API אחד או הוספת שכבת ניטור ובקרה. כך רואים את איכות העבודה, התקשורת והתיעוד בפועל לפני שמתרחבים.',
  },
  {
    q: 'אתה עובד גם על מערכות ואוטומציות שכבר בנויות אצלנו?',
    a: 'בהחלט. חלק משמעותי מהעבודה הוא כניסה למערכות קיימות (Make, n8n, חיבורי API, CRM או סקריפטים), מיפוי נקודות כשל שקטות, תיקון תקלות, מניעת כפילויות והוספת התרעות ותיעוד.',
  },
  {
    q: 'איך מונעים תקלות שקטות, כפילויות או פרסום שגוי באוטומציות?',
    a: 'כפי שמתועד במקרי הבוחן באתר (כמו Model Studio ו־MailDesk), התכנון כולל הפרדה בין טיוטה לאישור ביצוע, יומני מצב מתמשכים, אימות Read-back מול מערכת היעד והתרעות כשהתהליך נעצר.',
  },
  {
    q: 'איך מתבצע שיתוף הפעולה מול הצוות הטכני או התפעולי שלנו?',
    a: 'אני משתלב ישירות בסביבת העבודה שלכם — בין אם ב־GitHub, Notion, monday.com או Slack — ולוקח אחריות על רכיב או אינטגרציה מוגדרים, כולל בדיקות ומסירה מתועדת.',
  },
  {
    q: 'מה שעות הפעילות וגבולות האחריות בליווי שוטף?',
    a: 'הפעילות מתבצעת בימי עסקים א׳–ה׳ (09:00–18:00) בהתאם לתכולה ולזמני התגובה שמוגדרים מראש. הליווי אינו מוקד 24/7 ואינו מחליף אחריות של ספקי תשתית צד שלישי.',
  },
  {
    q: 'האם הנתונים בהדגמות ובצילומי המסך באתר הם של לקוחות אמיתיים?',
    a: 'לא. ההדגמות האינטראקטיביות בדף רצות מקומית בדפדפן להמחשת ארכיטקטורה בלבד ואינן שולחות מידע החוצה, וצילומי המסך צולמו עם נתוני דוגמה מקומיים בלבד לשמירה על פרטיות.',
  },
] as const;

export const contactTopics = [
  { id: 'default', label: 'פרויקט או שיתוף פעולה', subject: 'פנייה לגבי פרויקט או שיתוף פעולה' },
  { id: 'automation', label: 'אוטומציה ואינטגרציית API / CRM', subject: 'פנייה לגבי אוטומציה ואינטגרציית מערכות' },
  { id: 'internal-tool', label: 'כלי פנימי או שילוב AI / MCP', subject: 'פנייה לגבי פיתוח כלי פנימי או שילוב AI' },
  { id: 'stabilize', label: 'איתור תקלות, ניטור ובקרות', subject: 'פנייה לגבי ייצוב, ניטור ובקרות למערכת קיימת' },
  { id: 'ongoing', label: 'ליווי טכני שוטף', subject: 'פנייה לגבי ליווי טכני ותחזוקה שוטפת' },
] as const;
