const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  create_at: { type: Date, default: Date.now(), immutable: true },
  updated_at: { type: Date, default: Date.now() },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async register() {
    this.validate()
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("Invalid e-mail.");
    if (!this.body.name) this.errors.push("Name is required.");
    if (!this.body.email && !this.body.phone) this.errors.push("At least one email or phone number must be provided.");
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.customer_name,
      surname: this.body.customer_surname,
      email: this.body.customer_email,
      phone: this.body.customer_phone,
    };
  }

  
  async edit(id) {
    if (typeof id !== "string") return;
    this.validate();
    if(this.errors.length > 0) return;
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  static async lookUp(id) {
    if (typeof id !== "string") return;
    const contact =  await ContactModel.findById(id);
    return contact;
  }

  static async listContacts() {
    const contacts =  await ContactModel.find()
      .sort({ updated_at: -1 });
    return contacts;
  }

  static async delete(id) {
    if (typeof id !== "string") return;
    const contact = await ContactModel.findByIdAndDelete(id);
    return contact;
  }
}

module.exports = Contact;
