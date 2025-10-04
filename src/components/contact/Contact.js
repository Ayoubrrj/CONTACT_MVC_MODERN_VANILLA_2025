import getTemplate from "./template";
import DB from "../../DB";

export default class Contact {
    constructor(data) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.createdAt = data.createdAt;
        this.domElt = null;
        this.contactList = window.ContactList;
    }
    render(el) {
        const template = document.createElement("template");
        template.innerHTML = getTemplate(this);
        this.domElt = template.content.firstElementChild;
        this.initEvents();
        el.append(this.domElt);
    }

    async update(data) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;

        // update DB
        await DB.updateOne(this);

        // mettre à jour le DOM (les <span>)
        this.domElt.querySelector(
            ".input-firstname"
        ).previousElementSibling.innerText = this.firstname;
        this.domElt.querySelector(
            ".input-lastname"
        ).previousElementSibling.innerText = this.lastname;
        this.domElt.querySelector(
            ".input-email"
        ).previousElementSibling.innerText = this.email;

        // sortir du mode édition
        this.domElt.classList.remove("isEditing");
    }

    initEvents() {
        // .isEditing
        const btnEdit = this.domElt.querySelector(".btn-edit");
        const btnDelet = this.domElt.querySelector(".btn-delete");
        const btnCheck = this.domElt.querySelector(".btn-check");
        const inputFirstname = this.domElt.querySelector(".input-firstname");
        const inputLastname = this.domElt.querySelector(".input-lastname");
        const inputEmail = this.domElt.querySelector(".input-email");

        btnDelet.addEventListener("click", (e) => {
            window.contactList.deleteOneById(this.id);
            // ici je supprimer du DOM
            this.domElt.remove();
        });

        btnEdit.addEventListener("click", (e) => {
            this.domElt.classList.add("isEditing");
        });

        btnCheck.addEventListener("click", async () => {
            const firstname = inputFirstname.value;
            const lastname = inputLastname.value;
            const email = inputEmail.value;

            await this.update({ firstname, lastname, email });
        });
    }
}
