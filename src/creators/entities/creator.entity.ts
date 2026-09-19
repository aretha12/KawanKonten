export interface Creator {
  id: string;
  name: string;
  handle: string;
  category: string[];
  followers: number;
  engagementRate: number; // dalam persen, contoh: 6.8
  rating: number; // rata-rata rating dari brand, 0-5
  ratingCount: number;
  suggestedRateMin: number; // rekomendasi rate card (Rp) per konten
  suggestedRateMax: number;
  createdAt: Date;
}
