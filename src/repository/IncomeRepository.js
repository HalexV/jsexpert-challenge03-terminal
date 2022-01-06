import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000';

axios.defaults.baseURL = API_BASE_URL

class IncomeRepository {
  async makeRequest(url) {
    const response = await axios.get(url)
    return response.data;
  }

  async getConversions() {
    // @TODO: Implement method
    return null;
  }
}

export default IncomeRepository;
