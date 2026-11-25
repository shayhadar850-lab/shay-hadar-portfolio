'use client';

import { useState } from 'react';
import { Activity, ArrowLeft, MousePointerClick, Radio } from 'lucide-react';
import WaveMesh from '@/components/ui/wave-mesh';

type SignalVariant = 'treasury' | 'signal' | 'paper';

interface SignalTheme {
  id: SignalVariant;
  label: string;
  colors: [string, string, string];
  crests: boolean;
  light: boolean;
  statusNote: string;
}

const SIGNAL_THEMES: readonly SignalTheme[] = [
  {
    id: 'treasury',
    label: 'שקט תפעולי',
    colors: ['#071f24', '#9cbab4', '#e6d184'],
    crests: true,
    light: false,
    statusNote: 'Watchdog Horizon · 6 מערכות',
  },
  {
    id: 'signal',
    label: 'זיהוי חריגים',
    colors: ['#07080c', '#8f97a8', '#ff8a4c'],
    crests: true,
    light: false,
    statusNote: 'Anomaly Crest · תגובה מיידית',
  },
  {
    id: 'paper',
    label: 'נייר ארכיטקטוני',
    colors: ['#f3efe6', '#10292d', '#a8963f'],
    crests: true,
    light: true,
    statusNote: 'Systems Field · מצב בהיר',
  },
] as const;

const MONITORED_DOMAINS = [
  'Make / n8n',
  'CRM & Webhooks',
  'eCommerce',
  'Web & SEO',
] as const;

export function WaveSignalShowcase() {
  const [variant, setVariant] = useState<SignalVariant>('treasury');
  const active =
    SIGNAL_THEMES.find((theme) => theme.id === variant) ?? SIGNAL_THEMES[0];

  return (
    <div
      className={`wave-signal-frame ${active.light ? 'is-light' : 'is-dark'}`}
      dir="rtl"
    >
      <WaveMesh
        colors={active.colors}
        crests={active.crests}
        className="wave-signal-mesh"
      >
        <div className="wave-signal-overlay">
          {/* Top telemetry bar & interactive mode selector */}
          <div className="wave-signal-topbar">
            <div className="wave-signal-status">
              <span className="wave-signal-dot" aria-hidden="true" />
              <Radio className="wave-signal-icon" size={14} aria-hidden="true" />
              <span dir="ltr" className="wave-signal-status-text">
                {active.statusNote}
              </span>
            </div>

            <div
              className="wave-signal-tabs"
              role="tablist"
              aria-label="מצב תצוגת שדה הגלים"
            >
              {SIGNAL_THEMES.map((theme) => {
                const isSelected = theme.id === active.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`wave-signal-tab ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setVariant(theme.id)}
                  >
                    {theme.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Editorial copy floating cleanly in the horizon sky */}
          <div className="wave-signal-copy">
            <p className="wave-signal-eyebrow" dir="ltr">
              OPERATIONAL HORIZON · LIVE SYSTEM MONITORING
            </p>
            <h2 id="signal-horizon-title" className="wave-signal-title">
              כל אוטומציה, חנות ומערכת — <em>בתצפית שקטה אחת.</em>
            </h2>
            <p className="wave-signal-lead">
              במקום לגלות תקלות רק כשלקוח מתלונן, שכבת הניטור והתחזוקה השוטפת
              מזהה כל חריגה בזמן אמת ומייצבת את התשתית מאחורי הקלעים.
            </p>
          </div>

          {/* Open lower horizon leaves the wave field unobstructed for hover & click ripples */}
          <div className="wave-signal-spacer" aria-hidden="true" />

          {/* Bottom HUD strip */}
          <div className="wave-signal-foot">
            <div className="wave-signal-hint">
              <MousePointerClick size={14} aria-hidden="true" />
              <span>הזיזו את העכבר או לחצו על השדה לשליחת גל ניטור</span>
            </div>

            <div className="wave-signal-domains" aria-label="תחומים מנוטרים">
              {MONITORED_DOMAINS.map((domain) => (
                <span key={domain} className="wave-signal-chip" dir="ltr">
                  <Activity size={12} aria-hidden="true" />
                  {domain}
                </span>
              ))}
            </div>

            <a href="#services-monitoring" className="wave-signal-cta">
              <span>איך הניטור עובד בפועל</span>
              <ArrowLeft size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </WaveMesh>
    </div>
  );
}

export default WaveSignalShowcase;
