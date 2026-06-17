import { API_ENDPOINTS } from '../../globals/consts/api.js'

const API_URL = API_ENDPOINTS.GET_PLUGIN_CONTENT
export class PluginContent {
  _cache = {}
  constructor() {}

  async loadFromId(id) {
    const url = API_URL.replace(':id', id)
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data) throw new Error('No data found')
        if (data?.data) {
          data = data.data
          this._cache[id] = data
          return data.data
        } else {
          throw new Error('Invalid data format')
        }
      })
      .catch(error => {
        console.error('Error fetching plugin content:', error)
        throw error
      })
  }
}

window.pluginContentManager = new PluginContent()
