import { Schema, model, models } from "mongoose";
import { Rest } from "./rest";

// const menuItemSchema = new Schema({
//   menuNumber: { type: Number, required: true },
//   image: { type: String },
//   title: { type: String, required: true },
//   price: { type: String, required: true },
//   category: { type: String, required: true },
//   subCategory: { type: String },
//   ingredients: { type: String, required: true },
// });

// // Menu Schema
// const MenuSchema = new Schema({
//   items: {
//     langKey: {
//       type: Map,
//       of: [menuItemSchema],
//     },
//   },
//   restId: { type: Schema.Types.ObjectId, ref: "Rest", required: true },
// });

const menuItemSchema = new Schema({
  menuNumber: { type: Number, required: true },
  image: { type: String },
  title: { type: String, required: true },
  price: { type: String },
  price1: { type: String, default: null },
  category: { type: String, required: true },
  subCategory: { type: String, default: null },
  ingredients: { type: String },
  beachMenu: { type: Boolean, default: true },
  restaurantMenu: { type: Boolean, default: true },
  beachPrice: { type: String, default: null },
});

const itemsSchema = new Schema({
  langKey: { type: String },
  items: [menuItemSchema],
});

const MenuSchema = new Schema({
  menu: [itemsSchema],
  restId: { type: Schema.Types.ObjectId, ref: "Rest", required: true },
  restName: { type: String, required: true },
});

const Menu = models.Menu || model("Menu", MenuSchema);

export { MenuSchema, Menu };
