// 這是一個 Netlify Function，它會安全地在伺服器端運行

// 函式的主體
exports.handler = async function(event, context) {
  // 從前端傳來的請求中獲取 'tickers' 參數
  const tickers = event.queryStringParameters.tickers;
  
  // 從 Netlify 的環境變數中安全地讀取 API Key
  // process.env.VITE_FMP_API_KEY 會對應到您在 Netlify UI 上設定的變數
  const API_KEY = process.env.VITE_FMP_API_KEY;

  if (!tickers) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: '缺少 tickers 參數' }),
    };
  }

  const url = `https://financialmodelingprep.com/api/v3/quote/${tickers}?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '無法獲取 FMP 數據' }),
    };
  }
};
