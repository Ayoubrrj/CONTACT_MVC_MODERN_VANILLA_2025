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

    getContactsCount() {
        return this.contacts.length;
    }

    renderGetContactsCount() {
        this.domElt.querySelector(".contact-count").innerHTML =
            this.getContactsCount();
    }

    render() {
        this.domElt.innerHTML = getTemplate();
        this.contacts.forEach((contact) =>
            contact.render(this.domElt.querySelector(".contacts-table tbody"))
        );
        this.renderGetContactsCount();
        this.initEvents();
    }

    async addContact(data) {
        // ajout dans la DB
        const contact = await DB.create(data);

        // Ajouter a this.contacts
        const newContact = new Contact(contact);
        this.contacts.push(newContact);

        // Ajouter dans le dom
        newContact.render(this.domElt.querySelector(".contacts-table tbody"));

        // relancer le renderGetContactsCount()
        this.renderGetContactsCount();
    }

    initEvents() {
        const inputFirstname = this.domElt.querySelector("#contact-firstname");
        const inputLastname = this.domElt.querySelector("#contact-lastname");
        const inputEmail = this.domElt.querySelector("#contact-email");
        const btnContact = this.domElt.querySelector(".new-contact");

        btnContact.addEventListener("click", async (e) => {
            const firstname = inputFirstname.value;
            const lastname = inputLastname.value;
            const email = inputEmail.value;

            await this.addContact({ firstname, lastname, email });

            inputFirstname.value = "";
            inputLastname.value = "";
            inputEmail.value = "";
        });
    }
}
