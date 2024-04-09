/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order", (table) => {
    table.increments("id").primary();
    table.string("service").notNullable();
    table
      .integer("client_id")
      .unsigned()
      .references("client.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("order_date").defaultTo(knex.fn.now());
    table.string("status").notNullable();
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
  return knex.schema.dropTable("order");
};
