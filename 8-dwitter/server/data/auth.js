const users = [
  {
    id: "1",
    username: "gyuseop",
    password: "$2b$12$FfIz5WLKInBSDoH8D5RPeenTiOVB/4rKt.oePILW55BsuypVjXuoe",
    name: "Gyuseop",
    email: "gyuseop@gmail.com",
    url: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
  }
]

export async function findByUsername(username) {
  return users.find(user => user.username === username);
}

export async function findById(id) {
  return users.find(user => user.id === id);
}

export async function createUser(user) {

  const userId = Date.now().toString();

  users.push({ id: userId, ...user })

  return userId;
}
