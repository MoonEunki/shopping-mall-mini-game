loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch((err) => console.log(err));

async function loadItems() {
  const response = await fetch("data/data.json");
  const json = await response.json();
  return json.items;
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

function createHTMLString(item) {
  return `
    <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">${item.gender} , ${item.size}</span>
    </li>
    `;
}

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const button = document.querySelector(".buttons");

  logo.addEventListener("click", () => {
    console.log("로고가 클릭됐습니다");
  });

  button.addEventListener("click", (event) => {
    onButtonClick(event, items);
  });
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtering = items.filter((item) => item[key] === value);

  displayItems(filtering);
}
