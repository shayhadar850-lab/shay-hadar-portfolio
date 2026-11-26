'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TimelineContent } from '@/components/ui/timeline-animation';
import NumberFlow from '@number-flow/react';
import {
  Activity,
  CheckCheck,
  Cpu,
  Database,
  Layers,
  LayoutTemplate,
  Rocket,
  Share2,
  ShoppingBag,
  Wrench,
} from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { useRef, useState, type ReactNode } from 'react';

interface FeaturePoint {
  text: string;
  icon: ReactNode;
}

interface PricingPlan {
  id: string;
  popular?: boolean;
  monthlyName: string;
  oneTimeName: string;
  monthlyPrefix?: string;
  monthlyPrice: number;
  monthlyUnit: string;
  oneTimePrefix?: string;
  oneTimePrice: number;
  oneTimeUnit: string;
  monthlyDescription: string;
  oneTimeDescription: string;
  monthlyButtonText: string;
  oneTimeButtonText: string;
  monthlyFeatures: FeaturePoint[];
  oneTimeFeatures: FeaturePoint[];
  monthlyIncludesTitle: string;
  monthlyIncludes: string[];
  oneTimeIncludesTitle: string;
  oneTimeIncludes: string[];
  mailSubjectMonthly: string;
  mailSubjectOneTime: string;
}

