export default class HttpClient {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetch(url, options) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': "application/json",
        ...options.headers
      }
    });

    let data;
    try {
      data = await response.json();
    }
    catch (err) {
      console.error(err)
    }
    if (response.status > 299 || response.status < 200) {
      const message = data && data.message ? data.message : "Somethinng went wrong"
      throw new Error(message)
    }
    return data;
  }


}