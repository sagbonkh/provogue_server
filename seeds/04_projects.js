exports.seed = async function (knex) {
  await knex("projects").del();
  await knex("projects").insert([
    {
      client_id: 1, // Assuming the client with ID 1 from the Clients table
      tailor_id: 1, // Assuming the tailor with ID 1 from the Tailors table
      name: "Custom Suit",
      description: "Tailor a custom suit for a wedding event.",
      status: "In progress",
      start_date: "2024-04-01",
      end_date: "2024-04-30",
      cost: "$1200",
      payment_status: "Pending",
    },
    {
      client_id: 2, // Assuming the client with ID 2 from the Clients table
      tailor_id: 2, // Assuming the tailor with ID 2 from the Tailors table
      name: "Evening Gown",
      description: "Create an elegant evening gown for a special occasion.",
      status: "Completed",
      start_date: "2024-03-15",
      end_date: "2024-04-10",
      cost: "$1800",
      payment_status: "Paid",
    },
  ]);
};
