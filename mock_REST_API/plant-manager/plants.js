

module.exports = () => {
  const plants = { users: [] }
  // Create 1000 users
  for (let i = 0; i < 20; i++) {
    plants.users.push({
      id: {i},
      name:`plante${i}`,
      max_temp:0.0,
      min_temp:33.0,
      min_moisture:10.0,
      max_moisture:45.0,
      last_watered:"18:58:20",
      automatic_water:true,
      room:{
        id: i%5,
        name:`Rom ${i%5}`
      },
      plant_type:{
        id:i%3,
        name:`type ${i%3}`
      }
    })
  }
  console.log(plants)
}
