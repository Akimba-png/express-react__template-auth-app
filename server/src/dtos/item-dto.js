class ItemDto {
  constructor(item) {
    Object.entries(item).forEach((e) => {
      if (e[0] !== 'systemGroup') {
        this[e[0]] = e[1];
      }
    })
  }
}

module.exports = ItemDto;
