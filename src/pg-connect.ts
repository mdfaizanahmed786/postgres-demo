import DatabaseHandler from './DatabaseHandler';


const dbConnect = new DatabaseHandler();
const client=dbConnect.getClient()

async function createUserTable(){
  await client.connect();
  const result=await client.query(
    `CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `
  )

  console.log(result)
  
}

createUserTable();


export default dbConnect;





