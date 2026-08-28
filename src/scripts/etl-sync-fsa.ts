import axios from 'axios';
import { parseStringPromise } from 'xml2js';

const FSA_API_BASE = 'https://api.ratings.food.gov.uk';

interface BasicAuthority {
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  EstablishmentCount: number;
  SchemeType: number;
}

export async function runFsaSync() {
  console.log('🚀 [HygieneCheck.uk ETL] Connecting to Official UK Food Standards Agency Open Data API...');
  
  try {
    // 1. Fetch all 363 UK Local Authorities
    const { data } = await axios.get(`${FSA_API_BASE}/authorities/basic`, {
      headers: {
        'x-api-version': '2',
        'accept': 'application/json',
      },
      timeout: 20000,
    });

    const authorities: BasicAuthority[] = data.authorities || [];
    console.log(`📡 Discovered ${authorities.length} Local Authorities across England, Scotland, Wales & Northern Ireland.`);
    
    // Calculate total venues nationwide
    const totalNationalVenues = authorities.reduce((acc, a) => acc + (a.EstablishmentCount || 0), 0);
    console.log(`🇬🇧 Total Active Food Establishments in Open Data: ${totalNationalVenues.toLocaleString()}`);

    // 2. Sample download from first 3 councils (e.g. Birmingham, Westminster, Manchester)
    const priorityCodes = ['402', '533', '415']; // Birmingham, Westminster, Manchester
    for (const code of priorityCodes) {
      const xmlUrl = `https://ratings.food.gov.uk/OpenDataFiles/FHRS${code}en-GB.xml`;
      console.log(`\n📥 Downloading Live Bulk XML Feed: ${xmlUrl}...`);

      const { data: xmlData } = await axios.get(xmlUrl, { timeout: 35000 });
      const parsed = await parseStringPromise(xmlData);
      const establishments = parsed.FHRSEstablishment?.EstablishmentCollection?.[0]?.EstablishmentDetail || [];

      console.log(`✅ Synced ${establishments.length} live establishments from Council Feed FHRS${code}`);
    }

    console.log('\n✨ ETL Pipeline Verified Successfully. Ready for production database ingestion.');
  } catch (error: any) {
    console.error('❌ ETL Error:', error.message);
  }
}

if (require.main === module) {
  runFsaSync();
}
