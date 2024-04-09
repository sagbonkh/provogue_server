/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  await knex("client").del();
  await knex("client").insert([
    {
      id: 1,
      name: "Nester Brookfield",
      email: "nbrookfield0@feedburner.com",
      phone: "7890123456",
      address: "789 Oak St, Villageton",
    },
    {
      id: 2,
      name: "Esme Ayscough",
      email: "eayscough1@pagesperso-orange.fr",
      phone: "3216549870",
      address: "321 Maple St, Suburbia",
    },
    {
      id: 3,
      name: "Danni McOnie",
      email: "dmconie2@netscape.com",
      phone: "7890123456",
      address: "456 Elm St, Townsville",
    },
    {
      id: 4,
      name: "Horatia Dalyiel",
      email: "hdalyiel3@fc2.com",
      phone: "4567890123",
      address: "456 Elm St, Townsville",
    },
    {
      id: 5,
      name: "Mohandis Nibley",
      email: "mnibley4@marketwatch.com",
      phone: "7782223333",
      address: "123 Main St, Cityville",
    },
  ]);
};
