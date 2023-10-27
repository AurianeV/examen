const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'Data', 'users.json');

function getUsers() {
  if (fs.existsSync(dataFilePath)) {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
}

function addUser(name, birth) {
  const users = getUsers();
  users.push({ name, birth });
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
}

module.exports = {
  getUsers,
  addUser,
};
