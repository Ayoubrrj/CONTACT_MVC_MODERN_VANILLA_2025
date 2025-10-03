import getTemplate from "./template";
export default class Contact {
    constructor(data) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.createdAt = data.createdAt;
        this.domElt = null;
    }
    render(el) {
        const template = document.createElement("template");
        template.innerHTML = getTemplate(this);
        this.domElt = template.content.firstElementChild;
        this.initEvents();
        el.append(this.domElt);
    }

    initEvents() {
        // .isEditing
        const btnEdit = this.domElt.querySelector(".btn-edit");
        const btnDelet = this.domElt.querySelector(".btn-delete");

        btnDelet.addEventListener("click", (e) => {
            window.ContactList.deleteOneById(this.id);
            // ici je supprimer du DOM
            this.domElt.remove();
        });
    }
}
