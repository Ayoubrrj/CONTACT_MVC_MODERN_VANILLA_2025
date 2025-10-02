import "./styles.css";

// ceci permet l'export vers contact.js
export default function getTemplate(contact) {
    return `
        <li>${contact.firstname}</li>
        `;
}
