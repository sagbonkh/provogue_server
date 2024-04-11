/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("tailors").del();
  await knex("tailors").insert([
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      password: "hashed_password",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+9876543210",
      password: "hashed_password",
    },
  ]);
};
