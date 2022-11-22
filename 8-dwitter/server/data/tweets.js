let tweets = [
  {
    id: "1",
    text: "좋으니 사랑해서",
    createdAt: new Date(),
    name: "황규섭",
    username: "gyuseop",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
  },
  {
    id: "2",
    text: "드림코더분들 화이팅",
    createdAt: new Date(),
    name: "엘리",
    username: "ellie",
  }
];

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
  return tweets.find(tweet => tweet.id === id);
}

export async function create(text, name, username) {

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username
  }

  tweets = [tweet, ...tweets];

  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find(tweet => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return tweet;
}

export async function deleteById(id) {
  const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

  if (tweetIndex >= 0) {
    tweets.splice(tweetIndex, 1);
  }

  return tweetIndex;
}