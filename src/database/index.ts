import { Connection, createConnection, getConnectionOptions } from "typeorm"

export default async (): Promise<Connection> => {
  const defaultOption = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOption, {
      databese: process.env.NODE_ENV === 'test' 
        ? "./src/database/database.test.sqlite"
        : defaultOption.database
    })
  )
}