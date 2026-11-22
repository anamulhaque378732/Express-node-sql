// -----  MODULE - 7  Node express FUNTDAMENTAL

// Express is a node js framework. Its unopinionated and minimalistic web framework and middleware based

// unopinionated --> any structure and pattern follow this .

// types , express ,in-build middleware, body parser
/**when you use middleware you use
 *  **json format**
 *app.use(express.json());
 * ***text format***
 ** app.use(express.text());
 ** ***urlencded format***
 * app.use(express.urlencoded({ extended: true }));
 *
 *
 */
// open sourese database NEON DB. Its cover bye postgresql. WE use Sql database .

// postgreSql neon ware up our project. use npm i pg

// postgreSQL , documentation W3School

// SQL --> Structure Query Language. It helps relational database. We can value insert, update , read and delate . aslo  can manage database structure

// Use SQL data types (boolean, numbers, binary, data/time. JSON, character, UUID, array, XML)

/** Number data type by SQL
 * 1. Integer type
 * 1.1 --> SMALLINT(int2) 2 bytes (small number, age quantity,rating).
 * 1.2 --> Integer (int) 4 bytes (Standed number)
 * 1.3 --> Bigint (int8) 8 bytes (global ID, Counter)
 * 1.4 --> REAl (float4) 4 bytes (Fload number)
 * 1.5 --> Double Precision 8 bytes (scientific / engineering calculation)
 * 1.6 --> Numeric / Decimal  (variable) 8 bytes to 14 bytes (Money, right calculation)
 * 1.7 --> Serial 4 bytes (auto-increment, primary key)
 *
 * 2. Character
 * 2.1 -->  CHAR(n) n bytes (Length, Country code)
 * 2.2 --> VARCHAR(n) variable (max length: username, email)
 * 2.3 --> TEXT variable (Description, message, large character)
 *
 *
 * 3.  Date
 * 3.1 --> Date (2025-08-20)
 * 3.2 --> Time (14.30.00)
 * 3.3 Timestamp (2025-06-20 14.32.03)
 * 3.4 Interval
 *
 *
 * 4. UUID --> Universal Unique Identifier
 * 4.1 --> combination of  Number + Character (unique parimary key)
 *
 *
 * */

// get

// put method : use (COALESCE, RETURNING *) Why use this

// *** module - 8 POSTGRESQL ESSENTIAL & CONNECTING EXPRESS WITH POSTGRES

/** Software dessign pattern.
 * 1. MVC pattern --> Model Views Controller
 * 1.1 Model . includeed file (Database Schema, Business logic)
 * 1.2 views . included file (ui/client, Tnmplate Enine)
 * 1.3 ControLLers included file (Request, Response)
 *
 * Easy way (MVC + Routes) ---> (Routes, Model, View, Controllers)
 *
 * When use typescript (Interfaces , Routes, Models, Views , Controllers)
 *
 * When a project extra large you can help Modular pattern. Every Feture as a Folder
 *
 * 2. Modular Pattern
 * ***Benifits Oof modular pattan
 * a) --> Scalability
 * b) --> Maintainability
 * c) Better Refactoring
 *
 * *** Rules and Principles Of Modular pattern
 *
 * 1st. DRY --> don't Repeat Yourself
 * 2nd. Fat Model (Schema, business logic)
 * 3rd. Thin Controller (Request Response handle)
 *
 * Step of modulat pattern
 * Schema --> Model --> Database Query
 *
 * When you use Typescript  : Interface -->Schema --> Model --> Database Query
 *
 *  */

/** Database relation
 *
 * 1. One-to-One
 * 2. One-to-Many
 * 3. Many-to-One
 * 4. Many-to-Many
 *
 * */

// *** Authentication   +  Authorization

/** Authentication (Who are you) 2 types
 * 1. Session-Based (Stateful : Server remain all request) cons: when project lagre scale . Need huge storage
 * 2. JWT-Bassed ( Stateless : Server not remain anything) Use this Modern apps . Its fast and maintain easy
 *
 * */

/** Authorization (What can you do)
 * 1. Role-Based  (RBAC: Role Based Access Control)
 * 2 Permissinn-Based (PBAC : Permission Based Access Control)
 * 3. Attibute-Based (ABAC : Attribute-Based Access Control)
 * 4. Policy-Based (PBAC: Policy Based Access Control)
 *
 * Role-based : Admin , User, Agent,
 * Permission-based : Read + Write, Only Read ,Only write
 * Attribute-bassed : role--> admin , Location --> Bangladesh , Time --> Office Hours
 *
 * Policy-based : Premium User , Verified User
 *
 *
 */

// *** Bcrypt And Hashing Password (npm bcrypt)

// **** JWT

/** JWT : Json Web Token. Digital Token  use for User Verify
 * 3 parts of JWT (Header, Payload, Signature  )
 *
 *
 *
 *
 * */

// jwt token genarate (npm jwt)

// **** Authorization

// ****  Middelware

// middleware main purpose --> Authorization handle

/** Middleware
 *  2 types of middleware
 * 1. Built-In / Default middleware
 * 2. Custom middleware (we made this middleware)
 */

// Middleware have 3 parameter (req, res, next) . next() is function. its  taking to next step

//  Namespace

//  RBAC ---> Role based Access control
