export interface Evidence {
  title: string;
  body: string;
}

export interface PipelineGateData {
  order: string;
  label: string;
  active?: boolean;
}

export const CHAPTER_1 = {
  gates: [
    { order: '01', label: 'UNIT' },
    { order: '02', label: 'INTEGRATION' },
    { order: '03', label: 'DOCKER E2E' },
    { order: '04', label: 'PUBLISH SHA' },
    { order: '05', label: 'SSH ROLLOUT' },
    { order: '06', label: 'HEALTH ✓', active: true },
  ] satisfies PipelineGateData[],
  evidence: [
    {
      title: 'GitHub Actions · marriage-be',
      body: 'Unit, integration, and docker-e2e gates. Deployment happens only on pushes to main. Images use immutable commit-SHA tags, publish to the registry, then roll out over SSH with Docker Compose and health-check verification.',
    },
    {
      title: 'Scaling outcome',
      body: 'Docker let the API and CPU-heavy OCR workers scale independently. Tagged servers are discovered automatically, turning worker capacity into an operational setting rather than a code change.',
    },
  ] satisfies Evidence[],
  additional: [
    {
      title: 'Shared GitLab CI · AgentBee / SmartFMS / eHealth',
      body: 'helm → sonarqube coverage → analysis → build → deploy, via shared hidden-job templates each project extends. Registry-backed buildx caching and immutable per-commit tags — though the three projects genuinely differ: SmartFMS tests inside a throwaway container with coverage wired into GitLab\'s own report UI, eHealth is the plainest of the three (no build cache, forces a rollout restart on deploy).',
    },
    {
      title: 'Live resubmission · 3 parallel pipelines',
      body: 'star-be · star-fe · Caddy reverse proxy',
    },
  ] satisfies Evidence[],
};

export const CHAPTER_2 = {
  practices: [
    'Real production server',
    'Non-root throughout',
    'Multi-stage builds',
    'Small pinned bases',
    'Strict .dockerignore',
    'Real health checks',
    'Scan final images',
  ],
  codeBefore: {
    filename: 'Dockerfile · before',
    lines: [
      'FROM php:8.3-cli',
      'COPY . /app',
      'EXPOSE 8000',
      'CMD ["php", "-S", "0.0.0.0:8000"]',
      '# root + development server',
    ],
  },
  codeAfter: {
    filename: 'Dockerfile · production',
    lines: [
      'FROM php:8.3-apache',
      'ENV APACHE_PORT=8080',
      'RUN chown -R www-data /var/run/apache2',
      'COPY --chown=www-data:www-data . /var/www/html',
      'USER www-data',
      'HEALTHCHECK CMD php health.php',
      'CMD ["apache2-foreground"]',
    ],
  },
  scanResultText: 'Both live images scan clean for serious issues.',
  scanBadge: '0 HIGH / 0 CRITICAL',
};

export const CHAPTER_3 = {
  principles: [
    {
      title: 'Fast',
      detail: 'Lock-file caches · path-specific jobs · registry Docker layer cache',
    },
    {
      title: 'Secure',
      detail:
        'Composer/npm audits · Trivy or GitLab image scan before deploy · masked protected variables · secret scanning',
    },
    {
      title: 'Maintainable',
      detail: 'Inline hidden-job templates each real job extends (how AgentBee/SmartFMS/eHealth do it today) · a shared template project for more than a handful of projects',
    },
  ],
  code: {
    filename: '.gitlab-ci.yml',
    lines: [
      'stages: [audit, test, build, scan, deploy]',
      '.backend: &backend { rules: [changes: [backend/**]] }',
      '.frontend: &frontend { rules: [changes: [frontend/**]] }',
      'composer-audit: { stage: audit, script: composer audit }',
      'phpunit: { stage: test, script: vendor/bin/phpunit }',
      'npm-audit: { stage: audit, script: npm audit }',
      'frontend-test: { stage: test, script: npm test }',
      'build-and-scan-backend:',
      '  stage: build',
      '  script: [docker buildx build --cache-from registry, trivy image]',
    ],
  },
};

