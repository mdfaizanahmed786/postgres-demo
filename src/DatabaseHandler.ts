import { Client } from "pg";
interface DBHandler {
  client: Client;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getClient: () => Client;
}
class DatabaseHandler implements DBHandler {
  public client:Client;
  constructor() {
    this.client = new Client({
      connectionString:
        "postgresql://mdfaizanahmed786:VLwOWpCl52iP@ep-dark-pine-a11y9f4t.ap-southeast-1.aws.neon.tech/sql-testing?sslmode=require",
    });
 
  }

  async connect() {
    try {
      await this.client.connect();
    } catch (error:any) {
      console.log(error.message, "Error");
    }
  }

  async disconnect() {
    try {
      await this.client.end();
    } catch (error) {
      console.log(error, "Error");
    }
  }

  getClient(): Client {
    return this.client;
  }
}

export default DatabaseHandler;
