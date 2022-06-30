/** Routes for sample app for items */
const app = require("./app");
const express = require("express");

const itemRouter = new express.Router();
const { items } = require("./fakeDb");
const { NotFoundError } = require("./expressError");

/** Return all items in shopping list as object
 * { items: [
      { name: "popsicle", price: 1.45 },
      { name: "cheerios", price: 3.40 }
    ]}
*/
itemRouter.get("/", function (req, res) {
  return res.send({ "items": items });
});

/** Accept JSON body, add an item, and return new object
 * Input: {name: "popsicle", price: 1.45} =>
   Return: {added: {name: "popsicle", price: 1.45}}
 */
itemRouter.post("/", function (req, res) {
  const newItem = req.body;
  items.push(newItem);
  return res.send({
    "added": newItem.name,
    "price": newItem.price});
});

/** Accept a json item and return that single json item
 *
 * {name: "popsicle", "price": 1.45}*/

itemRouter.get("/:name", function (req, res) {
  const targetItem = req.params.name;
  debugger;
  for (item in items) {
    if (item["name"] === targetItem){
      return res.send({ "name": `${item["name"]}`,
                        "price": `${item["price"]}`})
    }
  }

  throw new NotFoundError("No such item");

})

module.exports = itemRouter;