export const CHAPTER_4 = {
  resources: [
    { label: 'app', value: '0.50 CPU / 256M', percent: 40 },
    { label: 'web', value: '0.25 CPU / 64M', percent: 20 },
    { label: 'db', value: '1.00 CPU / 512M', percent: 80 },
  ],
  body: 'Hard limits prevent one failing container from starving the host. I pair them with read-only filesystems, dropped capabilities, no-new-privileges, and retained seccomp/AppArmor safety.',
  measures: [
    'Never expose Docker socket',
    'Isolate networks + database',
    'Pin and scan images',
    'Inject secrets at runtime',
  ],
};

export const CHAPTER_5 = {
  threatModel: [
    {
      title: 'Unauthorized changes',
      items: ['Protected main + PRs', 'Required checks and reviewers', 'Signed commits'],
    },
    {
      title: 'Secret leakage',
      items: ['Encrypted CI storage', 'Least privilege', 'Secret scanning', 'Short-lived credentials'],
    },
    {
      title: 'Dependencies',
      items: [
        'Lock files + automated audits',
        'Scan built images',
        'Pin third-party actions to immutable versions',
        'Automated update PRs',
      ],
    },
  ],
  protectionText: 'Branch protection is enabled on both resubmission repositories.',
  protectionBadge: '2 / 2 PROTECTED',
};

export const CHAPTER_6 = {
  timeline: [
    { time: '00:00', phase: 'SIGNAL', detail: 'Intermittent frontend bundling OOM on shared GitLab runner.' },
    {
      time: '00:28',
      phase: 'CORRELATE',
      detail: 'Failures aligned with concurrent jobs; one release exhausted all retries.',
    },
    { time: '00:46', phase: 'CONTAIN', detail: 'Temporary retry restored release flow.' },
    { time: '01:15', phase: 'FIX', detail: 'Set NODE_OPTIONS="--max-old-space-size=2048" ceiling.' },
    {
      time: '~02:00',
      phase: 'PREVENT',
      detail: 'Escalated runner capacity to DevOps; retained retry as recovery layer.',
    },
  ],
  lessonLabel: 'PROPER FIX IN ABOUT 2 HOURS',
  lessonDetail: 'Bound memory; scale the runner; keep retry as recovery, not the fix.',
};

export const CHAPTER_7 = {
  primaryFlow: [
    { title: 'API', body: 'Returns a job ID immediately.' },
    { title: 'Valkey queue', body: 'Durable work handoff.' },
    { title: 'Worker', body: 'Performs hour-long OCR / AI work and writes results.' },
    { title: 'PostgreSQL', body: 'Shared status + results.' },
  ] satisfies Evidence[],
  scheduler: { title: 'Beat scheduler · singleton', body: 'Schedules recurring work without duplicate dispatch.' },
  outcomes: [
    { title: 'Independent scaling', body: 'CPU-heavy workers scale without scaling the API.' },
    { title: 'Responsive API', body: 'Long-running work never blocks the request path.' },
    { title: 'Failure isolation', body: 'Worker failure does not take down intake.' },
  ] satisfies Evidence[],
  qualification:
    'This is one product deliberately split into a few pieces-not fully independent microservices with separate databases and release cycles.',
};

export const CHAPTER_8 = {
  layers: [
    { label: '01 Timeouts', active: true },
    { label: '02 Retries only for safe / idempotent reads' },
    { label: '03 Circuit breaker' },
    { label: '04 Isolated resource pools / bulkheads' },
    { label: '05 Graceful fallback' },
    { label: '06 Health checks that control traffic' },
    { label: '07 Latency monitoring' },
  ],
  corePrinciple: 'Every dependency call must be bounded so Service B cannot exhaust Service A.',
};
