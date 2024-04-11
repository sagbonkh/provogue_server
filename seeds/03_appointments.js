/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("appointments").del();
  await knex("appointments").insert([
    {
      client_id: 1,
      appointment_date: "2024-04-15",
      appointment_time: "10:00:00", // Adjusted time format
      notes: "Client wants fitting for suit",
    },
    {
      client_id: 2,
      appointment_date: "2024-04-16",
      appointment_time: "14:30:00", // Adjusted time format
      notes: "Consultation for wedding gown",
    },
    {
      client_id: 3,
      appointment_date: "2024-04-18",
      appointment_time: "11:00:00", // Adjusted time format
      notes: "Measurement for custom shirt",
    },
    {
      client_id: 4,
      appointment_date: "2024-04-20",
      appointment_time: "15:00:00", // Adjusted time format
      notes: "Final fitting for dress",
    },
    {
      client_id: 5,
      appointment_date: "2024-04-20",
      appointment_time: "15:00:00", // Adjusted time format
      notes: "Final fitting for dress",
    },
  ]);
};
