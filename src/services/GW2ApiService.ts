import axios from 'axios';

export class GW2ApiService {
  private readonly baseUrl = 'https://api.guildwars2.com/v2/';

  constructor() {}

  async get(endpoint: string, params = {}) {
    const response = await axios.get(`${this.baseUrl}${endpoint}`, { params });
    return response.data;
  }
}
