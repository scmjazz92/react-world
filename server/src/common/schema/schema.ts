export class PageInfo {
  readonly totalCount: number

  readonly endCursor: number | null

  readonly hasNextPage: boolean

  constructor(partial: Partial<PageInfo>) {
    Object.assign(this, partial)
  }
}
