For postgresql Windows
1. Download Postgresql and install it
2. go to windows service to start the postgresql server 
3. go to the postgresql bin folder in command prompt
```bash
cd "C:\Program Files\PostgreSQL\13\bin"
``` 
4. run the following command to open psql
```bash
.\psql.exe --username=postgres
``` 
5. Coongrats! u get in to the psql   

Remarks:
if you don't want to go to the bin folder everytime, you can add the path in the control panal>environment setting
then you can just simply type run step 4 everywhere
```
psql --username=postgres
```
psql -U "User_Name" -W -h localhost "DB_Name"
# Knex 3 steps:

yarn knex migrate:latest

yarn knex seed:run

yarn knex migrate:rollback