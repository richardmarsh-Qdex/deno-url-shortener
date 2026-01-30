import { ShortUrl } from "../types.ts";

export class MemoryStorage {
  private urls = new Map<string, ShortUrl>();

  save(url: ShortUrl): void {
    this.urls.set(url.id, url);
  }

  findById(id: string): ShortUrl | undefined {
    return this.urls.get(id);
  }

  findAll(): ShortUrl[] {
    return Array.from(this.urls.values());
  }

  delete(id: string): boolean {
    return this.urls.delete(id);
  }

  incrementClicks(id: string): void {
    const url = this.urls.get(id);
    if (url) {
      url.clicks++;
      this.urls.set(id, url);
    }
  }
}
