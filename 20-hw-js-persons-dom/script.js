//id;firstName;lastName;age

function showFullScreenImage(imageUrl) {
    const backgroundDiv = document.getElementById('background');
    const img = document.createElement('img');
    img.src = imageUrl;
    backgroundDiv.appendChild(img);
}

showFullScreenImage('image/image5.jpg');
function deletePersons() {
    persons = [];
    personStat = [];
    while (personsList.firstChild) {
        personsList.removeChild(personsList.firstChild);
    }
    while (stats.firstChild) {
        stats.removeChild(stats.firstChild);
    }
}
let persons = [];
let personStat = [];
addPerson.onclick = function () {
    const person = new Person(personId.value.trim(), firstName.value.trim(),
        lastName.value.trim(), age.value);
    if(findPerson(personStat,person.id) === -1)
    {
        persons.push(person);
        personStat.push(person);
    }else{
        alert("Exists");
    }
    personId.value = firstName.value = lastName.value = age.value = "";
}
showPersons.onclick = function () {
    printPersons(persons);
}
calcStats.onclick = function() {
    personStat = [];
    persons.forEach(function(person) {
        if (findPerson(personStat, person.id) === -1) {
            personStat.push(person);
        }
    });
    printStats(personStat);
    persons.length = 0;
}

function findPerson(persons, id) {
    return persons.findIndex(p => p.id === id);
}


function printPersons(persons) {
    persons.forEach(p => {
        const li = createInfoElement(p.toString(), 'li');
        personsList.appendChild(li);
    });
}

function printStats(personStat) {
    if (personStat.length) {
        const start = personStat[0].age
        const minAge = personStat.reduce((res, p) => p.age < res ? p.age : res, start);
        const maxAge = personStat.reduce((res, p) => p.age > res ? p.age : res, start);
        const avgAge = personStat.reduce((res, p) => p.age + res, 0) / personStat.length;
        const divStats = document.createElement('div')
        const h3avg = createInfoElement(`Average age: ${avgAge.toFixed(1)}`, 'h3');
        const h3min = createInfoElement(`Min age: ${minAge}`, 'h3');
        const h3max = createInfoElement(`Max age: ${maxAge}`, 'h3');
        divStats.append(h3avg, h3min, h3max);
        stats.appendChild(divStats);
    } else {
        stats.appendChild(createInfoElement('No stats', 'h3'));
    }
}

function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
    this.fullName = function () {
        return `${this.firstName} ${this.lastName}`
    }
    this.toString = function () {
        return `ID: ${this.id}, Name: ${this.fullName()}, Age: ${this.age}`
    }
}

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.appendChild(text);
    return element;
}
