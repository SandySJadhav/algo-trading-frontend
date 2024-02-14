import { MONTHS, getMomentPayload, getISTTime } from '../moment';
import { FirebaseDB } from './firestore';
import { instrument_prop } from '@mytypes/strategy';

const getFilteredResults = (results: instrument_prop[], query: string[]) => {
  let maxMatched = 0;
  results.forEach((result) => {
    // count matching records
    let matches = 0;
    query.forEach((item) => {
      result.rel_keywords?.forEach((keyword) => {
        if (keyword === item) {
          matches++;
        }
      });
    });
    if (matches > maxMatched) {
      maxMatched = matches;
    }
    result.matches = matches;
  });

  results.sort(function (a, b) {
    if (a.matches > b.matches) {
      return -1;
    } else if (a.matches < b.matches || a.symbol.endsWith('FUT')) {
      return 1;
    }
    return 0;
  });

  return results.filter((res) => res.matches > maxMatched - 1);
};

const searchInstruments = async (searchTerm: string) => {
  const keywords = searchTerm.toUpperCase().trim();
  const allKeywords = keywords.split(' ');
  const instruments_collection = FirebaseDB.collection('instruments');
  let response;

  if (allKeywords.length > 1) {
    const allKeywordsWithoutName = keywords
      .substring(allKeywords[0].length + 1)
      .split(' ');
    response = await instruments_collection
      .where('rel_keywords', 'array-contains-any', allKeywordsWithoutName)
      .orderBy('name')
      .startAt(allKeywords[0])
      .endAt(allKeywords[0] + '\uf8ff')
      .limit(10)
      .get();
  } else {
    response = await instruments_collection
      .where('name_keywords', 'array-contains-any', allKeywords)
      .orderBy('name')
      .startAt(allKeywords[0])
      .endAt(allKeywords[0] + '\uf8ff')
      .limit(5)
      .get();
  }

  if (response.empty) {
    return {
      status: 200,
      data: []
    };
  }

  const results: instrument_prop[] = [];
  response.forEach((res: any) => {
    const resData = res.data();
    results.push(resData);
  });

  const data = getFilteredResults(results, allKeywords);

  return {
    status: 200,
    data
  };
};

export default searchInstruments;
