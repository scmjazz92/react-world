export class UploadResult {
  readonly url: string

  constructor(partial: Partial<UploadResult>) {
    this.url = partial.url
  }
}
