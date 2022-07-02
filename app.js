let name = document.getElementById('name');
let birthDate = document.getElementById('birth-date');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(name.value);
    console.log(birthDate.value.split('-').reverse().join('/'));
});