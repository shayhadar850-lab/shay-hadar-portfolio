'use client';

import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToolLogo } from '@/components/ui/tool-logo';
import type { ToolItem } from '@/data/portfolio';

interface IntegrationHeroProps {
  row1: readonly ToolItem[];
  row2: readonly ToolItem[];
}

function MarqueeBubble({ tool }: { tool: ToolItem }) {
  const inner = (
    <div
      className={`integration-bubble ${tool.projectSlug ? 'is-linked' : ''}`}
      title={tool.projectTitle ? `${tool.name} — לצפייה במקרה הבוחן: ${tool.projectTitle}` : tool.name}
    >
      <span className="integration-bubble-circle">
        <ToolLogo name={tool.id} size={28} />
      </span>
      <span className="integration-bubble-name" dir="ltr">
        {tool.name}
      </span>
    </div>
  );

  if (tool.projectSlug) {
    return (
      <a
        href={`/projects/${tool.projectSlug}/`}
        className="integration-bubble-link"
        aria-label={`${tool.name} — מעבר למקרה הבוחן ${tool.projectTitle}`}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

export default function IntegrationHero({ row1, row2 }: IntegrationHeroProps) {
  return (
    <div className="integration-hero-shell" dir="rtl">
      {/* Subtle architectural dot grid matching Teal Treasury */}
      <div className="integration-hero-grid" aria-hidden="true" />
      <div className="integration-hero-glow" aria-hidden="true" />

      <div className="integration-hero-inner">
        <span className="integration-hero-pill">
          <Sparkles size={14} className="integration-pill-ic" aria-hidden="true" />
          <span>חיבור מודלי AI מובילים לכלים של הארגון</span>
        </span>

        <h3 id="tools-title" className="integration-hero-title">
          כלים, מודלי <bdi dir="ltr">AI</bdi> ומערכות <em>שעובדים יחד</em>
        </h3>

        <p className="integration-hero-lead">
          אני מחבר מודלי <bdi dir="ltr">AI</bdi> מובילים ישירות לכלים ולמערכות שבהם הצוות והארגון שלכם כבר עובדים. היום ההבדל בין צ׳אט רגיל לסוכן <bdi dir="ltr">AI</bdi> אמיתי הוא הגישה הנכונה לנתונים ולפעולות — בצורה מבוקרת ובטוחה.
        </p>

        <div className="integration-hero-cta">
          <Button asChild size="lg" className="integration-cta-btn">
            <a href="#contact">
              <span>לדבר על חיבור הכלים שלכם</span>
              <ArrowLeft size={16} aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Dual counter-scrolling infinite marquee (LTR track for exact -50% loop seam) */}
        <div className="integration-marquee-stage" dir="ltr" aria-label="לוגואים של כלים ומודלי AI">
          {/* Row 1 */}
          <div className="integration-marquee-row">
            <div className="integration-marquee-track animate-integration-left">
              {row1.map((tool, i) => (
                <MarqueeBubble key={`r1a-${tool.id}-${i}`} tool={tool} />
              ))}
              {row1.map((tool, i) => (
                <MarqueeBubble key={`r1b-${tool.id}-${i}`} tool={tool} />
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="integration-marquee-row">
            <div className="integration-marquee-track animate-integration-right">
              {row2.map((tool, i) => (
                <MarqueeBubble key={`r2a-${tool.id}-${i}`} tool={tool} />
              ))}
              {row2.map((tool, i) => (
                <MarqueeBubble key={`r2b-${tool.id}-${i}`} tool={tool} />
              ))}
            </div>
          </div>

          {/* Soft side fade overlays */}
          <div className="integration-fade integration-fade-left" aria-hidden="true" />
          <div className="integration-fade integration-fade-right" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
