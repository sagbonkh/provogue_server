exports.seed = async function (knex) {
  await knex("client").del();
  await knex("client").insert([
    {
      id: 1,
      name: "Nester Brookfield",
      email: "nbrookfield0@feedburner.com",
      phone: "7890123456",
      password: "hashed_password",
    },
    {
      id: 2,
      name: "Esme Ayscough",
      email: "eayscough1@pagesperso-orange.fr",
      phone: "3216549870",
      password: "hashed_password",
    },
    {
      id: 3,
      name: "Danni McOnie",
      email: "dmconie2@netscape.com",
      phone: "7890123456",
      password: "hashed_password",
    },
    {
      id: 4,
      name: "Horatia Dalyiel",
      email: "hdalyiel3@fc2.com",
      phone: "4567890123",
      password: "hashed_password",
    },
    {
      id: 5,
      name: "Mohandis Nibley",
      email: "mnibley4@marketwatch.com",
      phone: "7782223333",
      password: "hashed_password",
    },
  ]);
};
