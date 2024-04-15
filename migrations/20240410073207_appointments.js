/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("appointments", (table) => {
    table.increments("id").primary();
    table
      .integer("client_id")
      .unsigned()
      .references("client.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.date("appointment_date").notNullable(); // Changed to date type
    table.string("appointment_time").notNullable(); // Changed to string type
    table.string("notes");
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
  return knex.schema.dropTable("appointments");
};
