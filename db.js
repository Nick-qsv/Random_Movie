const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4, INTEGER } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/random_movie"
);

const Movie = conn.define("movie",{
    id:{
        type:UUID,
        primaryKey:true,
        defaultValue: UUIDV4
    },
    title:{
        type:STRING
    },
    rating:{
        type:INTEGER
    }
})

const sync = async () =>{
    await conn.sync({force: true})
    console.log("Syncing Successful!")
}

module.exports ={
    sync,
    Movie
}