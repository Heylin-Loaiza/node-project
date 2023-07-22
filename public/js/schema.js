class Schema {
  constructor(id, name, description, type, attack_points, defense_points) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.attack_points = attack_points;
    this.defense_points = defense_points;
  }
}

module.exports = Schema;