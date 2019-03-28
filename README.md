# node-momy 
## node (vanilla js) + mongo + mysql

A simple **node.js** (vanilla javascript, no typescript) boilerplate with **Mongo db** and **Mysql**.

To prevent the database from becoming a system-wide bottleneck, especially in high volume environments, NoSQL databases perform in a way that relational databases cannot.
Although NoSQL databases have gained popularity for their speed and scalability, there are still situations in which a highly structured SQL database might be preferable.

## Setup
Clone or download this repo and run command in root dir
> **npm install**

Configure **mongo db** and **mysql db** in **./config.js** file
Thats it.

##  Run
To start app in default development mode:
> **npm start** 

To start in production mode:
> **pro=true npm start**

##  Run with [nodemon](https://www.npmjs.com/package/nodemon) (recommended)
To start app in default development mode:
> **nodemon server.js** 

To start in production mode:
> **pro=true nodemon server.js**