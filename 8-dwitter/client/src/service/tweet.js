export default class TweetService {
  // tweets = [
  //   {
  //     id: 1,
  //     text: '드림코딩에서 강의 들으면 너무 좋으다',
  //     createdAt: '2021-05-09T04:20:57.000Z',
  //     name: 'Bob',
  //     username: 'bob',
  //     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  //   },
  // ];
  // constructor(baseUrl) {
  //   this.baseUrl = baseUrl;
  // }
  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    // return username
    //   ? this.tweets.filter((tweet) => tweet.username === username)
    //   : this.tweets;
    const query = username ? `?username=${username}` : "";
    // const response = this.http.fetch(`${this.baseUrl}/tweets${query}`)

    // const data = await response.json();
    // if (response.status !== 200) {
    //   throw new Error(data.messasge);
    // }
    // return data;
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    })
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "ellie", name: "ELLIE" })
    })
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE'
    })

    // const data = await response.json();
    // if (response.status !== 204) {
    //   throw new Error(data.messasge);
    // }

    // if (response.status !== 204) {
    //   throw new Error();
    // }
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text })
    })
  }
}
