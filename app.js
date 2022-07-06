
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_user')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_user", JSON.stringify(dbClient));

const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
    location.reload();
}

const updateClient = (index, saveClient) => {
    const dbClient = readClient();
    dbClient[index] = saveClient;
    setLocalStorage(dbClient);
}

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

    const index = document.getElementById('name').dataset.index;

    if (index == 'new') {
        createClient(saveClient);
        updateTable();
    } else {
        updateClient(index, saveClient);
        updateTable;
    }
});

const createRow = (saveClient, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="rowInfo">${saveClient.nome}</td>
        <td class="rowInfo">${saveClient.nascimento}</td>
        <td>
        <button class="green" type="button" id="edit-${index}">Editar</button>
        <button class="red" type="button" id="delete-${index}">Excluir</button>
        </td>
    `
    document.querySelector('table>tbody').appendChild(newRow);
};

const updateTable = () => {
    const dbClient = readClient();
    dbClient.forEach(createRow);
};

const fillFields = (saveClient) => {
    document.getElementById('name').value = saveClient.nome;
    document.getElementById('birth-date').value = saveClient.nascimento;
    document.getElementById('name').dataset.index = saveClient.index;
}

const editClient = (index) => {
    const saveClient = readClient()[index];
    saveClient.index = index;
    fillFields(saveClient);
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index);
        } else {
            deleteClient(index);
            updateTable();
        }
    }
}

updateTable();

document.querySelector('table>tbody').addEventListener('click', editDelete);