/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("client", (table) => {
    table.increments("id").primary();
    table
      .integer("tailor_id")
      .unsigned()
      .references("tailors.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("order").dropTable("client");
};