const plans: PricingPlan[] = [
  {
    id: 'monitoring-care',
    monthlyName: 'ניטור ותחזוקה שוטפת',
    oneTimeName: 'ייצוב אינטגרציה או משימה ממוקדת',
    monthlyPrefix: 'החל מ־',
    monthlyPrice: 290,
    monthlyUnit: '/ חודש',
    oneTimePrefix: 'החל מ־',
    oneTimePrice: 850,
    oneTimeUnit: '/ חד־פעמי',
    monthlyDescription:
      'ניטור תקלות, תחזוקה ועדכונים שוטפים למערכות ואינטגרציות קיימות בתכולה מוגדרת.',
    oneTimeDescription:
      'איתור ותיקון תקלות באינטגרציה קיימת, חיבור API/Webhook ממוקד או בניית דף נחיתה ייעודי.',
    monthlyButtonText: 'לשיחה על ליווי תחזוקה',
    oneTimeButtonText: 'לפנייה למשימה ממוקדת',
    monthlyFeatures: [
      { text: 'ניטור אוטומציות Make / n8n, Webhooks ו־CRM', icon: <Activity size={18} /> },
      { text: 'תיקון תקלות ושינויי שדות בתכולה חודשית מוגדרת', icon: <Wrench size={18} /> },
      { text: 'עד 2 עדכוני דפים, טפסים או חיבורי מדידה בחודש', icon: <LayoutTemplate size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'אבחון ופתרון תקלה קיימת באינטגרציה או באוטומציה', icon: <Wrench size={18} /> },
      { text: 'חיבור API / Webhook, בדיקת תקינות ומניעת כפילויות', icon: <Activity size={18} /> },
      { text: 'תיעוד קצר של הזרימה והגדרות המערכת', icon: <LayoutTemplate size={18} /> },
    ],
    monthlyIncludesTitle: 'כולל גם:',
    monthlyIncludes: [
      'בדיקות תקינות יזומות לזיהוי כשלים שקטים',
      'עדכונים מבוקרים ואימות מול מערכת היעד',
      'סיכום תקינות חודשי ותיעוד שינויים',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות תקינות על תרחישי קצה לפני מסירה',
      'תיעוד נקודתי של השינוי והרשאות הגישה',
      '14 ימי אחריות ותיקונים לאחר המסירה',
    ],
    mailSubjectMonthly: 'פנייה לגבי מסגרת ניטור ותחזוקה שוטפת',
    mailSubjectOneTime: 'פנייה לגבי משימה ממוקדת או ייצוב אינטגרציה',
  },
  {
    id: 'custom-systems',
    popular: true,
    monthlyName: 'פיתוח ושיפור מערכות שוטף',
    oneTimeName: 'פיתוח כלי פנימי או מערכת',
    monthlyPrice: 970,
    monthlyUnit: '/ חודש',
    oneTimePrice: 2400,
    oneTimeUnit: '/ למערכת',
    monthlyDescription:
      'הקמה ושיפור מדורג של אוטומציות, אינטגרציות וכלים פנימיים לפי אפיון מוגדר.',
    oneTimeDescription:
      'אפיון, פיתוח והטמעה של כלי פנימי, תוסף Chrome, אינטגרציה מורכבת או שילוב AI ו־MCP.',
    monthlyButtonText: 'לבדיקת התאמה למסגרת זו',
    oneTimeButtonText: 'לאפיון ופיתוח מערכת',
    monthlyFeatures: [
      { text: 'פיתוח של עד 2 תהליכים או מודולים מוגדרים בחודש', icon: <Layers size={18} /> },
      { text: 'אינטגרציות CRM, קטלוגים, מסדי נתונים ו־APIs', icon: <Database size={18} /> },
      { text: 'תחזוקה שוטפת, ניטור ובקרות Read-back', icon: <Share2 size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'בניית מערכת אחת שלמה לפי אפיון ותכולה מוסכמים', icon: <Layers size={18} /> },
      { text: 'חיבור CRM, קטלוג, ענן (Cloudflare / Supabase) או AI', icon: <Database size={18} /> },
      { text: 'אימות מצב במערכת היעד ומניעת כפילויות', icon: <Share2 size={18} /> },
    ],
    monthlyIncludesTitle: 'כולל גם:',
    monthlyIncludes: [
      'תיעדוף משימות ברור ועדכוני סטטוס שוטפים',
      'בדיקות איכות לפני כל העלאה לסביבת עבודה',
      'תיעוד טכני מלא ומסירה מסודרת לצוות',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות קצה על תרחישים אמיתיים לפני השקה',
      'תיעוד טכני של טריגרים, שדות, קוד והרשאות',
      '30 ימי ליווי ותיקון באגים לאחר המסירה',
    ],
    mailSubjectMonthly: 'פנייה לגבי מסגרת פיתוח ושיפור מערכות שוטף',
    mailSubjectOneTime: 'פנייה לגבי פיתוח כלי פנימי או מערכת חדשה',
  },
  {
    id: 'extended-partner',
    monthlyName: 'ליווי טכני מורחב',
    oneTimeName: 'הקמת מערך אינטגרציות ומערכות',
    monthlyPrice: 2990,
    monthlyUnit: '/ חודש',
    oneTimePrice: 4900,
    oneTimeUnit: '/ להקמה',
    monthlyDescription:
      'ליווי טכני שוטף לצוותי תפעול וארגונים עם מספר מערכות, אינטגרציות וכלי AI פעילים.',
    oneTimeDescription:
      'חיבור מקצה לקצה של מערכות הליבה — CRM, איקומרס, אוטומציות, ניטור וכלי עבודה פנימיים.',
    monthlyButtonText: 'לשיחה על ליווי מורחב',
    oneTimeButtonText: 'לתכנון פרויקט הקמה',
    monthlyFeatures: [
      { text: 'פיתוח ושיפור שוטף לכלים פנימיים ואינטגרציות', icon: <Cpu size={18} /> },
      { text: 'חיבור וניהול מערכי איקומרס, קטלוגים ו־CRM', icon: <ShoppingBag size={18} /> },
      { text: 'תור משימות חודשי מוגדר עם קדימות במענה', icon: <Rocket size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'אינטגרציות מלאי, CRM, תשלומים וכלי עבודה', icon: <ShoppingBag size={18} /> },
      { text: 'פיתוח אוטומציות, ממשק תפעול ושילוב AI / MCP', icon: <Cpu size={18} /> },
      { text: 'שכבת ניטור, התרעות ובקרות איכות מלאות', icon: <Rocket size={18} /> },
    ],
    monthlyIncludesTitle: 'כולל גם:',
    monthlyIncludes: [
      'השתלבות ישירה בערוצי העבודה של הצוות (Slack / Notion)',
      'ניטור יזום, איתור תקלות ותיקונים שוטפים',
      'סקירה תקופתית של יציבות ושיפורי תהליך',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות אינטגרציה וארכיטקטורה מתועדת במלואה',
      'הדרכת צוות קצרה לעבודה עצמאית על המערכות',
      '30 ימי תמיכה וייצוב לאחר העלייה לאוויר',
    ],
    mailSubjectMonthly: 'פנייה לגבי ליווי טכני מורחב',
    mailSubjectOneTime: 'פנייה לגבי הקמת מערך אינטגרציות ומערכות',
  },
];

interface PricingSwitchProps {
  selected: 'monthly' | 'onetime';
  onSwitch: (value: 'monthly' | 'onetime') => void;
}

