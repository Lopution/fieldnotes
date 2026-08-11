(() => {
  document.documentElement.dataset.fieldnotesVersion = '1.1';
  document.title = 'FIELDNOTES — AI 与交流观察';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', 'FIELDNOTES 记录 AI 进入交流之后，交流中的角色、路径与关系如何变化。');
  }

  const setText = (selector, text) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = text;
    return node;
  };

  setText('.hero-copy .eyebrow', 'FIELDNOTES · 独立交流观察计划');
  setText('.hero-copy h1', 'AI 进入交流之后，谁在说、如何传递、由谁理解，都开始变化。');
  setText('.hero-copy .hero-deck', 'FIELDNOTES 记录这些变化。我们从具体事件出发，保存材料、描述可观察行为、比较重复出现的结构，并把解释放在最后。');

  const heroQuietLink = document.querySelector('.hero-actions .quiet-link');
  if (heroQuietLink) {
    heroQuietLink.href = '#club';
    heroQuietLink.textContent = 'Fieldnotes Club';
  }

  const headerStatus = document.querySelector('.header-status');
  if (headerStatus) {
    headerStatus.setAttribute('aria-label', '项目管理者');
    headerStatus.innerHTML = '<span class="status-dot"></span><span>管理 · Lopution</span>';
  }

  document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
    if (link.getAttribute('href') === '#participate' || link.textContent.trim() === '参与') {
      link.href = '#club';
      link.textContent = 'Club';
    }
  });

  const observe = document.querySelector('#observe .section-heading');
  if (observe) {
    const h2 = observe.querySelector('h2');
    const copy = observe.querySelector(':scope > p');
    if (h2) h2.textContent = '同一个 AI，在不同交流里可能处在完全不同的位置。';
    if (copy) copy.textContent = '它可以帮助表达，也可以转述、代理、参与，甚至成为交流环境的一部分。FIELDNOTES 记录这些位置如何在具体事件中出现；分类只是工作工具，新的材料可以随时修正它。';
  }

  const methodHeading = document.querySelector('#method .section-heading h2');
  if (methodHeading) methodHeading.textContent = '先记录，再比较；只有材料足够，才解释。';

  const methodBoard = document.querySelector('#method .method-board');
  if (methodBoard && !document.querySelector('.method-console')) {
    const console = document.createElement('div');
    console.className = 'method-console';
    console.setAttribute('aria-label', 'FIELDNOTES 方法界面示意');
    console.innerHTML = `
      <header class="method-console__header">
        <div>
          <p class="mono-label">FIELDNOTE PIPELINE</p>
          <h3>一条交流事件如何进入档案</h3>
        </div>
        <div class="method-console__state">
          <span class="console-state-dot" aria-hidden="true"></span>
          <span>STRUCTURE ONLY</span>
        </div>
      </header>

      <div class="method-console__body">
        <aside class="intake-panel">
          <div class="console-panel-head">
            <span>01</span>
            <strong>事件输入</strong>
            <small>EVENT INTAKE</small>
          </div>

          <dl class="intake-fields">
            <div><dt>语境</dt><dd>〔Context〕</dd></div>
            <div><dt>参与者</dt><dd>〔Human / AI / Group〕</dd></div>
            <div><dt>AI 角色</dt><dd>〔Role〕</dd></div>
          </dl>

          <div class="intake-topology" aria-label="拓扑占位示意">
            <span class="mini-human"></span><i></i><span class="mini-ai mini-ai--active"></span><i></i><span class="mini-human"></span>
          </div>
          <p class="console-caption">先描述这是一场什么交流，不预设它意味着什么。</p>
        </aside>

        <div class="pipeline-stack">
          <article class="pipeline-row pipeline-row--evidence">
            <div class="pipeline-index">02</div>
            <div class="pipeline-icon evidence-mini" aria-hidden="true"></div>
            <div>
              <p class="mono-label">EVIDENCE</p>
              <h4>保存材料</h4>
              <p>链接、截图、对话记录或第一手描述。</p>
            </div>
            <span class="pipeline-status pipeline-status--pending">待核查</span>
          </article>

          <article class="pipeline-row">
            <div class="pipeline-index">03</div>
            <div class="pipeline-icon observation-mini" aria-hidden="true"></div>
            <div>
              <p class="mono-label">OBSERVATION</p>
              <h4>写下可观察行为</h4>
              <p>只保留材料能够直接支持的描述。</p>
            </div>
            <span class="pipeline-status">可记录</span>
          </article>

          <article class="pipeline-row pipeline-row--compare">
            <div class="pipeline-index">04</div>
            <div class="pipeline-icon compare-mini" aria-hidden="true"></div>
            <div>
              <p class="mono-label">COMPARE</p>
              <h4>与其他事件比较</h4>
              <p>寻找重复出现的角色、路径和结果。</p>
            </div>
            <span class="pipeline-status pipeline-status--waiting">等待材料</span>
          </article>
        </div>

        <aside class="decision-panel">
          <div class="decision-block">
            <span class="decision-lock" aria-hidden="true"></span>
            <p class="mono-label">PATTERN</p>
            <h4>模式暂不命名</h4>
            <p>单一事件不能成为模式。需要更多独立材料支持。</p>
          </div>
          <div class="decision-divider" aria-hidden="true"><span></span></div>
          <div class="decision-block decision-block--interpretation">
            <span class="decision-wave" aria-hidden="true">∿</span>
            <p class="mono-label">INTERPRETATION</p>
            <h4>解释可以缺席</h4>
            <p>材料不足时，最准确的处理就是暂不解释。</p>
          </div>
        </aside>
      </div>

      <footer class="method-console__footer">
        <span>Event</span><i></i><span>Evidence</span><i></i><span>Observation</span><i></i><span>Compare</span><i></i><span>Pattern</span><i></i><span>Interpretation</span>
      </footer>`;

    methodBoard.insertAdjacentElement('afterend', console);
  }

  const noteHeading = document.querySelector('#field-note .section-heading');
  if (noteHeading) {
    const h2 = noteHeading.querySelector('h2');
    const copy = noteHeading.querySelector(':scope > p');
    if (h2) h2.textContent = '一条 Field Note，不从结论开始。';
    if (copy) copy.textContent = '它先保存证据，再写下可观察到的行为；解释被单独放置，也允许长期空缺。第一批已核查条目尚未发布。';
  }

  const archiveHeading = document.querySelector('#archive .section-heading h2');
  if (archiveHeading) archiveHeading.textContent = '只有当事件开始重复，模式才值得被命名。';

  const clubSection = document.querySelector('#participate') || document.querySelector('#club');
  if (clubSection) {
    clubSection.id = 'club';
    clubSection.className = 'content-section club-section';
    clubSection.innerHTML = `
      <div class="content-shell">
        <div class="club-panel">
          <div class="club-sign" aria-hidden="true">
            <span>F</span><i></i><span>C</span>
          </div>
          <div class="club-copy">
            <p class="eyebrow">FIELDNOTES CLUB</p>
            <h2>Fieldnotes Club</h2>
            <p>Fieldnotes Club 是 FIELDNOTES 的社群层。它与观察档案相邻，但不等同于档案本身；活动、加入方式与运行机制会在准备好后单独公布。</p>
          </div>
          <div class="club-meta">
            <div>
              <span class="mono-label">PROJECT MAINTAINER</span>
              <strong>Lopution</strong>
              <small>管理者 / Maintainer</small>
            </div>
            <div>
              <span class="mono-label">CONTACT</span>
              <strong><a class="contact-link" href="mailto:fuyian533@gmail.com">fuyian533@gmail.com</a></strong>
              <small>项目联系邮箱</small>
            </div>
          </div>
        </div>
      </div>`;
  }

  const footer = document.querySelector('.footer-inner');
  if (footer) {
    footer.innerHTML = `
      <div>
        <div class="footer-brand">FIELDNOTES</div>
        <p>AI 与交流的独立观察计划</p>
      </div>
      <div class="footer-project-meta">
        <p><span>Club</span> Fieldnotes Club</p>
        <p><span>管理者</span> Lopution</p>
        <p><span>邮箱</span> <a href="mailto:fuyian533@gmail.com">fuyian533@gmail.com</a></p>
      </div>
      <div class="footer-links">
        <a href="https://github.com/Lopution/fieldnotes" rel="noreferrer">GitHub</a>
        <span>2026 —</span>
      </div>`;
  }
})();
