
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_user", JSON.stringify(dbClient));

const readClient = () => getLocalStorage();

const createClient = (saveClient) => {
    const dbClient = getLocalStorage();
    dbClient.push(saveClient);
    setLocalStorage(dbClient);
};

document.querySelector('form').addEventListener('submit', () => {
    const saveClient = {
        nome: document.getElementById('name').value,
        nascimento: document.getElementById('birth-date').value.split('-').reverse().join('/')
    };
    createClient(saveClient);
});

const createRow = (saveClient) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="rowInfo">${saveClient.nome}</td>
        <td class="rowInfo">${saveClient.nascimento}</td>
    `
    document.querySelector('table>tbody').appendChild(newRow);
};

const updateTable = () => {
    const dbClient = readClient();
    dbClient.forEach(createRow);
}

updateTable();