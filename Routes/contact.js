import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../Controllers/contact.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

// new contact
// @api dsc :- creating contact
// @api method :- post
// @api endPoint :- /api/contact/new
router.post("/new", isAuthenticated, newContact);

// get all contact
// @api dsc :- fetching contact
// @api method :- get
// @api endPoint :- /
router.get("/", getAllContact);

// get contact by id
// @api dsc :- fetching contact by id
// @api method :- get
// @api endPoint :- /:id
router.get("/:id", getContactById);

// update contact by id
// @api dsc :- updating contact by id
// @api method :- put
// @api endPoint :- /:id
router.put("/:id", isAuthenticated, updateContactById);

// delete contact by id
// @api dsc :- deleting contact by id
// @api method :- delete
// @api endPoint :- /:id
router.delete("/:id", isAuthenticated, deleteContactById);

// get user specific contact by id
// @api dsc :- fetching user specific contact by id
// @api method :- get
// @api endPoint :- /userid/:id
router.get("/userid/:id", getContactByUserId);

export default router;
