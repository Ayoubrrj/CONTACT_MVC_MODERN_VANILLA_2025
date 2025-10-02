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
}
