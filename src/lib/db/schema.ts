import { pgTable, serial, text, integer, boolean, timestamp, real, index, uniqueIndex } from 'drizzle-orm/pg-core';

// ============================================================
// LOCAL AUTHORITIES TABLE — 363 UK Councils
// ============================================================
export const localAuthorities = pgTable('local_authorities', {
  id: serial('id').primaryKey(),
  authorityId: integer('authority_id').notNull().unique(),
  authorityIdCode: text('authority_id_code').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  schemeType: text('scheme_type').notNull().default('FHRS'), // 'FHRS' | 'FHIS'
  totalVenues: integer('total_venues').notNull().default(0),
  region: text('region'),
  email: text('email'),
  phone: text('phone'),
  websiteUrl: text('website_url'),
  lastSyncedAt: timestamp('last_synced_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex('la_slug_idx').on(table.slug),
  authorityIdIdx: uniqueIndex('la_authority_id_idx').on(table.authorityId),
}));

// ============================================================
// ESTABLISHMENTS TABLE — 500,000+ UK Food Venues
// ============================================================
export const establishments = pgTable('establishments', {
  id: serial('id').primaryKey(),
  fhrsId: integer('fhrs_id').notNull(),
  localAuthorityId: integer('local_authority_id').notNull(),
  localAuthoritySlug: text('local_authority_slug').notNull(),
  businessName: text('business_name').notNull(),
  businessTypeId: integer('business_type_id'),
  businessTypeLabel: text('business_type_label'),
  slug: text('slug').notNull().unique(),
  addressLine1: text('address_line1'),
  addressLine2: text('address_line2'),
  addressLine3: text('address_line3'),
  postcode: text('postcode'),
  outcode: text('outcode'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  ratingValue: text('rating_value'), // '0'-'5' or 'Pass' or 'Improvement Required'
  ratingDate: text('rating_date'),
  newRatingPending: boolean('new_rating_pending').default(false),
  hygieneScore: integer('hygiene_score'),     // 0 (best) to 25 (worst)
  structuralScore: integer('structural_score'), // 0 (best) to 25 (worst)
  managementScore: integer('management_score'), // 0 (best) to 30 (worst)
  schemeType: text('scheme_type').notNull().default('FHRS'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  fhrsIdIdx: uniqueIndex('est_fhrs_id_idx').on(table.fhrsId),
  slugIdx: uniqueIndex('est_slug_idx').on(table.slug),
  postcodeIdx: index('est_postcode_idx').on(table.postcode),
  outcodeIdx: index('est_outcode_idx').on(table.outcode),
  laSlugIdx: index('est_la_slug_idx').on(table.localAuthoritySlug),
  ratingIdx: index('est_rating_idx').on(table.ratingValue),
  ratingDateIdx: index('est_rating_date_idx').on(table.ratingDate),
}));

// TypeScript types
export type LocalAuthority = typeof localAuthorities.$inferSelect;
export type NewLocalAuthority = typeof localAuthorities.$inferInsert;
export type Establishment = typeof establishments.$inferSelect;
export type NewEstablishment = typeof establishments.$inferInsert;
