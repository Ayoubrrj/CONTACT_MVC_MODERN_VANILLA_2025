import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";
// ceci permet l'import vers le main
export default class ContactList {
    constructor(data) {
        this.domElt = document.querySelector(data.el);
        DB.setApiURL(data.apiUrl);
        this.contacts = [];
        this.loadContacts();
    }
    async loadContacts() {
        const contactsDb = await DB.findAll();
        this.contacts = contactsDb.map((contact) => new Contact(contact));
        this.render();
    }
    render() {
        this.domElt.innerHTML = getTemplate();
        this.contacts.forEach((contact) =>
            contact.render(this.domElt.querySelector(".contacts-table tbody"))
        );
    }
}
