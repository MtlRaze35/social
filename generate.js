module.exports = function() {
  var faker = require("faker");
  var _ = require("lodash");
  return {
    people: _.times(20, function (n) {
      return {
        id: n,
        name: faker.name.findName(),
        avatar: faker.internet.avatar()
      }
    })
  };
};
