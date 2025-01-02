import googleTrends from 'google-trends-api';

interface TimelineData {
  time: string;
  value: number[];
  formattedValue: string[];
}

async function testGoogleTrends() {
  try {
    const results = await googleTrends.interestOverTime({ keyword: 'prodotti biologici' });
    const parsedResults: { default: { timelineData: TimelineData[] } } = JSON.parse(results);
    console.log("Google Trends Data:", parsedResults.default.timelineData);
  } catch (error) {
    console.error("Errore nel recupero dei trend di ricerca:", error);
  }
}

testGoogleTrends();