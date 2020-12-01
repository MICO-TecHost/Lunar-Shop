module.exports = {
  calculator: function (num1, operator, num2) {
    if (!num1) throw new TypeError("Missing num1");
    if (!operator) throw new TypeError("Missing operator");
    if (!num2) throw new TypeError("Missing num2");
    if (operator == "*") return num1 * num2;
    if (operator == "^") return num1 ^ num2;
    if (operator == "+") return num1 + num2;
    if (operator == "-") return num1 - num2;
    if (operator == "/") return num1 / num2;
  },

  formatDate: function (date) {
    return new Intl.DateTimeFormat('pt-PT').format(date);
  },

  num_to_word: function (num) {
    var a = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    return a[num];
  },

  isLetter: function (x) {
    return x.toLowerCase() != x.toUpperCase();
  },

  isNumeric: function (x) {
    return !isNaN(x - parseFloat(x));
  },

  removereaction: function (msg, userid) {
    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(userid));
    try {
      for (const reaction of userReactions.values()) {
        reaction.users.remove(userid);
      }
    } catch (error) {
      console.error('Failed to remove reactions.');
    }
  }
};
