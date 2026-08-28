export interface Establishment {
  fhrsId: number;
  localAuthorityId: number;
  businessName: string;
  businessTypeLabel: string;
  slug: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  postcode: string;
  outcode: string;
  latitude: number;
  longitude: number;
  ratingValue: string; // '0' | '1' | '2' | '3' | '4' | '5' | 'Pass' | 'Improvement Required'
  ratingDate: string;
  newRatingPending: boolean;
  hygieneScore: number; // 0 (best) to 25 (worst)
  structuralScore: number; // 0 (best) to 25 (worst)
  managementScore: number; // 0 (best) to 30 (worst)
  schemeType: 'FHRS' | 'FHIS';
}

export interface InspectionRecord {
  id: string | number;
  fhrsid?: number;
  businessName?: string;
  ratingValue: string;
  ratingDate: string;
  localAuthorityName?: string;
  hygieneScore?: number;
  structuralScore?: number;
  managementScore?: number;
}

export interface LocalAuthority {
  authorityId: number;
  name: string;
  slug: string;
  totalVenues: number;
  averageScore: number;
  xmlUrl: string;
  lastSyncedAt: string;
}

export interface SubScoreDetail {
  hygiene: number;
  structural: number;
  management: number;
}

export interface NearbyVenue {
  name: string;
  distance: string;
  score: number | string;
  address: string;
  slug: string;
}

export interface VenueDetail {
  fhrsid: string;
  name: string;
  businessType: string;
  address: string;
  city: string;
  postcode: string;
  ratingValue: string;
  ratingText: string;
  ratingDate: string;
  formattedDate: string;
  council: string;
  councilCode: string;
  councilEmail: string;
  subScores: SubScoreDetail;
  failureReason: string | null;
  timelineRecords: InspectionRecord[];
  nearbyCleanVenues: NearbyVenue[];
}

export function formatInspectionDate(dateStr?: string): string {
  if (!dateStr) return 'Date Pending';
  const clean = dateStr.split('T')[0].trim();
  const parts = clean.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIdx = parseInt(month, 10) - 1;
    if (monthIdx >= 0 && monthIdx < 12) {
      const dayNum = parseInt(day, 10);
      return `${!isNaN(dayNum) ? dayNum : day} ${monthNames[monthIdx]} ${year}`;
    }
  }
  return dateStr;
}

export function checkIsFailedRating(rating?: string): boolean {
  if (!rating) return false;
  const clean = rating.trim().toLowerCase();
  if (clean === '0' || clean === '1' || clean === 'improvement required') {
    return true;
  }
  return false;
}

export function checkIsGoodRating(rating?: string): boolean {
  if (!rating) return false;
  const clean = rating.trim().toLowerCase();
  if (clean === '5' || clean === '4' || clean === 'pass') {
    return true;
  }
  const num = parseInt(clean, 10);
  return !isNaN(num) && num >= 4;
}

export function parseVenueSlug(rawSlug: string): {
  businessName: string;
  postcode: string;
  fhrsid: string;
} {
  let cleanSlug = '';
  try {
    cleanSlug = decodeURIComponent(rawSlug || '').trim().toLowerCase();
  } catch {
    cleanSlug = (rawSlug || '').trim().toLowerCase();
  }

  const parts = cleanSlug.split('-').filter(Boolean);
  const lastPart = parts.length > 0 ? parts[parts.length - 1] : '';
  const fhrsid = /^\d+$/.test(lastPart) ? parts.pop()! : '100234';

  // Check if previous 2 parts resemble a UK postcode (e.g., 'wc2e', '8pb')
  let postcode = 'UK';
  if (parts.length >= 2) {
    const p2 = parts[parts.length - 1];
    const p1 = parts[parts.length - 2];
    if (/^[a-z0-9]{2,4}$/i.test(p1) && /^[a-z0-9]{3}$/i.test(p2)) {
      postcode = `${p1.toUpperCase()} ${p2.toUpperCase()}`;
      parts.splice(parts.length - 2, 2);
    }
  } else if (parts.length === 1 && /^[a-z]{1,2}\d{1,2}[a-z]?$/i.test(parts[0])) {
    postcode = parts[0].toUpperCase();
    parts.pop();
  }

  const businessName = parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Food Establishment';

  return {
    businessName,
    postcode,
    fhrsid,
  };
}
