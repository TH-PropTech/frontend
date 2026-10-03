export interface PageParams {
  page: number
  limit: number
}

const ROOT = 'fabric-audit' as const

/** Every Audit Center query key is built here so invalidation and caching stay predictable. */
export const fabricAuditKeys = {
  all: [ROOT] as const,
  overview: () => [ROOT, 'overview'] as const,
  eventsRoot: () => [ROOT, 'events'] as const,
  events: (query: object) => [ROOT, 'events', 'list', query] as const,
  event: (id: string) => [ROOT, 'events', 'detail', id] as const,
  governanceRoot: () => [ROOT, 'governance'] as const,
  governanceList: (params: PageParams) =>
    [ROOT, 'governance', 'list', params] as const,
  governanceVerification: (id: string) =>
    [ROOT, 'governance', 'verification', id] as const,
  runsRoot: () => [ROOT, 'runs'] as const,
  runs: (params: PageParams) => [ROOT, 'runs', 'list', params] as const,
  run: (id: string) => [ROOT, 'runs', 'detail', id] as const,
  findings: (runId: string, query: object) =>
    [ROOT, 'runs', 'findings', runId, query] as const,
}
