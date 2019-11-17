require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const util = require("util");
const { toDB, fromDB } = require("./utils");
const moment = require("moment");

console.log(process.env.DATABASE_URL);
const knex = require("knex")(process.env.DATABASE_URL);

/*jshint multistr: true */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/***DB connection string for any DB calls throughout the app***/
// pgQuery.connectionParameters = process.env.DATABASE_URL; //heroku
// pgQuery.connectionParameters = 'postgres://localhost:5432/noraChurch'; //local

app.use(express.static(path.join(__dirname, "../dist")));

app.set("port", process.env.PORT || 8000);

const initialReview = {
  userId: 2, //2 jason.tenbrink+bigkittyfattybat@gmail.com
  question1: 3,
  question2: 3,
  question3: 3,
  question4: 3,
  question5: 3,
  question6: 4,
  question7: 4,
  question8: 4,
  question9: 4,
  question10: 4
};
app
  .route("/vendors")
  .get(async (req, res) => {
    console.log(knex);
    const data = await knex("vendors");
    res.json(data);
    console.log(data);
  })
  .post(async (req, res) => {
    req.body = {
      name: "AIM Consulting Group, LLC",
      addressLine1: "Southdale Office Center",
      addressLine2: "6600 France Ave. South, Suite 245",
      city: "Edina",
      state: "MN",
      zip: "55435",
      phone: "9523147255"
    };
    try {
      const [vendorId] = await knex("vendors").insert(
        toDB({ ...req.body, created: moment(), updated: moment() }),
        "id"
      );
      console.log("vendor", vendorId);

      await knex("reviews").insert(
        toDB({
          ...initialReview,
          vendorId,
          created: moment(),
          updated: moment()
        })
      );

      // add a review to that vendor here.  Gie it 3.5 stars
      res.status(200).send("Vendor added");
    } catch (e) {
      res.status(500).send(e);
    }
  });

// app
//   .route("/tenants")
//   .get((req, res) => {
//     console.log("get", req.body);
//     pgQuery("SELECT * from tenants")
//       .then(rows => res.json(rows[0]))
//       .catch(err => {
//         res.status(424).send("failed dependancy!");
//         console.log(err);
//       });
//   })
//   .post((req, res) => {
//     let tenant;
//     const promise1 = database.addTenant(req.body.name);
//     const promise2 = bcrypt.hash(process.env.ADMIN_PASSWORD, SALT_FACTOR);
//     Promise.all([promise1, promise2])
//       .then(([rows, hash]) => {
//         tenant = rows[0][0];
//         return database.createAdminUser(tenant, hash);
//       })
//       .then(rows => {
//         return res.json(tenant);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(424).send("failed dependancy!");
//       });
//   })
//   .put((req, res) => {
//     console.log("put", req.body);
//     pgQuery(
//       `UPDATE tenants
//     SET tenant_name = $1
//     WHERE tenant_id = $2
//     RETURNING *`,
//       [req.body.tenant.name, req.body.tenant.id]
//     )
//       .then(rows => res.json(rows[0]))
//       .catch(err => res.status(424).send("failed dependancy!"));
//   })
//   .delete((req, res) => {
//     console.log("delete", req.query);
//     pgQuery(
//       `DELETE FROM tenants
//     WHERE tenant_id = $1
//     RETURNING *`,
//       [req.query.id]
//     )
//       .then(rows => res.json(rows[0]))
//       .catch(err => res.status(424).send("failed dependancy!"));
//   });
console.log("hi mom", app.get("port"));
app.listen(app.get("port"), function() {
  util.log(" listening on port ", app.get("port"));
});
