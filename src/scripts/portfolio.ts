// Homepage interactive controls and scroll-linked motion choreography
// CSP-safe external module: no inline HTML styles, no eval, full reduced-motion support.

interface WorkflowStep {
  id: string;
  tool: string;
  label: string;
  normalNote: string;
  edgeNote: string;
  edgeTrigger?: boolean;
}

interface WorkflowDemo {
  id: string;
  projectSlug: string;
  title: string;
  shortLabel: string;
  fromChip: string;
  toChip: string;
  edgeLabel: string;
  summary: string;
  steps: WorkflowStep[];
}

interface ArchProject {
  id: string;
  shortTitle: string;
  title: string;
  category: string;
  status: string;
  role: string;
  techStack: string[];
  diagram: { title: string; detail: string }[];
  repository: string;
}

interface TrackItem {
  id: string;
  label: string;
  subtitle: string;
  focus: string;
  deliverables: string[];
  handoff: string;
  mailSubject: string;
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopWide = window.matchMedia('(min-width: 960px)');

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function nowTimeCode(): string {
  const d = new Date();
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${mm}:${ss}`;
}

/* ==========================================================================
   1. HERO INTERACTIVE DASHBOARD & FLOATING FLOW CARD
   ========================================================================== */

function initHeroDashboard(): void {
  const dash = document.querySelector<HTMLElement>('[data-hero-dashboard]');
  if (!dash) return;

  const demosRaw = dash.dataset.workflowDemos;
  const demos: WorkflowDemo[] = demosRaw ? JSON.parse(demosRaw) : [];
  let activeMode: 'overview' | 'workflow' | 'log' = 'overview';
  let activeProject = dash.dataset.defaultProject || 'model-studio';
  let activeDemo = demos[0];
  let edgeMode = false;
  let currentStep = 0;
  let runningTimer = 0;
  let logFilter: 'all' | 'done' | 'guard' = 'all';

  const modeBtns = Array.from(dash.querySelectorAll<HTMLButtonElement>('[data-dash-mode]'));
  const panels = Array.from(dash.querySelectorAll<HTMLElement>('[data-dash-panel]'));
  const projectBtns = Array.from(dash.querySelectorAll<HTMLButtonElement>('[data-select-project]'));
  const projectPanes = Array.from(dash.querySelectorAll<HTMLElement>('[data-project-pane]'));
  const crumbEl = dash.querySelector<HTMLElement>('[data-dash-crumb]');
  const statusPill = dash.querySelector<HTMLElement>('[data-dash-status-pill]');
  const statusText = dash.querySelector<HTMLElement>('[data-dash-status-text]');

  // Floating Card 1 elements
  const floatOpenBtn = document.querySelector<HTMLButtonElement>('[data-float-open-demo]');
  const floatTitle = document.querySelector<HTMLElement>('[data-float-title]');
  const floatBadge = document.querySelector<HTMLElement>('[data-float-badge]');
  const floatFrom = document.querySelector<HTMLElement>('[data-float-from]');
  const floatTo = document.querySelector<HTMLElement>('[data-float-to]');

  // Workflow Demo elements
  const presetBtns = Array.from(dash.querySelectorAll<HTMLButtonElement>('[data-wf-preset]'));
  const edgeBtn = dash.querySelector<HTMLButtonElement>('[data-wf-edge]');
  const edgeLabel = dash.querySelector<HTMLElement>('[data-wf-edge-label]');
  const runBtn = dash.querySelector<HTMLButtonElement>('[data-wf-run]');
  const runBtnLabel = dash.querySelector<HTMLElement>('[data-wf-run-label]');
  const stepBtn = dash.querySelector<HTMLButtonElement>('[data-wf-step]');
  const resetBtn = dash.querySelector<HTMLButtonElement>('[data-wf-reset]');
  const wfStatus = dash.querySelector<HTMLElement>('[data-wf-status]');
  const wfSummary = dash.querySelector<HTMLElement>('[data-wf-summary]');
  const wfSequence = dash.querySelector<HTMLOListElement>('[data-wf-sequence]');
  const wfLog = dash.querySelector<HTMLUListElement>('[data-wf-log]');

  // Ledger elements
  const ledger = dash.querySelector<HTMLUListElement>('[data-dash-ledger]');
  const logFilterBtns = Array.from(dash.querySelectorAll<HTMLButtonElement>('[data-log-filter]'));

  function flashFloatCard(title: string, from: string, to: string, badge: string): void {
    if (floatTitle) floatTitle.textContent = title;
    if (floatFrom) floatFrom.textContent = from;
    if (floatTo) floatTo.textContent = to;
    if (floatBadge) floatBadge.textContent = badge;
    if (floatOpenBtn) {
      floatOpenBtn.classList.remove('is-flashing');
      // Force reflow so flash animation restarts
      void floatOpenBtn.offsetWidth;
      floatOpenBtn.classList.add('is-flashing');
    }
  }

  function updateHeaderChrome(): void {
    if (activeMode === 'overview') {
      const activePane = projectPanes.find((p) => p.dataset.projectPane === activeProject);
      const shortName = activePane?.querySelector('.dash-proj-title')?.textContent?.trim() ?? activeProject;
      if (crumbEl) crumbEl.textContent = shortName;
      if (statusText) statusText.textContent = '6 מערכות מתועדות';
      statusPill?.removeAttribute('data-demo-active');
    } else if (activeMode === 'workflow') {
      if (crumbEl) crumbEl.textContent = `הדגמת תהליך · ${activeDemo?.shortLabel ?? ''}`;
      if (statusText) statusText.textContent = 'הדגמה מקומית (Demo)';
      statusPill?.setAttribute('data-demo-active', 'true');
    } else {
      if (crumbEl) crumbEl.textContent = 'יומן פעילות ובקרות (Demo)';
      if (statusText) statusText.textContent = 'יומן הדגמה מקומי';
      statusPill?.setAttribute('data-demo-active', 'true');
    }
  }

  function setMode(mode: 'overview' | 'workflow' | 'log'): void {
    activeMode = mode;
    for (const btn of modeBtns) {
      const isMatch = btn.dataset.dashMode === mode;
      if (btn.getAttribute('role') === 'tab') {
        btn.setAttribute('aria-selected', String(isMatch));
      }
      btn.toggleAttribute('data-on', isMatch);
    }
    for (const panel of panels) {
      panel.hidden = panel.dataset.dashPanel !== mode;
    }
    updateHeaderChrome();
  }

  function setProject(projectId: string, switchToOverview = true): void {
    activeProject = projectId;
    for (const btn of projectBtns) {
      const isMatch = btn.dataset.selectProject === projectId;
      btn.setAttribute('aria-pressed', String(isMatch));
      btn.toggleAttribute('data-on', isMatch);
    }
    for (const pane of projectPanes) {
      pane.hidden = pane.dataset.projectPane !== projectId;
    }
    if (switchToOverview) setMode('overview');
    else updateHeaderChrome();

    // Sync floating card preview to chosen project
    const matchingDemo = demos.find((d) => d.projectSlug === projectId);
    if (matchingDemo) {
      flashFloatCard(matchingDemo.shortLabel, matchingDemo.fromChip, matchingDemo.toChip, 'Demo');
    }
  }

  // Model Studio screenshot switcher inside overview
  const msSwitcher = dash.querySelector<HTMLElement>('[data-ms-switcher]');
  if (msSwitcher) {
    const msBtns = Array.from(msSwitcher.querySelectorAll<HTMLButtonElement>('[data-ms-screen]'));
    const msImgs = Array.from(msSwitcher.querySelectorAll<HTMLImageElement>('[data-ms-img]'));
    for (const btn of msBtns) {
      btn.addEventListener('click', () => {
        const target = btn.dataset.msScreen;
        for (const b of msBtns) b.setAttribute('aria-pressed', String(b === btn));
        for (const img of msImgs) img.hidden = img.dataset.msImg !== target;
      });
    }
  }

  // Interactive pipeline inspector inside each project overview pane
  dash.querySelectorAll<HTMLElement>('[data-pipeline-inspector]').forEach((inspector) => {
    const btns = Array.from(inspector.querySelectorAll<HTMLButtonElement>('[data-stage-btn]'));
    const titleOut = inspector.querySelector<HTMLElement>('[data-readout-title]');
    const detailOut = inspector.querySelector<HTMLElement>('[data-readout-detail]');
    for (const btn of btns) {
      btn.addEventListener('click', () => {
        for (const b of btns) b.setAttribute('aria-pressed', String(b === btn));
        if (titleOut) titleOut.textContent = btn.dataset.stageTitle ?? '';
        if (detailOut) detailOut.textContent = btn.dataset.stageDetail ?? '';
      });
    }
  });

  // Jump from overview to workflow demo
  dash.querySelectorAll<HTMLButtonElement>('[data-jump-workflow]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetDemo = demos.find((d) => d.id === btn.dataset.jumpWorkflow);
      if (targetDemo) selectDemo(targetDemo.id);
      setMode('workflow');
    });
  });

  // Wire mode buttons & project buttons
  for (const btn of modeBtns) {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.dashMode as 'overview' | 'workflow' | 'log';
      if (mode) setMode(mode);
    });
  }

  for (const btn of projectBtns) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.selectProject;
      if (id) setProject(id, true);
    });
  }

  // Floating card opens workflow demo directly
  floatOpenBtn?.addEventListener('click', () => {
    setMode('workflow');
    dash.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
  });

  /* --- Workflow Demo Engine --- */

  function stopAutoRun(): void {
    if (runningTimer) {
      window.clearTimeout(runningTimer);
      runningTimer = 0;
    }
    if (runBtnLabel) runBtnLabel.textContent = 'הרץ הדגמה';
    runBtn?.removeAttribute('data-running');
  }

  function renderWorkflowNodes(): void {
    if (!wfSequence || !activeDemo) return;
    wfSequence.textContent = '';
    activeDemo.steps.forEach((step, idx) => {
      const li = document.createElement('li');
      li.className = 'wf-node';
      li.dataset.wfNode = String(idx);
      li.dataset.state = 'idle';

      const head = document.createElement('div');
      head.className = 'wf-node-head';

      const num = document.createElement('span');
      num.className = 'wf-node-num';
      num.textContent = String(idx + 1).padStart(2, '0');

      const badge = document.createElement('span');
      badge.className = 'wf-node-badge';
      badge.dataset.wfNodeBadge = '';
      badge.textContent = 'ממתין';

      head.append(num, badge);

      const tool = document.createElement('strong');
      tool.className = 'wf-node-tool';
      tool.dir = 'ltr';
      tool.textContent = step.tool;

      const label = document.createElement('span');
      label.className = 'wf-node-label';
      label.textContent = step.label;

      li.append(head, tool, label);
      wfSequence.appendChild(li);
    });
  }

  function appendLogEntry(title: string, note: string, pillKind: 'demo' | 'done' | 'guard', addToLedger = false): void {
    const time = nowTimeCode();

    if (wfLog) {
      const li = document.createElement('li');
      li.className = 'wf-log-entry';
      li.dataset.kind = pillKind;

      const timeEl = document.createElement('span');
      timeEl.className = 'wf-log-time';
      timeEl.dir = 'ltr';
      timeEl.textContent = time;

      const body = document.createElement('span');
      body.className = 'wf-log-body';
      const b = document.createElement('b');
      b.textContent = title;
      const small = document.createElement('small');
      small.textContent = note;
      body.append(b, small);

      const pill = document.createElement('span');
      pill.className = 'wf-log-pill';
      pill.dataset.pill = pillKind;
      pill.textContent = pillKind === 'guard' ? 'בקרת בטיחות' : pillKind === 'done' ? 'הושלם' : 'הדגמה';

      li.append(timeEl, body, pill);
      wfLog.prepend(li);
      while (wfLog.children.length > 8) {
        wfLog.lastElementChild?.remove();
      }
    }

    if (addToLedger && ledger) {
      const li = document.createElement('li');
      li.dataset.logKind = pillKind === 'guard' ? 'guard' : 'done';

      const timeEl = document.createElement('span');
      timeEl.className = 'led-time';
      timeEl.dir = 'ltr';
      timeEl.textContent = time;

      const textWrap = document.createElement('span');
      textWrap.className = 'led-text';
      const b = document.createElement('b');
      b.textContent = `${activeDemo.shortLabel} · ${title}`;
      const small = document.createElement('small');
      small.textContent = `${note} (הדגמה)`;
      textWrap.append(b, small);

      const pill = document.createElement('span');
      pill.className = 'led-pill';
      pill.dataset.s = pillKind === 'guard' ? 'guard' : 'done';
      pill.textContent = pillKind === 'guard' ? 'בקרת בטיחות' : 'הושלם';

      li.append(timeEl, textWrap, pill);
      ledger.prepend(li);
      applyLedgerFilter();
    }
  }

  function resetWorkflow(logReset = false): void {
    stopAutoRun();
    currentStep = 0;
    renderWorkflowNodes();
    if (wfStatus && activeDemo) {
      wfStatus.textContent = `מוכן להרצה · 0 מתוך ${activeDemo.steps.length} שלבים`;
    }
    if (wfSummary && activeDemo) wfSummary.textContent = activeDemo.summary;
    if (edgeLabel && activeDemo) edgeLabel.textContent = activeDemo.edgeLabel;

    if (wfLog) {
      wfLog.textContent = '';
      appendLogEntry(
        logReset ? 'ההדגמה אופסה (Demo)' : 'מוכן להרצה (Demo)',
        edgeMode
          ? `מצב חריג ובקרה פעיל עבור ${activeDemo.title}. לחצו "הרץ הדגמה" או "צעד הבא".`
          : `לחצו "הרץ הדגמה" או "צעד הבא" כדי להריץ את ${activeDemo.title}.`,
        'demo',
        false,
      );
    }
  }

  function executeStep(index: number): boolean {
    if (!activeDemo || !wfSequence) return false;
    if (index >= activeDemo.steps.length) return false;

    const step = activeDemo.steps[index];
    const nodeEl = wfSequence.querySelector<HTMLElement>(`[data-wf-node="${index}"]`);
    const badgeEl = nodeEl?.querySelector<HTMLElement>('[data-wf-node-badge]');
    const isGuard = edgeMode && Boolean(step.edgeTrigger);
    const note = edgeMode ? step.edgeNote : step.normalNote;

    if (nodeEl) {
      nodeEl.dataset.state = isGuard ? 'guard' : 'done';
    }
    if (badgeEl) {
      badgeEl.textContent = isGuard ? 'בקרה' : 'הושלם';
    }

    currentStep = index + 1;
    appendLogEntry(`${step.tool} — ${step.label}`, note, isGuard ? 'guard' : 'done', true);

    const prevTool = index > 0 ? activeDemo.steps[index - 1].tool : activeDemo.fromChip;
    flashFloatCard(step.label, prevTool, step.tool, isGuard ? 'בקרה · Demo' : `שלב ${currentStep}/5`);

    if (wfStatus) {
      if (currentStep >= activeDemo.steps.length) {
        wfStatus.textContent = edgeMode
          ? 'ההדגמה הסתיימה · חריג טופל בבקרת בטיחות (Demo)'
          : `ההדגמה הושלמה · ${activeDemo.steps.length} מתוך ${activeDemo.steps.length} שלבים (Demo)`;
      } else {
        wfStatus.textContent = `בוצע שלב ${currentStep} מתוך ${activeDemo.steps.length} · ${step.label}`;
      }
    }

    return currentStep < activeDemo.steps.length;
  }

  function runFullWorkflow(): void {
    if (!activeDemo || !wfSequence) return;
    if (runningTimer) {
      stopAutoRun();
      return;
    }
    if (currentStep >= activeDemo.steps.length) {
      resetWorkflow(false);
    }
    if (runBtnLabel) runBtnLabel.textContent = 'עצור';
    runBtn?.setAttribute('data-running', 'true');

    const stepDelay = reducedMotion.matches ? 160 : 540;

    const tick = () => {
      const idx = currentStep;
      const nodeEl = wfSequence.querySelector<HTMLElement>(`[data-wf-node="${idx}"]`);
      const badgeEl = nodeEl?.querySelector<HTMLElement>('[data-wf-node-badge]');
      if (nodeEl) nodeEl.dataset.state = 'running';
      if (badgeEl) badgeEl.textContent = 'פועל...';
      if (wfStatus && activeDemo.steps[idx]) {
        wfStatus.textContent = `מריץ שלב ${idx + 1} מתוך ${activeDemo.steps.length}: ${activeDemo.steps[idx].label}...`;
      }

      runningTimer = window.setTimeout(() => {
        const hasMore = executeStep(idx);
        if (hasMore) {
          runningTimer = window.setTimeout(tick, reducedMotion.matches ? 80 : 220);
        } else {
          stopAutoRun();
        }
      }, stepDelay);
    };

    tick();
  }

  function selectDemo(demoId: string): void {
    const found = demos.find((d) => d.id === demoId);
    if (!found) return;
    activeDemo = found;
    for (const btn of presetBtns) {
      btn.setAttribute('aria-pressed', String(btn.dataset.wfPreset === demoId));
    }
    resetWorkflow(false);
    updateHeaderChrome();
    flashFloatCard(activeDemo.shortLabel, activeDemo.fromChip, activeDemo.toChip, 'Demo');
  }

  for (const btn of presetBtns) {
    btn.addEventListener('click', () => {
      const id = btn.dataset.wfPreset;
      if (id) selectDemo(id);
    });
  }

  edgeBtn?.addEventListener('click', () => {
    edgeMode = !edgeMode;
    edgeBtn.setAttribute('aria-pressed', String(edgeMode));
    resetWorkflow(false);
  });

  runBtn?.addEventListener('click', runFullWorkflow);

  stepBtn?.addEventListener('click', () => {
    stopAutoRun();
    if (!activeDemo) return;
    if (currentStep >= activeDemo.steps.length) {
      resetWorkflow(false);
    }
    executeStep(currentStep);
  });

  resetBtn?.addEventListener('click', () => resetWorkflow(true));

  /* --- Ledger Filter --- */
  function applyLedgerFilter(): void {
    if (!ledger) return;
    const rows = Array.from(ledger.querySelectorAll<HTMLElement>('li'));
    for (const row of rows) {
      const kind = row.dataset.logKind ?? 'done';
      row.hidden = logFilter !== 'all' && kind !== logFilter;
    }
  }

  for (const btn of logFilterBtns) {
    btn.addEventListener('click', () => {
      const f = btn.dataset.logFilter as 'all' | 'done' | 'guard';
      if (!f) return;
      logFilter = f;
      for (const b of logFilterBtns) b.setAttribute('aria-selected', String(b === btn));
      applyLedgerFilter();
    });
  }

  // Initial sync
  setProject(activeProject, true);
  resetWorkflow(false);
}

/* ==========================================================================
   2. STICKY MORPHING SHOWCASE & SCENE INTERACTIVE CONTROLS
   ========================================================================== */

function initShowcaseScenes(): void {
  const showcase = document.querySelector<HTMLElement>('[data-sticky-showcase]');
  if (!showcase) return;

  const stage = showcase.querySelector<HTMLElement>('[data-feats-stage]');
  const layers = Array.from(showcase.querySelectorAll<HTMLElement>('[data-stage-layer]'));
  const blocks = Array.from(showcase.querySelectorAll<HTMLElement>('[data-feat-block]'));
  const jumpBtns = Array.from(showcase.querySelectorAll<HTMLButtonElement>('[data-jump-scene]'));
  const selectBtns = Array.from(showcase.querySelectorAll<HTMLButtonElement>('[data-select-scene]'));
  const stageNum = showcase.querySelector<HTMLElement>('[data-stage-num]');

  let activeScene = 0;
  let manualLockScrollY: number | null = null;
  let manualLockUntil = 0;

  function setScene(index: number): void {
    const next = clamp(index, 0, Math.max(0, layers.length - 1));
    if (next === activeScene && layers[next]?.hasAttribute('data-on')) return;
    activeScene = next;
    if (stage) stage.dataset.scene = String(activeScene);
    if (stageNum) stageNum.textContent = String(activeScene + 1).padStart(2, '0');

    layers.forEach((layer, idx) => {
      const on = idx === activeScene;
      layer.toggleAttribute('data-on', on);
      layer.setAttribute('aria-hidden', String(!on));
    });

    blocks.forEach((block, idx) => {
      block.toggleAttribute('data-on', idx === activeScene);
    });

    jumpBtns.forEach((btn, idx) => {
      btn.setAttribute('aria-selected', String(idx === activeScene));
    });

    selectBtns.forEach((btn, idx) => {
      btn.setAttribute('aria-pressed', String(idx === activeScene));
    });
  }

  // Deterministic scroll-center selection: mathematically guarantees 1 active scene at every scroll position
  let scrollRaf = 0;
  const syncSceneFromScroll = () => {
    scrollRaf = 0;
    if (!desktopWide.matches || !blocks.length) return;

    const now = performance.now();
    if (now < manualLockUntil) return;
    if (manualLockScrollY !== null) {
      if (Math.abs(window.scrollY - manualLockScrollY) < 48) return;
      manualLockScrollY = null;
    }

    const vh = window.innerHeight || 900;
    const focalY = vh * 0.46;
    let bestIdx = 0;
    let bestDist = Infinity;

    blocks.forEach((block, idx) => {
      const rect = block.getBoundingClientRect();
      const center = (rect.top + rect.bottom) / 2;
      const dist = Math.abs(center - focalY);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    setScene(bestIdx);
  };

  const scheduleSceneSync = () => {
    if (!scrollRaf) scrollRaf = requestAnimationFrame(syncSceneFromScroll);
  };

  window.addEventListener('scroll', scheduleSceneSync, { passive: true });
  window.addEventListener('resize', scheduleSceneSync, { passive: true });
  syncSceneFromScroll();

  // Direct jump tabs scroll smoothly to the corresponding copy block and lock briefly during scroll
  jumpBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      manualLockUntil = performance.now() + (reducedMotion.matches ? 120 : 800);
      manualLockScrollY = null;
      setScene(idx);
      const targetBlock = blocks[idx];
      if (targetBlock) {
        targetBlock.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });

  // Clicking "הצג הדגמה זו" or clicking anywhere on a copy card switches the sticky stage immediately
  selectBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      manualLockScrollY = window.scrollY;
      manualLockUntil = 0;
      setScene(idx);
    });
  });

  blocks.forEach((block, idx) => {
    block.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('a, button, .feat-inline-stage')) return;
      if (!desktopWide.matches) return;
      manualLockScrollY = window.scrollY;
      manualLockUntil = 0;
      setScene(idx);
    });
  });

  /* --- Scene 0: Catalog Readiness Checklist + Screenshot Toggle --- */
  showcase.querySelectorAll<HTMLElement>('[data-scene-catalog]').forEach((root) => {
    const rows = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-cat-row]'));
    const replayBtn = root.querySelector<HTMLButtonElement>('[data-cat-replay]');
    const viewToggle = root.querySelector<HTMLButtonElement>('[data-cat-view-toggle]');
    const checksPanel = root.querySelector<HTMLElement>('[data-cat-panel="checks"]');
    const capturePanel = root.querySelector<HTMLElement>('[data-cat-panel="capture"]');
    const countEl = root.querySelector<HTMLElement>('[data-cat-count]');
    const meterEl = root.querySelector<HTMLElement>('[data-cat-meter]');
    const stateEl = root.querySelector<HTMLElement>('[data-cat-state]');
    const cursorEl = root.querySelector<SVGElement>('[data-cat-cursor]');

    let timers: number[] = [];

    const syncMeter = () => {
      const done = rows.filter((r) => r.getAttribute('aria-pressed') === 'true').length;
      const total = rows.length;
      if (countEl) countEl.textContent = `${done} מתוך ${total} שלבים מאומתים`;
      if (meterEl) meterEl.style.width = `${(done / total) * 100}%`;
      if (stateEl) stateEl.textContent = done === total ? 'מוכן להצעה' : 'ממתין להשלמה';
    };

    const setRow = (btn: HTMLButtonElement, on: boolean) => {
      btn.setAttribute('aria-pressed', String(on));
      btn.toggleAttribute('data-on', on);
    };

    rows.forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('aria-pressed') !== 'true';
        setRow(btn, next);
        syncMeter();
      });
    });

    replayBtn?.addEventListener('click', () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];

      // Ensure checklist panel is visible
      if (checksPanel && capturePanel && viewToggle) {
        checksPanel.hidden = false;
        capturePanel.hidden = true;
        viewToggle.setAttribute('aria-pressed', 'false');
        viewToggle.textContent = 'צילום מסך';
      }

      if (reducedMotion.matches) {
        rows.forEach((r) => setRow(r, true));
        syncMeter();
        return;
      }

      rows.forEach((r) => setRow(r, false));
      cursorEl?.removeAttribute('data-at');
      cursorEl?.removeAttribute('data-click');
      syncMeter();

      rows.forEach((r, idx) => {
        const t = window.setTimeout(() => {
          setRow(r, true);
          if (idx === rows.length - 2) cursorEl?.setAttribute('data-at', 'last');
          if (idx === rows.length - 1) cursorEl?.setAttribute('data-click', 'true');
          syncMeter();
        }, 280 + idx * 360);
        timers.push(t);
      });
    });

    viewToggle?.addEventListener('click', () => {
      const showingCapture = viewToggle.getAttribute('aria-pressed') === 'true';
      const next = !showingCapture;
      viewToggle.setAttribute('aria-pressed', String(next));
      viewToggle.textContent = next ? 'בדיקות מוכנות' : 'צילום מסך';
      if (checksPanel) checksPanel.hidden = next;
      if (capturePanel) capturePanel.hidden = !next;
    });

    syncMeter();
  });

  /* --- Scene 1: AI / MCP Routing Device + Slide-Up Scenario Sheet --- */
  const aiScenarios: Record<
    string,
    {
      kicker: string;
      title: string;
      route: string;
      detail: string;
      chipA: string;
      chipB: string;
      showBridge: boolean;
    }
  > = {
    whatsapp: {
      kicker: 'WhatsApp + Notion + Gemma',
      title: 'ניתוב פנייה עם הקשר מלא',
      route: 'WhatsApp → Handler → Notion + Gemma',
      detail: 'שולף קטלוג מ־Notion, מנסח תשובה בשפת הלקוח ומתעד שיחה ב־CRM.',
      chipA: 'WhatsApp Web · קליטת הודעה',
      chipB: 'Notion CRM · סנכרון הקשר',
      showBridge: false,
    },
    mcp: {
      kicker: 'GPT Desktop Agent · MCP',
      title: 'גשר מאומת ל־Windows ול־Chrome',
      route: 'AI Agent → MCP Tools → Tunnel → Chrome',
      detail: 'הפעלת כלי מובנה על מופע ולשונית Chrome מפורשים דרך חיבור מאומת.',
      chipA: 'MCP · לשונית מאומתת',
      chipB: 'Cloudflare Tunnel · חיבור פעיל',
      showBridge: true,
    },
    readback: {
      kicker: 'בקרת שגיאות · Read-back Guard',
      title: 'הפרדת קריאת מצב מביצוע הפעולה',
      route: 'Action OK → Read Failure → Re-read Only',
      detail: 'כשקריאת המצב נכשלת, המערכת מחזירה סטטוס מופרד כדי לא להפעיל שוב פעולה שכבר בוצעה.',
      chipA: 'Read-back · ללא כפילות',
      chipB: 'Safety Policy · מאומת',
      showBridge: false,
    },
  };

  showcase.querySelectorAll<HTMLElement>('[data-scene-ai]').forEach((root) => {
    const openBtn = root.querySelector<HTMLButtonElement>('[data-ai-open-sheet]');
    const closeBtn = root.querySelector<HTMLButtonElement>('[data-ai-close-sheet]');
    const sheet = root.querySelector<HTMLElement>('[data-ai-sheet]');
    const opts = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-ai-scenario]'));
    const kickerEl = root.querySelector<HTMLElement>('[data-ai-kicker]');
    const titleEl = root.querySelector<HTMLElement>('[data-ai-title]');
    const routeEl = root.querySelector<HTMLElement>('[data-ai-route]');
    const detailEl = root.querySelector<HTMLElement>('[data-ai-detail]');
    const chipA = root.querySelector<HTMLElement>('[data-ai-chip-a-text]');
    const chipB = root.querySelector<HTMLElement>('[data-ai-chip-b-text]');
    const bridgeWrap = root.querySelector<HTMLElement>('[data-ai-bridge]');

    const setSheetOpen = (open: boolean) => {
      sheet?.toggleAttribute('data-open', open);
      openBtn?.setAttribute('aria-expanded', String(open));
      sheet?.querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
        b.tabIndex = open ? 0 : -1;
      });
    };

    const applyScenario = (key: string) => {
      const sc = aiScenarios[key];
      if (!sc) return;
      opts.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.aiScenario === key)));
      if (kickerEl) kickerEl.textContent = sc.kicker;
      if (titleEl) titleEl.textContent = sc.title;
      if (routeEl) routeEl.textContent = sc.route;
      if (detailEl) detailEl.textContent = sc.detail;
      if (chipA) chipA.textContent = sc.chipA;
      if (chipB) chipB.textContent = sc.chipB;
      if (bridgeWrap) bridgeWrap.hidden = !sc.showBridge;
    };

    setSheetOpen(false);
    openBtn?.addEventListener('click', () => setSheetOpen(true));
    closeBtn?.addEventListener('click', () => setSheetOpen(false));
    opts.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.aiScenario;
        if (key) applyScenario(key);
      });
    });
  });

  /* --- Scene 2: MailDesk SQLite Guard & Screenshot Switcher --- */
  const mailStates: Record<
    string,
    {
      tone: 'active' | 'stopped' | 'blocked';
      title: string;
      desc: string;
      seq: string;
      ledger: string;
      block: string;
      barLabel: string;
    }
  > = {
    queued: {
      tone: 'active',
      title: 'המשך מתוזמן כסדרו',
      desc: 'הנמען טרם השיב; הודעת ההמשך משויכת לתיבת ה־Gmail המקורית לפי אזור הזמן ומגבלת החשבון.',
      seq: 'פעיל · שלב 2',
      ledger: 'מתועד ונעול',
      block: 'לא חסום',
      barLabel: 'CSV → תבנית → תזמון → שליחה',
    },
    replied: {
      tone: 'stopped',
      title: 'התקבלה תשובה — ההמשך נעצר אוטומטית',
      desc: 'סנכרון התיבה זיהה תגובה מהנמען. רצף ההודעות נעצר ביומן SQLite והפנייה הועברה לתיבת התשובות.',
      seq: 'נעצר · עבר לשיחה',
      ledger: 'סטטוס: Replied',
      block: 'לא חסום',
      barLabel: 'זוהתה תשובה → עצירת המשך',
    },
    unsub: {
      tone: 'blocked',
      title: 'בקשת הסרה — עצירה ורישום בחסימה',
      desc: 'הרצף הופסק מיידית והכתובת נוספה לרשימת החסימה המקומית כדי למנוע פנייה חוזרת בעתיד.',
      seq: 'בוטל סופית',
      ledger: 'סטטוס: Unsubscribed',
      block: 'רשום בחסימה',
      barLabel: 'בקשת הסרה → רשימת חסימה',
    },
  };

  showcase.querySelectorAll<HTMLElement>('[data-scene-mail]').forEach((root) => {
    const modeBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mail-mode]'));
    const guardPanel = root.querySelector<HTMLElement>('[data-mail-panel="guard"]');
    const screenPanel = root.querySelector<HTMLElement>('[data-mail-panel="screen"]');
    const eventBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-mail-event]'));
    const decisionBox = root.querySelector<HTMLElement>('[data-mail-decision]');
    const titleEl = root.querySelector<HTMLElement>('[data-mail-title]');
    const descEl = root.querySelector<HTMLElement>('[data-mail-desc]');
    const seqEl = root.querySelector<HTMLElement>('[data-mail-seq]');
    const ledgerEl = root.querySelector<HTMLElement>('[data-mail-ledger]');
    const blockEl = root.querySelector<HTMLElement>('[data-mail-block]');
    const barLabelEl = root.querySelector<HTMLElement>('[data-mail-bar-label]');
    const barEl = root.querySelector<HTMLElement>('[data-mail-bar]');

    modeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mailMode;
        modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        if (guardPanel) guardPanel.hidden = mode !== 'guard';
        if (screenPanel) screenPanel.hidden = mode !== 'screen';
      });
    });

    eventBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.mailEvent;
        if (!key || !mailStates[key]) return;
        const st = mailStates[key];
        eventBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        if (decisionBox) decisionBox.dataset.tone = st.tone;
        if (titleEl) titleEl.textContent = st.title;
        if (descEl) descEl.textContent = st.desc;
        if (seqEl) seqEl.textContent = st.seq;
        if (ledgerEl) ledgerEl.textContent = st.ledger;
        if (blockEl) blockEl.textContent = st.block;
        if (barLabelEl) barLabelEl.textContent = st.barLabel;
        if (barEl) barEl.dataset.mailBar = key;
      });
    });
  });
}

/* ==========================================================================
   3. PROJECTS GALLERY FILTER
   ========================================================================== */

function initProjectsGallery(): void {
  const gallery = document.querySelector<HTMLElement>('[data-projects-gallery]');
  if (!gallery) return;

  const filterBtns = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-proj-filter]'));
  const cards = Array.from(gallery.querySelectorAll<HTMLElement>('[data-proj-card]'));
  const statusEl = gallery.querySelector<HTMLElement>('[data-filter-status]');

  for (const btn of filterBtns) {
    btn.addEventListener('click', () => {
      const group = btn.dataset.projFilter ?? 'all';
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      let visible = 0;
      for (const card of cards) {
        const show = group === 'all' || card.dataset.projGroup === group;
        card.hidden = !show;
        if (show) visible++;
      }
      if (statusEl) statusEl.textContent = `מוצגים ${visible} פרויקטים`;
    });
  }
}

/* ==========================================================================
   4. ARCHITECTURE EXPLORER (ALL 6 REAL PROJECTS)
   ========================================================================== */

function initArchitectureExplorer(): void {
  const explorer = document.querySelector<HTMLElement>('[data-arch-explorer]');
  if (!explorer) return;

  const projects: ArchProject[] = JSON.parse(explorer.dataset.archProjects ?? '[]');
  if (!projects.length) return;

  const selectBtns = Array.from(explorer.querySelectorAll<HTMLButtonElement>('[data-arch-select]'));
  const titleEl = explorer.querySelector<HTMLElement>('[data-arch-title]');
  const roleEl = explorer.querySelector<HTMLElement>('[data-arch-role]');
  const catEl = explorer.querySelector<HTMLElement>('[data-arch-cat]');
  const slider = explorer.querySelector<HTMLInputElement>('[data-arch-slider]');
  const counterEl = explorer.querySelector<HTMLElement>('[data-arch-step-counter]');
  const firstEl = explorer.querySelector<HTMLElement>('[data-arch-first]');
  const lastEl = explorer.querySelector<HTMLElement>('[data-arch-last]');
  const stepLabelEl = explorer.querySelector<HTMLElement>('[data-arch-step-label]');
  const nodeTitleEl = explorer.querySelector<HTMLElement>('[data-arch-node-title]');
  const nodeDetailEl = explorer.querySelector<HTMLElement>('[data-arch-node-detail]');
  const caseLink = explorer.querySelector<HTMLAnchorElement>('[data-arch-case-link]');
  const stackList = explorer.querySelector<HTMLUListElement>('[data-arch-stack]');
  const diagramList = explorer.querySelector<HTMLOListElement>('[data-arch-diagram]');

  let currentProject = projects[0];
  let currentStep = 0;

  function syncStep(stepIdx: number): void {
    const maxIdx = currentProject.diagram.length - 1;
    currentStep = clamp(stepIdx, 0, maxIdx);
    const node = currentProject.diagram[currentStep];

    if (slider) {
      slider.max = String(maxIdx);
      slider.value = String(currentStep);
      const pct = maxIdx > 0 ? (currentStep / maxIdx) * 100 : 100;
      slider.style.setProperty('--range-fill', `${pct}%`);
    }
    if (counterEl) {
      counterEl.textContent = `שלב ${currentStep + 1} מתוך ${currentProject.diagram.length}`;
    }
    if (stepLabelEl) stepLabelEl.textContent = `שלב ${String(currentStep + 1).padStart(2, '0')}`;
    if (nodeTitleEl && node) nodeTitleEl.textContent = node.title;
    if (nodeDetailEl && node) nodeDetailEl.textContent = node.detail;

    if (diagramList) {
      const items = Array.from(diagramList.querySelectorAll<HTMLElement>('[data-arch-step]'));
      items.forEach((li, i) => {
        li.toggleAttribute('data-active', i === currentStep);
        li.toggleAttribute('data-passed', i < currentStep);
        const btn = li.querySelector<HTMLButtonElement>('[data-arch-step-btn]');
        btn?.setAttribute('aria-pressed', String(i === currentStep));
      });
    }
  }

  function renderProject(proj: ArchProject): void {
    currentProject = proj;
    selectBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.archSelect === proj.id)));

    if (titleEl) {
      titleEl.textContent = '';
      const bdi = document.createElement('bdi');
      bdi.dir = 'ltr';
      bdi.textContent = proj.title;
      titleEl.appendChild(bdi);
    }
    if (roleEl) roleEl.textContent = proj.role;
    if (catEl) catEl.textContent = `${proj.category} · ${proj.status}`;
    if (firstEl) firstEl.textContent = proj.diagram[0]?.title ?? '';
    if (lastEl) lastEl.textContent = proj.diagram[proj.diagram.length - 1]?.title ?? '';
    if (caseLink) caseLink.href = `/projects/${proj.id}/`;

    if (stackList) {
      stackList.textContent = '';
      proj.techStack.forEach((tech) => {
        const li = document.createElement('li');
        li.dir = 'ltr';
        li.textContent = tech;
        stackList.appendChild(li);
      });
    }

    if (diagramList) {
      diagramList.textContent = '';
      proj.diagram.forEach((node, idx) => {
        const li = document.createElement('li');
        li.className = 'arch-step-card';
        li.dataset.archStep = String(idx);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'arch-step-trigger';
        btn.dataset.archStepBtn = String(idx);
        btn.setAttribute('aria-pressed', String(idx === 0));

        const num = document.createElement('span');
        num.className = 'arch-step-index';
        num.dir = 'ltr';
        num.textContent = String(idx + 1).padStart(2, '0');

        const copy = document.createElement('span');
        copy.className = 'arch-step-copy';
        const strong = document.createElement('strong');
        strong.dir = 'ltr';
        strong.textContent = node.title;
        const span = document.createElement('span');
        span.textContent = node.detail;
        copy.append(strong, span);

        const dot = document.createElement('span');
        dot.className = 'arch-step-dot';
        dot.setAttribute('aria-hidden', 'true');

        btn.append(num, copy, dot);
        btn.addEventListener('click', () => syncStep(idx));
        li.appendChild(btn);
        diagramList.appendChild(li);
      });
    }

    syncStep(0);
  }

  selectBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const found = projects.find((p) => p.id === btn.dataset.archSelect);
      if (found) renderProject(found);
    });
  });

  slider?.addEventListener('input', () => {
    syncStep(Number(slider.value));
  });

  // Bind initial SSR buttons
  if (diagramList) {
    diagramList.querySelectorAll<HTMLButtonElement>('[data-arch-step-btn]').forEach((btn) => {
      btn.addEventListener('click', () => syncStep(Number(btn.dataset.archStepBtn ?? '0')));
    });
  }
  syncStep(0);
}

/* ==========================================================================
   5. COLLABORATION BAND (ADDON ACCORDION & TRACK SELECTOR)
   ========================================================================== */

function initCollaborationBand(): void {
  const band = document.querySelector<HTMLElement>('[data-collab-band]');
  if (!band) return;

  const addonBtn = band.querySelector<HTMLButtonElement>('[data-addon-btn]');
  const addonPanel = band.querySelector<HTMLElement>('[data-addon-panel]');
  const addonIcon = band.querySelector<HTMLElement>('[data-addon-icon]');

  addonBtn?.addEventListener('click', () => {
    const open = addonBtn.getAttribute('aria-expanded') !== 'true';
    addonBtn.setAttribute('aria-expanded', String(open));
    addonPanel?.toggleAttribute('data-open', open);
    addonIcon?.toggleAttribute('data-open', open);
  });

  const selector = band.querySelector<HTMLElement>('[data-track-selector]');
  if (!selector) return;

  const tracks: TrackItem[] = JSON.parse(selector.dataset.tracks ?? '[]');
  const email = selector.dataset.email ?? 'shayhadar850@gmail.com';
  const tabs = Array.from(selector.querySelectorAll<HTMLButtonElement>('[data-track-id]'));
  const titleEl = selector.querySelector<HTMLElement>('[data-track-title]');
  const subEl = selector.querySelector<HTMLElement>('[data-track-sub]');
  const focusEl = selector.querySelector<HTMLElement>('[data-track-focus]');
  const listEl = selector.querySelector<HTMLUListElement>('[data-track-deliverables]');
  const handoffEl = selector.querySelector<HTMLElement>('[data-track-handoff]');
  const mailLink = selector.querySelector<HTMLAnchorElement>('[data-track-mailto]');

  const renderTrack = (track: TrackItem) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.trackId === track.id)));
    if (titleEl) titleEl.textContent = track.label;
    if (subEl) subEl.textContent = track.subtitle;
    if (focusEl) focusEl.textContent = track.focus;
    if (handoffEl) handoffEl.textContent = track.handoff;
    if (mailLink) {
      mailLink.href = `mailto:${email}?subject=${encodeURIComponent(track.mailSubject)}`;
    }
    if (listEl) {
      listEl.textContent = '';
      track.deliverables.forEach((item) => {
        const li = document.createElement('li');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'icon-svg');
        svg.setAttribute('width', '14');
        svg.setAttribute('height', '14');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2.2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M5 12.5l4.2 4.2L19 7');
        svg.appendChild(path);

        const span = document.createElement('span');
        span.textContent = item;
        li.append(svg, span);
        listEl.appendChild(li);
      });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const found = tracks.find((t) => t.id === tab.dataset.trackId);
      if (found) renderTrack(found);
    });
  });
}

/* ==========================================================================
   6. FAQ ACCESSIBLE ACCORDIONS
   ========================================================================== */

function initFaq(): void {
  const faqGroup = document.querySelector<HTMLElement>('[data-faq-group]');
  if (!faqGroup) return;

  const buttons = Array.from(faqGroup.querySelectorAll<HTMLButtonElement>('[data-faq-btn]'));
  const panels = Array.from(faqGroup.querySelectorAll<HTMLElement>('[data-faq-panel]'));

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      buttons.forEach((b, i) => {
        const nextOpen = i === idx ? !wasOpen : false;
        b.setAttribute('aria-expanded', String(nextOpen));
        b.querySelector('.plus-icon')?.toggleAttribute('data-open', nextOpen);
        panels[i]?.toggleAttribute('data-open', nextOpen);
      });
    });
  });
}

/* ==========================================================================
   7. SCROLL-LINKED MOTION CHOREOGRAPHY (60FPS RAF + REDUCED MOTION RESPECTED)
   ========================================================================== */

function initScrollChoreography(): void {
  const riseEls = Array.from(document.querySelectorAll<HTMLElement>('[data-rise]'));
  const statRules = Array.from(document.querySelectorAll<HTMLElement>('[data-stat-rule]'));
  const checkList = document.querySelector<HTMLElement>('[data-check-list]');

  if (reducedMotion.matches) {
    riseEls.forEach((el) => el.setAttribute('data-visible', 'true'));
    statRules.forEach((r) => r.setAttribute('data-drawn', 'true'));
    checkList?.setAttribute('data-checks-drawn', 'true');
    return;
  }

  // Reveal batches on entry
  if ('IntersectionObserver' in window) {
    const riseIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute('data-visible', 'true');
            riseIo.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.02 },
    );
    riseEls.forEach((el) => riseIo.observe(el));

    const ruleIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute('data-drawn', 'true');
            ruleIo.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    statRules.forEach((r) => ruleIo.observe(r));

    if (checkList) {
      const checkIo = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            checkList.setAttribute('data-checks-drawn', 'true');
            checkIo.disconnect();
          }
        },
        { rootMargin: '0px 0px -12% 0px' },
      );
      checkIo.observe(checkList);
    }
  } else {
    riseEls.forEach((el) => el.setAttribute('data-visible', 'true'));
    statRules.forEach((r) => r.setAttribute('data-drawn', 'true'));
    checkList?.setAttribute('data-checks-drawn', 'true');
  }

  // Continuous scroll-linked elements
  const heroSec = document.querySelector<HTMLElement>('[data-hero-section]');
  const heroGlow = document.querySelector<HTMLElement>('[data-hero-glow]');
  const deviceWrap = document.querySelector<HTMLElement>('[data-device-wrap]');
  const deviceStage = document.querySelector<HTMLElement>('[data-device-stage]');
  const floatCards = Array.from(document.querySelectorAll<HTMLElement>('[data-float-card]'));
  const inkBox = document.querySelector<HTMLElement>('[data-ink-statement]');
  const inkWords = inkBox ? Array.from(inkBox.querySelectorAll<HTMLElement>('[data-ink-word]')) : [];
  const opCard = document.querySelector<HTMLElement>('[data-op-card]');
  const dialTicks = document.querySelector<SVGGElement>('[data-dial-ticks]');
  const dialRing = document.querySelector<SVGGElement>('[data-dial-ring]');

  let deviceInteracted = false;
  deviceWrap?.addEventListener('pointerdown', () => {
    deviceInteracted = true;
    schedule();
  });
  deviceWrap?.addEventListener('focusin', () => {
    deviceInteracted = true;
    schedule();
  });

  // Smoothed states for silky scrub damping
  let smoothDeviceP = 0;
  let raf = 0;

  const updateScroll = () => {
    raf = 0;
    const vh = window.innerHeight || 1;
    const isWide = desktopWide.matches;
    let needsMore = false;

    // 1. Hero perspective device standing upright on scroll
    if (deviceWrap && deviceStage) {
      const rect = deviceWrap.getBoundingClientRect();
      // At initial load (top ~55% vh), device has an inviting subtle tilt (~11deg); flattens completely by top 18% vh
      const rawP = deviceInteracted ? 1 : clamp((vh * 0.85 - rect.top) / (vh * 0.68), 0, 1);
      smoothDeviceP += (rawP - smoothDeviceP) * 0.22;
      if (Math.abs(rawP - smoothDeviceP) > 0.002) needsMore = true;
      else smoothDeviceP = rawP;

      const maxTilt = isWide ? 16 : 6;
      const minScale = isWide ? 0.94 : 0.98;
      const tilt = (1 - smoothDeviceP) * maxTilt;
      const scale = minScale + smoothDeviceP * (1 - minScale);
      deviceStage.style.transform = `rotateX(${tilt.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    }

    // 2. Hero glow parallax + floating cards drift
    if (heroSec) {
      const rect = heroSec.getBoundingClientRect();
      const progress = clamp(-rect.top / Math.max(1, rect.height), 0, 1);
      if (heroGlow) {
        const yPct = progress * 24;
        const sc = 1 + progress * 0.2;
        heroGlow.style.transform = `translate3d(-50%, ${yPct.toFixed(1)}%, 0) scale(${sc.toFixed(3)})`;
      }
      if (isWide) {
        floatCards.forEach((card, idx) => {
          const driftY = idx === 0 ? -(progress * 30) : -(progress * 14);
          const rot = idx === 0 ? progress * -1.6 : progress * 1.4;
          card.style.transform = `translate3d(0, ${driftY.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        });
      } else {
        floatCards.forEach((card) => {
          card.style.transform = '';
        });
      }
    }

    // 3. Benefits statement word-by-word ink reveal
    if (inkBox && inkWords.length) {
      const rect = inkBox.getBoundingClientRect();
      const start = vh * 0.88;
      const end = vh * 0.34;
      const p = clamp((start - rect.top) / Math.max(1, start - end), 0, 1);
      const count = inkWords.length;
      inkWords.forEach((word, i) => {
        const threshold = i / count;
        const local = clamp((p - threshold * 0.82) / 0.22, 0, 1);
        word.style.opacity = (0.16 + local * 0.84).toFixed(3);
      });
    }

    // 4. About card precision SVG dial scroll rotation
    if (opCard && dialTicks && dialRing) {
      const rect = opCard.getBoundingClientRect();
      const p = clamp((vh - rect.top) / (vh + rect.height), 0, 1);
      const degTicks = p * 140;
      const degRing = -p * 220;
      dialTicks.style.transform = `rotate(${degTicks.toFixed(2)}deg)`;
      dialRing.style.transform = `rotate(${degRing.toFixed(2)}deg)`;
    }

    if (needsMore) raf = requestAnimationFrame(updateScroll);
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(updateScroll);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  updateScroll();
}

initHeroDashboard();
initShowcaseScenes();
initProjectsGallery();
initArchitectureExplorer();
initCollaborationBand();
initFaq();
initScrollChoreography();

export {};
