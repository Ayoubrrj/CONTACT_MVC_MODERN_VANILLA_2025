import ContactList from "./components/contactList/ContactList";

// ceci est envoyer sous forme de data dans (Class ContactList)
new ContactList({
    el: "#app",
    apiUrl: "https://68db8534445fdb39dc25a900.mockapi.io/",
});
