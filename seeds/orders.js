/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("order").del();
  await knex("order").insert([
    {
      id: 1,
      service: "Alterations",
      client_id: 1,
      status: "In progress",
    },
    {
      id: 2,
      service: "Repair",
      client_id: 3,
      status: "Complete",
    },
    {
      id: 3,
      service: "Custom Job",
      client_id: 2,
      status: "In progress",
    },
    {
      id: 4,
      service: "Alterations",
      client_id: 5,
      status: "Complete",
    },
    {
      id: 5,
      service: "Repair",
      client_id: 4,
      status: "In progress",
    },
  ]);
};
