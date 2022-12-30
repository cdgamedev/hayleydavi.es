fetch('./json/projects.json')
    .then(response => response.json())
    .then(json => parseJson(json))

var order;

async function parseJson(json) {
    parseProjects("games", json);
    parseProjects("projects", json);
}

function parseProjects(name, json) {
    order = json[name + "-order"];
    let projects = json[name];

    let element = document.getElementById(name + "-showcase");
    element.innerHTML = "";

    for (let i = 0; i < order.length; i++) {
        let id = order[i];
        element.appendChild(showGame(projects[id]));
    }
}

function showGame(json) {
    let container = createElement('div');
    container.classList.add('three-promo-container');
    container.appendChild(getImage(json));
    container.appendChild(getURL(json));
    container.appendChild(getDescription(json));
    container.appendChild(getIcons(json));
    return container;
}

function getName(json) {
    let h2 = createElement('h2');
    h2.innerHTML = json["name"];
    return h2;
}

function getImage(json) {
    let img = createElement('img');
    img.src = json["image"];
    return img;
}

function getDescription(json) {
    let p = createElement('p');
    p.innerHTML = json["description"];
    return p;
}

function getIcons(json) {
    let div = createElement('div')
    div.classList.add('social-links')
    let icons = json["icons"];
    for(let icon = 0; icon < icons.length; icon++) {
        let i = createElement('i');
        i.classList.add(icons[icon]);
        div.appendChild(i);
    }
    return div;
}

function getURL(json) {
    if (json["url"] == "") {
        return getName(json);
    }
    
    var a = createElement('a');
    a.href = json["url"];
    a.appendChild(getName(json));
    return a;
}

function createElement(type) {
    let element = document.createElement(type);
    return element;
}