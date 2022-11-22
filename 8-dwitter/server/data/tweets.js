import * as authRepository from './auth.js'

let tweets = [
  {
    id: "1",
    text: "좋으니 사랑해서",
    createdAt: new Date().toString(),
    // name: "황규섭",
    // username: "gyuseop",
    // url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
    userId: "1",
  },
  // {
  //   id: "2",
  //   text: "드림코더분들 화이팅",
  //   createdAt: new Date().toString(),
  //   // name: "엘리",
  //   // username: "ellie",
  //   userId: "1"
  // }
];

export async function getAll() {

  return Promise.all(tweets.map(async (tweet) => {
    const { username, name, url } = await authRepository.findById(tweet.userId)
    return { ...tweet, username, name, url }
  }))

}

export async function getAllByUsername(username) {
  // return tweets.filter(tweet => tweet.username === username);
  return getAll().then(tweets =>
    tweets.filter(tweet => tweet.username === username))
}

export async function getById(id) {
  // return tweets.find(tweet => tweet.id === id);

  const found = tweets.find(tweet => tweet.id === id);

  if (!found) {
    return null;
  }

  const { username, name, url } = await authRepository.findById(found.userId);
  return { ...found, username, name, url }
}

export async function create(text, userId) {

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId
  }

  tweets = [tweet, ...tweets];

  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find(tweet => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return getById(tweet.id);
}

export async function deleteById(id) {
  const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

  if (tweetIndex >= 0) {
    tweets.splice(tweetIndex, 1);
  }

  return tweetIndex;
}