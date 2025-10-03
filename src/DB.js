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

    static async create(data) {
        const response = await fetch(this.apiURL + "contacts", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                ...data, // déstructure firstname, lastname, email content aurait envoyé un objet avec tout les infos dedans
                createdAt: Date.now(),
            }),
        });
        return response.json();
    }
}
