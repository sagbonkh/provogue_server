exports.seed = async function (knex) {
  await knex("order").del();
  await knex("order").insert([
    {
      id: 1,
      service: "Alterations",
      description: "Taper my slacks",
      client_id: 1,
      tailor_id: 1,
      status: "accepted",
    },
    {
      id: 2,
      service: "Repair",
      description: "Repair a rip in my pants",
      client_id: 3,
      tailor_id: 1,
      status: "pending",
    },
    {
      id: 3,
      service: "Custom Job",
      description: "Custom Asoebi for a festival",
      client_id: 2,
      tailor_id: 1,
      status: "pending",
    },
    {
      id: 4,
      service: "Alterations",
      description: "reduce the length of my pants",
      client_id: 5,
      tailor_id: 2,
      status: "declined",
    },
    {
      id: 5,
      service: "Repair",
      description: "Repair the hole in my sweater",
      client_id: 4,
      tailor_id: 2,
      status: "pending",
    },
  ]);
};
