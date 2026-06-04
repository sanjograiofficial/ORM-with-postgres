# Project Setup Instruction
## Initial Step
- npm init -y
## Package Install
- npm i express dotenv pg @prisma/client @prisma/adapter-pg
## For Development
- npm i -D nodemon prisma

```
DATABASE_URL = "postgresql://user:password@host:port/databaseName?schema=public"
```
## Podman Compose command
### To build, pull image and start container 
- podman compose up
### To build, pull image and start container but silently
- podman compose up -d

# Prisma Setup Steps
- npx prisma init
- npx prisma migrate dev --name create_students_table
### to visualize the database tables
- npx prisma studio 

### Note: if table already exists when migrating then
- npx prisma migrate reset

### Generating prisma client code
- npx prisma generate

### Things to remember when importing prisma client to db.js
- PrismaClient not found error can be solved by importing 
`import {PrismaClient} from '../generated/prisma/client.js`
- if `import {PrismaClient} from '@prisma/client'` is needed then we have to remove the `output = '.../src/generated/prisma` from the `schema.prisma` file:
    ```
    generator client{
        provider = "prisma-client-js"
        output = '../src/generated/prisma;
        moduleFormat = 'esm'
    }
    ```

    And regenerate the prisma code

