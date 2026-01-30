export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
}

export interface CreateUrlRequest {
  url: string;
}

export interface CreateUrlResponse {
  id: string;
  shortUrl: string;
  originalUrl: string;
}
