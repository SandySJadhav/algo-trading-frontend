import { MONTHS, getMomentPayload, getISTTime } from '../moment';
import Firestore from './firestore';

interface instrument_prop {
  id?: string;
  token: any;
  symbol: string;
  name: string;
  expiry: string;
  lotsize: any;
  instrumenttype:
    | 'OPTFUT'
    | 'FUTCOM'
    | 'OPTSTK'
    | 'OPTIDX'
    | 'FUTSTK'
    | 'FUTIDX';
  exch_seg: string;
  tick_size: any;
  rel_keywords?: string[];
  matches?: any;
  displayName?: string;
}

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
  const instruments_collection = Firestore.db.collection('instruments');
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
      body: {
        statusCode: 200,
        data: []
      }
    };
  }

  const results: instrument_prop[] = [];
  response.forEach((res: any) => {
    const resData = res.data();
    const { symbol, exch_seg, name, instrumenttype, expiry } = resData;
    if (exch_seg !== 'NSE') {
      const payload = getMomentPayload(expiry);
      const expiryDate = getISTTime().set(payload);
      let newSymbol = name;
      const month = MONTHS[expiryDate.month()]; // month = JAN
      const expDate = expiry.split(month)[0]; // expDate = 31

      newSymbol += ' ' + expDate + ' ' + month + ' ' + expiryDate.year();

      if (['FUTCOM', 'FUTSTK', 'FUTIDX'].includes(instrumenttype)) {
        newSymbol += ' FUT';
      } else if (['OPTFUT', 'OPTSTK', 'OPTIDX'].includes(instrumenttype)) {
        let wrdStr = symbol.substring(name.length);
        const optionType = wrdStr.endsWith('CE') ? 'CE' : 'PE';
        wrdStr = wrdStr.substring(0, wrdStr.length - 2);
        if (instrumenttype === 'OPTFUT') {
          // MCX option
          wrdStr = wrdStr.substring(5); // output = 7000
        } else {
          // NFO option
          wrdStr = wrdStr.substring(7); // output = 7000
        }
        newSymbol += ' ' + wrdStr + ' ' + optionType;
      }

      results.push({
        ...resData,
        displayName: newSymbol
      });
    } else {
      results.push(resData);
    }
  });

  const data = getFilteredResults(results, allKeywords);

  return {
    status: 200,
    body: {
      statusCode: 200,
      data
    }
  };
};

export default searchInstruments;
