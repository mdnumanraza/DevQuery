import axios from 'axios';
// const apikey = process.env.REACT_APP_ANALYZER_API;
const PERSPECTIVE_API_KEY = 'AIzaSyDHLKnJN0-fJAlslCE-XBjFMNVNeG0OsqA'
// const PERSPECTIVE_API_KEY = apikey;
const PERSPECTIVE_API_URL = 'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze';

const postAnalyzer = async (text) => {
  try {
    const response = await axios.post(PERSPECTIVE_API_URL, {
      comment: { text },
      requestedAttributes: { TOXICITY: {} },
    }, {
      params: {
        key: PERSPECTIVE_API_KEY,
      },
    });

    return response.data.attributeScores.TOXICITY.summaryScore.value;
  } catch (error) {
    alert('your text cannot be processed... please add more content ')
    throw error;
  }
};

export default postAnalyzer;
