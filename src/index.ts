import express, { Request, Response } from "express";
import cors from "cors";
import DatabaseHandler from "./DatabaseHandler";
import dbConnect from "./pg-connect";
const app = express();

app.use(cors());
app.use(express.json());


app.get("/todos", async (req: Request, res: Response) => {

  try {
    const getTodosQuery = "SELECT * FROM todos;";
    const client=dbConnect.getClient();
    const todos = await client.query(getTodosQuery);
    return res.status(200).json({
      success: true,
      todos: todos.rows,
    });
  } catch (error) {
    await dbConnect.disconnect();
  }
});



app.post("/add", async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const addTodoQuery =
      "INSERT INTO TODOS (title, description) VALUES ($1, $2);";
    const client = dbConnect.getClient();
    const result = await client.query(addTodoQuery, [title, description]);
    console.log(result);
    return res.status(201).json({ success: true });
  } catch (error) {
    await dbConnect.disconnect();
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


app.put("/edit/:id", async(req:Request, res:Response)=>{
  const {title, description}=req.body;

  try {
    if(!req.params.id){
      return res.status(400).json({success:false, message:'Please provide a client id....'})
    }

    const updateQuery="UPDATE todos SET title=$1, description=$2 WHERE id=$3;";
   const result=await dbConnect.client.query(updateQuery, [title, description, req.params.id])
   console.log(result)

   return res.status(200).json({success:true})
  } catch (error) {
    console.log(error)
    await dbConnect.disconnect();
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})



app.delete("/delete/:id", async(req:Request, res:Response)=>{
  try {
    if(!req.params.id){
      return res.status(400).json({success:false, message:'Please provide a client id....'})
    }
    const updateQuery="DELETE FROM TODOS WHERE todos.id=$1"
  await dbConnect.client.query(updateQuery, [req.params.id])
   return res.status(200).json({success:true})
  } catch (error) {
    await dbConnect.disconnect();
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})





app.listen(4000, ()=>{
  console.log("Server is listening at 4000 port");
})










// async function insertData() {
//   console.log("reeyye");
//   const client = new Client({
//     connectionString:
//       "postgresql://mdfaizanahmed786:VLwOWpCl52iP@ep-dark-pine-a11y9f4t.ap-southeast-1.aws.neon.tech/sql-testing?sslmode=require",
//   });
//   try {
//     await client.connect();
//     const insertQuery =
//       "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);";
//     const values = ["faian", "fz@gmail.com", "4444"];
//     const result = await client.query(insertQuery, values);

//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function deleteData() {
//   const client = new Client({
//     connectionString:
//       "postgresql://mdfaizanahmed786:VLwOWpCl52iP@ep-dark-pine-a11y9f4t.ap-southeast-1.aws.neon.tech/sql-testing?sslmode=require",
//   });
//   try {
//     await client.connect();
//     const insertQuery = "DELETE FROM  users;";
//     const result = await client.query(insertQuery);
//     console.log("result", result);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function findUser(email: string) {
//   const client = new Client({
//     connectionString:
//       "postgresql://mdfaizanahmed786:VLwOWpCl52iP@ep-dark-pine-a11y9f4t.ap-southeast-1.aws.neon.tech/sql-testing?sslmode=require",
//   });

//   try {
//     await client.connect();
//     const insertQuery = "SELECT * FROM users WHERE email=$1;";
//     const result = await client.query(insertQuery, [email]);
//     console.log("result", result.rows);
//     console.log(result);
//   } catch (error) {}
// }

// deleteData();

// insertData();

