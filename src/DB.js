// ceci permet l'import vers ContactList.js
export default class DB {
    static setApiURL(data) {
        this.apiURL = data;
    }

    // retourne un tableau d'objet littéraux
    static async findAll() {
        const response = await fetch(this.apiURL + "contacts");
        return response.json();
    }

    static async create(contact) {
        const response = await fetch(this.apiURL + "contacts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                firstname: contact.firstname,
                lastname: contact.lastname,
                email: contact.email,
                createdAt: Date.now(),
            }),
        });
        return response.json();
    }

    static async updateOne(contact) {
        const response = await fetch(this.apiURL + "contacts/" + contact.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: contact.firstname,
                lastname: contact.lastname,
                email: contact.email,
            }),
        });
        return response.json();
    }

    static async deleteOneById(id) {
        const response = await fetch(this.apiURL + "contacts/" + id, {
            method: "DELETE",
        });
        return response.json();
    }
}