function PricingSwitch({ selected, onSwitch }: PricingSwitchProps) {
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-label="בחירת מודל עבודה"
        className="relative z-20 mx-auto flex w-fit rounded-full bg-white border border-[var(--border)] p-1 shadow-sm"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selected === 'onetime'}
          onClick={() => onSwitch('onetime')}
          className={`relative z-10 w-fit h-11 shrink-0 rounded-full !px-6 !py-2 text-sm font-semibold transition-colors cursor-pointer ${
            selected === 'onetime'
              ? '!text-white'
              : '!text-[var(--muted-foreground)] hover:!text-[var(--foreground)]'
          }`}
        >
          {selected === 'onetime' && (
            <motion.span
              layoutId="pricing-billing-switch"
              className="absolute inset-0 rounded-full border border-[#0c2f35] bg-gradient-to-t from-[#0c2f35] via-[#13424a] to-[#1a525b] shadow-md"
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            />
          )}
          <span className="relative whitespace-nowrap">פרויקט / משימה מוגדרת</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={selected === 'monthly'}
          onClick={() => onSwitch('monthly')}
          className={`relative z-10 w-fit h-11 rounded-full !px-6 !py-2 text-sm font-semibold transition-colors cursor-pointer ${
            selected === 'monthly'
              ? '!text-white'
              : '!text-[var(--muted-foreground)] hover:!text-[var(--foreground)]'
          }`}
        >
          {selected === 'monthly' && (
            <motion.span
              layoutId="pricing-billing-switch"
              className="absolute inset-0 rounded-full border border-[#0c2f35] bg-gradient-to-t from-[#0c2f35] via-[#13424a] to-[#1a525b] shadow-md"
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            />
          )}
          <span className="relative flex items-center gap-2 whitespace-nowrap">
            <span>ליווי טכני שוטף</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                selected === 'monthly'
                  ? 'bg-[#e6d184] !text-[#0c2f35]'
                  : 'bg-[var(--muted)] !text-[var(--foreground)]'
              }`}
            >
              חודשי
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

interface PricingSectionProps {
  email?: string;
}

export default function PricingSection({ email = 'shayhadar850@gmail.com' }: PricingSectionProps) {
  const [billing, setBilling] = useState<'monthly' | 'onetime'>('onetime');
  const pricingRef = useRef<HTMLElement>(null);
  const isOneTime = billing === 'onetime';

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.08,
        duration: 0.42,
        ease: [0.2, 0.8, 0.2, 1],
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: 16,
      opacity: 0,
    },
  };

  return (
    <section
      id="packages"
      ref={pricingRef}
      dir="rtl"
      aria-labelledby="packages-title"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)] px-5 py-16 md:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-8 bottom-8 z-0 rounded-full"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, rgba(205, 200, 246, 0.45) 0%, rgba(168, 150, 63, 0.12) 40%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 flex justify-center">
            <span className="sec-label">אפשרויות עבודה ומסגרות תקציב</span>
          </div>

          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] mb-3 leading-[1.18]"
          >
            <span id="packages-title">מסגרות עבודה לדוגמה — </span>
            <TimelineContent
              as="span"
              animationNum={1}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className="inline-block rounded-xl border border-dashed border-[#a8963f] bg-[#e6d184]/25 px-3 py-0.5 text-[#0f3238]"
            >
              לפי תכולה מוגדרת
            </TimelineContent>
          </TimelineContent>

          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="mx-auto max-w-xl text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed"
          >
            לנוחותכם, הנה קנה מידה למסגרות נפוצות — ממשימה ממוקדת או פיתוח כלי ועד ליווי טכני שוטף. ההיקף והמחיר הסופי נקבעים תמיד לפי הצורך האמיתי של הפרויקט.
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="mb-10"
        >
          <PricingSwitch selected={billing} onSwitch={setBilling} />
        </TimelineContent>

        <div className="grid gap-5 md:grid-cols-3 items-stretch">
          {plans.map((plan, index) => {
            const activeName = isOneTime ? plan.oneTimeName : plan.monthlyName;
            const activePrice = isOneTime ? plan.oneTimePrice : plan.monthlyPrice;
            const activePrefix = isOneTime ? plan.oneTimePrefix : plan.monthlyPrefix;
            const activeUnit = isOneTime ? plan.oneTimeUnit : plan.monthlyUnit;
            const activeDesc = isOneTime ? plan.oneTimeDescription : plan.monthlyDescription;
            const activeButtonText = isOneTime ? plan.oneTimeButtonText : plan.monthlyButtonText;
            const activeFeatures = isOneTime ? plan.oneTimeFeatures : plan.monthlyFeatures;
            const activeIncludesTitle = isOneTime
              ? plan.oneTimeIncludesTitle
              : plan.monthlyIncludesTitle;
            const activeIncludes = isOneTime ? plan.oneTimeIncludes : plan.monthlyIncludes;
            const activeSubject = isOneTime ? plan.mailSubjectOneTime : plan.mailSubjectMonthly;
            const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(activeSubject)}`;

            return (
              <TimelineContent
                key={plan.id}
                as="div"
                animationNum={4 + index}
                timelineRef={pricingRef}
                customVariants={revealVariants}
                className="flex"
              >
                <Card
                  className={`relative flex w-full flex-col rounded-2xl transition-all duration-300 ${
                    plan.popular
                      ? 'border-[#0f3238] bg-[#f4f7f4] ring-2 ring-[#0f3238] shadow-[0_24px_54px_-32px_rgba(12,47,53,0.4)]'
                      : 'border-[var(--border)] bg-white shadow-[0_18px_40px_-34px_rgba(16,41,45,0.2)] hover:border-[var(--ring)]'
                  }`}
                >
                  <CardHeader className="text-right pb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[var(--foreground)]">
                        {activeName}
                      </h3>
                      {plan.popular && (
                        <span className="shrink-0 rounded-full bg-[#0f3238] px-3 py-1 text-xs font-semibold text-[#e6d184]">
                          נפוץ
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed min-h-[44px] mb-3">
                      {activeDesc}
                    </p>

                    <div className="flex items-baseline gap-1.5 flex-wrap pt-1">
                      {activePrefix && (
                        <span className="text-sm font-semibold text-[var(--gold)]">
                          {activePrefix}
                        </span>
                      )}
                      <span className="inline-flex items-baseline gap-1 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                        <NumberFlow
                          value={activePrice}
                          locales="en-US"
                          className="text-3xl sm:text-4xl font-bold"
                        />
                        <span className="text-2xl font-semibold">₪</span>
                      </span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {activeUnit}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col pt-0">
                    <a
                      href={mailtoHref}
                      className={`mb-6 flex w-full items-center justify-center rounded-xl !px-5 !py-3 text-sm sm:text-base font-semibold !text-white transition-all duration-200 ${
                        plan.popular
                          ? 'border border-[#0c2f35] bg-gradient-to-t from-[#0c2f35] to-[#1a525b] shadow-[0_14px_28px_-14px_rgba(12,47,53,0.75)] hover:brightness-110'
                          : 'border border-[#203f43]/80 bg-gradient-to-t from-[#10292d] to-[#26474c] shadow-[0_12px_24px_-16px_rgba(16,41,45,0.65)] hover:brightness-110'
                      }`}
                    >
                      {activeButtonText}
                    </a>

                    <ul className="space-y-3 pb-5 list-none p-0 m-0">
                      {activeFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <span className="mt-0.5 grid shrink-0 place-content-center text-[#0f3238]">
                            {feature.icon}
                          </span>
                          <span className="text-sm font-medium text-[var(--foreground)] leading-snug">
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto space-y-3 border-t border-[var(--border)] pt-4">
                      <h4 className="text-sm font-semibold text-[var(--foreground)]">
                        {activeIncludesTitle}
                      </h4>
                      <ul className="space-y-2.5 list-none p-0 m-0">
                        {activeIncludes.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2.5">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-content-center rounded-full border border-[#a8963f]/60 bg-[#e6d184]/25">
                              <CheckCheck className="h-3.5 w-3.5 text-[#73601d]" />
                            </span>
                            <span className="text-sm text-[var(--muted-foreground)] leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TimelineContent>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs sm:text-sm text-[var(--muted-foreground)]">
          {isOneTime
            ? 'המחירים להערכה ראשונית (לפני מע״מ) · תכולה, תוצרים ולוחות זמנים נקבעים מראש לפני תחילת העבודה.'
            : 'המחירים להערכה ראשונית (לפני מע״מ) · כל מסגרת מוגדרת מראש בתכולה ברורה · פעילות א׳–ה׳ 09:00–18:00.'}
        </p>
      </div>
    </section>
  );
}
