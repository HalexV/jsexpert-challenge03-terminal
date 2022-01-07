import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000';

axios.defaults.baseURL = API_BASE_URL
axios.defaults.validateStatus = null

class IncomeRepository {
  async makeRequest(url) {
    const {data, status} = await axios.get(url)
    return {data, status};
  }

  async getConversions() {
    
    const {data, status} = await this.makeRequest('/convert')

    if (status !== 200) throw new Error('getConversions API call is not 200')

    const { results } = data

    return results;
  }
}

export default IncomeRepository;
