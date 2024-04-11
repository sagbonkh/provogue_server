/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table
      .integer("client_id")
      .unsigned()
      .references("client.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table
      .integer("tailor_id")
      .unsigned()
      .references("tailors.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("status").notNullable();
    table.string("start_date").notNullable();
    table.string("end_date").notNullable();
    table.string("cost").notNullable();
    table.string("payment_status").notNullable();
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
  return knex.schema.dropTable("projects");
};
