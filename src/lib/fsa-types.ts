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
  outcode: string;
  ratingValue: string;
  ratingText: string;
  ratingDate: string;
  formattedDate: string;
  council: string;
  councilCode: string;
  councilSlug: string;
  councilEmail: string;
  subScores: SubScoreDetail;
  failureReason: string | null;
  timelineRecords: InspectionRecord[];
  nearbyCleanVenues: NearbyVenue[];
  schemeType?: 'FHRS' | 'FHIS';
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
  outcode: string;
  fhrsid: string;
  councilSlug: string;
  councilName: string;
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
  let outcode = 'UK';
  if (parts.length >= 2) {
    const p2 = parts[parts.length - 1];
    const p1 = parts[parts.length - 2];
    if (/^[a-z0-9]{2,4}$/i.test(p1) && /^[a-z0-9]{3}$/i.test(p2)) {
      outcode = p1.toUpperCase();
      postcode = `${outcode} ${p2.toUpperCase()}`;
      parts.splice(parts.length - 2, 2);
    }
  } else if (parts.length === 1 && /^[a-z]{1,2}\d{1,2}[a-z]?$/i.test(parts[0])) {
    outcode = parts[0].toUpperCase();
    postcode = outcode;
    parts.pop();
  }

  // Detect council from outcode or slug keywords
  let councilSlug = 'london';
  let councilName = 'Westminster City Council';

  const outcodeLower = outcode.toLowerCase();
  if (outcodeLower.startsWith('b') && !outcodeLower.startsWith('bs') && !outcodeLower.startsWith('bt') && !outcodeLower.startsWith('ba')) {
    councilSlug = 'birmingham';
    councilName = 'Birmingham City Council';
  } else if (outcodeLower.startsWith('m') && !outcodeLower.startsWith('me') && !outcodeLower.startsWith('mk')) {
    councilSlug = 'manchester';
    councilName = 'Manchester City Council';
  } else if (outcodeLower.startsWith('ls')) {
    councilSlug = 'leeds';
    councilName = 'Leeds City Council';
  } else if (outcodeLower.startsWith('l') && !outcodeLower.startsWith('le') && !outcodeLower.startsWith('ln') && !outcodeLower.startsWith('la') && !outcodeLower.startsWith('ll')) {
    councilSlug = 'liverpool';
    councilName = 'Liverpool City Council';
  } else if (outcodeLower.startsWith('g')) {
    councilSlug = 'glasgow';
    councilName = 'Glasgow City Council';
  } else if (outcodeLower.startsWith('eh')) {
    councilSlug = 'edinburgh';
    councilName = 'City of Edinburgh Council';
  } else if (outcodeLower.startsWith('cf')) {
    councilSlug = 'cardiff';
    councilName = 'Cardiff Council';
  } else if (outcodeLower.startsWith('nw') || outcodeLower.startsWith('n1')) {
    councilSlug = 'camden';
    councilName = 'Camden London Borough Council';
  }

  const businessName = parts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'Food Establishment';

  return {
    businessName,
    postcode,
    outcode: outcode !== 'UK' ? outcode : 'SW1A',
    fhrsid,
    councilSlug,
    councilName,
  };
}
