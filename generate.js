module.exports = function() {
  var faker = require("faker");
  var _ = require("lodash");
  const db = {
    people: [],
    albums: [],
    posts: []
  };
   _.times(20, (n) => {
      db.people.push({
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar(),
        albums: [],
        posts: []
      })
   });

   return db;
};
