export class utilsApp {
  /**
   *
   * @param {HTMLElement} element
   * @param {Array} items
   */

  static createItem(element, title, items) {
    if (title.value === "") return this.showAlert("Complete Field", "error");

    element.append(this.ResItem(title.value));
    // Guardar cada título en items para guadar en localstorage
    items.push(title.value);
    title.value = "";
    this.saveInStorge("items", items);
    this.showAlert("Item Created", "ok");
  }
  //Retornar un elemento HTML
  static ResItem(title) {
    const divItem = document.createElement("div");
    const btnDelete = document.createElement("button");
    btnDelete.innerHTML = /*html*/ `
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    `;
    btnDelete.classList.add("btnRemoveItem");

    const htmlItem = `<strong class="itemTitle">${
      title.length > 13 ? `${title.substring(0, 9)}...` : title
    }</strong>`;

    divItem.innerHTML = htmlItem;
    divItem.setAttribute("data-id", title);
    divItem.append(btnDelete);
    divItem.classList.add("item");
    return divItem;
  }

  static deleteItem(items, el) {
    const root = el.parentElement;
    const id = root.dataset.id;
    root.remove();
    // Si el elemento se encuentra en la lista se busca el id y se remueve
    if (items.includes(id)) {
      const newid = items.indexOf(id);
      items.splice(newid, 1);
      this.saveInStorge("items", items);
    }
  }

  /**
   *
   * @param {Array} items - Items
   * @param {Array} teams - Equipos
   * @param {Number} limit - Limites de items por equipo
   */
  static createTeams(teams, items, limit) {
    if (items.length < 1)
      return this.showAlert("Create items to create teams", "error");
    if (limit < 1)
      return this.showAlert("only values ​​from 1 onwards", "error");

    // cambiar orden de los items para seleccionar aleatoriamente
    items.sort(() => Math.random() - 0.5);
    while (true) {
      if (items.length < 1) break;

      //Obtener los items hasta el limite indicado
      //eliminar los items separados
      // agregarlos a la matriz teams
      let newTeam = items.slice(0, limit);
      items.splice(0, limit);
      teams.push(newTeam);
    }
    this.renderItems(items);
    this.renderTeamsHTML(teams);
    this.saveInStorge("items", items);
    this.saveInStorge("teams", teams);
  }

  static renderTeamsHTML(teams) {
    // Renderizar los teams en el documento html
    const colors = [
      "#A279B2",
      "#FFE0A6",
      "#DB9B4F",
      "#75D1B4",
      "#987866",
      "#ECD787",
      "#FFD0BF",
      "#EEF3CD",
      "#8792F4",
      "#81B6EC",
      "#FFF8C4",
      "#CDADD0",
      "#FFE5D2",
    ];
    const btn = document.querySelector("#deleteAllTeams");
    const $teamsHTML = document.querySelector(".teams");
    $teamsHTML.innerHTML = "";

    if (teams.length > 0) {
      teams.forEach((team, index) => {
        const teamElemet = document.createElement("ul");
        teamElemet.classList.add("team");
        //seleccionar un background aleatoria para cada equipo
        teamElemet.setAttribute(
          "style",
          `--bg: ${colors[Math.round(Math.random() * (colors.length - 1))]};`
        );
        teamElemet.setAttribute("data-id", index);

        teamElemet.innerHTML = /*html*/ `
        <div class="header_team">
          <h2>Team ${index + 1}</h2> 
          <button class="btnDeleteTeam">
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> <path d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z" fill="#1C274C"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12404C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001ZM10.2463 12.1886C10.2051 11.7548 9.83753 11.4382 9.42537 11.4816C9.01321 11.525 8.71251 11.9119 8.75372 12.3457L9.25372 17.6089C9.29494 18.0427 9.66247 18.3593 10.0746 18.3159C10.4868 18.2725 10.7875 17.8856 10.7463 17.4518L10.2463 12.1886ZM14.5746 11.4816C14.9868 11.525 15.2875 11.9119 15.2463 12.3457L14.7463 17.6089C14.7051 18.0427 14.3375 18.3593 13.9254 18.3159C13.5132 18.2725 13.2125 17.8856 13.2537 17.4518L13.7537 12.1886C13.7949 11.7548 14.1625 11.4382 14.5746 11.4816Z" fill="#1C274C"/> </g>
          </svg>
          </button>
        </div>`;
        // por cada título del team agregarlo al elmento del DOM
        for (const item of team) {
          teamElemet.innerHTML += `
            <li><strong>${item}</strong></li>
          `;
        }
        $teamsHTML.append(teamElemet);
      });
      this.showAlert("Successfully Created Teams", "ok");
    }
  }

  static renderItems(items) {
    const containtItems = document.querySelector(".items");
    containtItems.innerHTML = "";
    for (const item of items) {
      const itemElement = this.ResItem(item)
      containtItems.append(itemElement);
    }
  }

  static deleteTeam(teams, el) {
    const root = el.parentElement.parentElement;
    const id = root.dataset.id;
    root.remove();
    if (teams.includes(teams[id])) {
      teams.splice(id, 1);
      utilsApp.renderTeamsHTML(teams);
      utilsApp.saveInStorge("teams", teams);
    }
  }

  static showAlert(message, type) {
    const alertElement = document.createElement("div");
    alertElement.classList.add("alert");
    alertElement.innerText = message;
    document.body.append(alertElement);

    if (type == "error") {
      alertElement.classList.add(type);
    } else if (type == "ok") {
      alertElement.classList.add(type);
    }

    setTimeout(() => {
      alertElement.classList.remove(type);
      alertElement.remove();
    }, 1500);
  }

  static saveInStorge(item, value) {
    localStorage.setItem(item, JSON.stringify(value));
  }
}
