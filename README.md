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


##MIT License

**Copyright (c) 2019 Ejaz Ansari**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
