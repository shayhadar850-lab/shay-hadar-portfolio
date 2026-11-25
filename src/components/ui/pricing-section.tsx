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
    id: 'care-pages',
    monthlyName: 'תחזוקה ודפי נחיתה',
    oneTimeName: 'דף נחיתה ותיקון תקלות',
    monthlyPrefix: 'החל מ־',
    monthlyPrice: 290,
    monthlyUnit: '/ חודש',
    oneTimePrefix: 'החל מ־',
    oneTimePrice: 850,
    oneTimeUnit: '/ חד־פעמי',
    monthlyDescription:
      'ניטור, תחזוקה ותיקון תקלות שוטף — כולל בניית דפי נחיתה ללא הגבלה.',
    oneTimeDescription:
      'בניית דף נחיתה ממיר ומעוצב או תיקון וייצוב נקודתי לאתר ולחיבורים קיימים.',
    monthlyButtonText: 'לתיאום התאמה',
    oneTimeButtonText: 'להזמנה חד־פעמית',
    monthlyFeatures: [
      { text: 'בניית דפי נחיתה ללא הגבלה (לפי תור)', icon: <LayoutTemplate size={18} /> },
      { text: 'תחזוקה ותיקון תקלות שוטף לאתר ולחנות', icon: <Wrench size={18} /> },
      { text: 'ניטור אוטומציות Make / n8n ו־CRM', icon: <Activity size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'עיצוב ובניית דף נחיתה מהיר ומותאם לנייד', icon: <LayoutTemplate size={18} /> },
      { text: 'תיקון תקלות, ניקוי שגיאות וייצוב מהירות', icon: <Wrench size={18} /> },
      { text: 'חיבור טפסים, מדידה וסנכרון ל־CRM', icon: <Activity size={18} /> },
    ],
    monthlyIncludesTitle: 'כולל גם:',
    monthlyIncludes: [
      'ניטור זמינות, אבטחה וגיבויים יומיים',
      'בדיקת טפסים, סליקה ועדכונים מבוקרים',
      'דוח תקינות חודשי ותיעוד מלא',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות תקינות מלאות במובייל ובדסקטופ',
      'העלאה לאוויר, SSL וחיבור דומיין',
      '14 ימי אחריות ותיקונים לאחר העלייה לאוויר',
    ],
    mailSubjectMonthly: 'פנייה לחבילת תחזוקה ודפי נחיתה (ריטיינר חודשי)',
    mailSubjectOneTime: 'פנייה לבניית דף נחיתה ותיקון תקלות (חד־פעמי)',
  },
  {
    id: 'custom-systems',
    popular: true,
    monthlyName: 'מערכות בהתאמה אישית',
    oneTimeName: 'פיתוח מערכת בהתאמה אישית',
    monthlyPrice: 970,
    monthlyUnit: '/ חודש',
    oneTimePrice: 2400,
    oneTimeUnit: '/ למערכת',
    monthlyDescription:
      'בניית מערכות לפי בקשה והתאמה אישית — כולל תחזוקה ותיקון שוטף.',
    oneTimeDescription:
      'אפיון, פיתוח והטמעה של מערכת עסקית אחת בהתאמה אישית מלאה לפי הדרישה שלכם.',
    monthlyButtonText: 'להתחיל במסלול זה',
    oneTimeButtonText: 'לאפיון והקמת מערכת',
    monthlyFeatures: [
      { text: 'בנייה של עד 2 מערכות בהתאמה אישית בחודש', icon: <Layers size={18} /> },
      { text: 'מערכות ניהול מלאי, CRM ותהליכים עסקיים', icon: <Database size={18} /> },
      { text: 'מערכות ניהול סושיאל, דיוור ולידים', icon: <Share2 size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'הקמת מערכת אחת שלמה לפי אפיון מוגדר', icon: <Layers size={18} /> },
      { text: 'ניהול מלאי, CRM, סושיאל או דיוור ולידים', icon: <Database size={18} /> },
      { text: 'חיבורי API, Webhooks ומניעת כפילויות', icon: <Share2 size={18} /> },
    ],
    monthlyIncludesTitle: 'כולל גם:',
    monthlyIncludes: [
      'ניטור, תחזוקה ותיקון תקלות שוטף',
      'חיבורי API ו־Webhooks ללא כפילויות',
      'תיעוד מסודר ומסירה נקייה לצוות',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות קצה על תרחישים אמיתיים לפני השקה',
      'תיעוד טכני מלא של טריגרים, שדות והרשאות',
      '30 ימי ליווי ותיקון באגים לאחר המסירה',
    ],
    mailSubjectMonthly: 'פנייה לחבילת מערכות בהתאמה אישית (970 ₪/חודש)',
    mailSubjectOneTime: 'פנייה לפיתוח מערכת בהתאמה אישית (2,400 ₪ חד־פעמי)',
  },
  {
    id: 'partner-desk',
    monthlyName: 'זרוע ביצוע מנוהלת',
    oneTimeName: 'הקמת מערך איקומרס ואוטומציה',
    monthlyPrice: 2990,
    monthlyUnit: '/ חודש',
    oneTimePrice: 4900,
    oneTimeUnit: '/ להקמה',
    monthlyDescription:
      'תפעול, איקומרס, אוטומציות, SEO וסושיאל בצוות ביצוע קבוע.',
    oneTimeDescription:
      'הקמה מלאה מקצה לקצה של חנות אונליין, CRM, אוטומציות וכלי שיווק ותפעול.',
    monthlyButtonText: 'לתיאום התאמה',
    oneTimeButtonText: 'לתכנון פרויקט הקמה',
    monthlyFeatures: [
      { text: 'ניהול חנויות איקומרס וקטלוגים מלא', icon: <ShoppingBag size={18} /> },
      { text: 'אוטומציות מתקדמות, API, CRM ו־AI', icon: <Cpu size={18} /> },
      { text: 'SEO מורחב + 12–16 פוסטים לסושיאל', icon: <Rocket size={18} /> },
    ],
    oneTimeFeatures: [
      { text: 'הקמת חנות Shopify / WooCommerce / eBay וקטלוג', icon: <ShoppingBag size={18} /> },
      { text: 'אינטגרציות מלאי, סליקה, חשבוניות, CRM ו־AI', icon: <Cpu size={18} /> },
      { text: 'הגדרת SEO טכני ותשתית פרסום אוטומטי לסושיאל', icon: <Rocket size={18} /> },
    ],
    monthlyIncludesTitle: 'הכול כלול, ובנוסף:',
    monthlyIncludes: [
      'תחזוקה, ניטור ותיקון תקלות שוטף',
      'פיתוח כלים ותוספים לפי תור תעדוף',
      'עבודה ישירה ב־Slack / Notion + קדימות',
    ],
    oneTimeIncludesTitle: 'כולל במסירה:',
    oneTimeIncludes: [
      'בדיקות סליקה, הזמנות וארכיטקטורה מתועדת',
      'הדרכת צוות קצרה לעבודה עצמאית על המערכות',
      '30 ימי תמיכה וייצוב לאחר ההשקה',
    ],
    mailSubjectMonthly: 'פנייה לחבילת זרוע ביצוע מנוהלת (2,990 ₪/חודש)',
    mailSubjectOneTime: 'פנייה להקמת מערך איקומרס ואוטומציה (4,900 ₪ חד־פעמי)',
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
        aria-label="בחירת מודל תשלום"
        className="relative z-20 mx-auto flex w-fit rounded-full bg-white border border-[var(--border)] p-1 shadow-sm"
      >
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
            <span>חודשי</span>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                selected === 'monthly'
                  ? 'bg-[#e6d184] !text-[#0c2f35]'
                  : 'bg-[var(--muted)] !text-[var(--foreground)]'
              }`}
            >
              ריטיינר
            </span>
          </span>
        </button>

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
          <span className="relative whitespace-nowrap">חד־פעמי</span>
        </button>
      </div>
    </div>
  );
}

interface PricingSectionProps {
  email?: string;
}

export default function PricingSection({ email = 'shayhadar850@gmail.com' }: PricingSectionProps) {
  const [billing, setBilling] = useState<'monthly' | 'onetime'>('monthly');
  const pricingRef = useRef<HTMLElement>(null);
  const isOneTime = billing === 'onetime';

  const revealVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        duration: 0.45,
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
      id="retainers"
      ref={pricingRef}
      dir="rtl"
      aria-labelledby="retainers-title"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)] px-5 py-20 md:py-24"
    >
      {/* Ambient radial glow matching Teal Treasury palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[8%] top-8 bottom-8 z-0 rounded-full"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, rgba(205, 200, 246, 0.55) 0%, rgba(168, 150, 63, 0.16) 40%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="mb-3 flex justify-center">
            <span className="sec-label">מסלולי עבודה</span>
          </div>

          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-4 leading-[1.15]"
          >
            <span id="retainers-title">מסלולים שעובדים בשביל </span>
            <TimelineContent
              as="span"
              animationNum={1}
              timelineRef={pricingRef}
              customVariants={revealVariants}
              className="inline-block rounded-xl border border-dashed border-[#a8963f] bg-[#e6d184]/25 px-3 py-0.5 text-[#0f3238]"
            >
              העסק והצוות
            </TimelineContent>
          </TimelineContent>

          <TimelineContent
            as="p"
            animationNum={2}
            timelineRef={pricingRef}
            customVariants={revealVariants}
            className="mx-auto max-w-xl text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed"
          >
            בחרו ריטיינר חודשי קבוע ליציבות מלאה, או הזמנה חד־פעמית לפי צורך — תוצרים ברורים בלי הפתעות.
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
                      ? 'border-[#0f3238] bg-[#f4f7f4] ring-2 ring-[#0f3238] shadow-[0_28px_60px_-32px_rgba(12,47,53,0.45)]'
                      : 'border-[var(--border)] bg-white shadow-[0_20px_44px_-34px_rgba(16,41,45,0.22)] hover:border-[var(--ring)]'
                  }`}
                >
                  <CardHeader className="text-right pb-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-2xl font-semibold text-[var(--foreground)]">
                        {activeName}
                      </h3>
                      {plan.popular && (
                        <span className="shrink-0 rounded-full bg-[#0f3238] px-3 py-1 text-xs font-semibold text-[#e6d184]">
                          מומלץ
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
                      <span className="inline-flex items-baseline gap-1 text-4xl font-bold tracking-tight text-[var(--foreground)]">
                        <NumberFlow
                          value={activePrice}
                          locales="en-US"
                          className="text-4xl font-bold"
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
                      className={`mb-6 flex w-full items-center justify-center rounded-xl !px-5 !py-3.5 text-base font-semibold !text-white transition-all duration-200 ${
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
            ? 'המחירים לפני מע״מ · תכולה ולוחות זמנים נקבעים מראש לפני תחילת העבודה · ניתן להמשיך לאחר המסירה לריטיינר תחזוקה.'
            : 'המחירים לפני מע״מ · ניתן להתחיל מפיילוט קצר או חודש ניסיון ללא התחייבות · פעילות א׳–ה׳ 09:00–18:00.'}
        </p>
      </div>
    </section>
  );
}
