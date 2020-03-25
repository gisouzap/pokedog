window.onload = () => imgDog();

const url = "https://dog.ceo/api/breeds/list";

const container = document.querySelector(".container");
const dropdown = document.querySelector(".dropdown");

// ---------- Gera o select com as raças
fetch(url)
  .then(response => response.json())
  .then(data => {
    const arrBreed = data.message;
    arrBreed.forEach(
      breed =>
        (dropdown.innerHTML += `
        <option value=${breed}>${breed}</option>
      `)
    );
  });

// ---------- Gera a div com a imagem, por padrão inicia pela primeira raça

const imgDog = (breed = "affenpinscher") => {
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/14`)
    .then(res => res.json())
    .then(data => {
      data.message.forEach(
        dog =>
          (container.innerHTML += `
        <div class="dog">
          <img src=${dog} class="img__dog" onclick="choosen('${dog}')">
        </div>
      `)
      );
    });
};

// ---------- Passa raça por meio do change, reseta container

const onChangeHandler = () => {
  imgDog(dropdown.value);
  container.innerHTML = "";
};

// ---------- Doguinho clicado, abre modal e manda o caminho da imagem
const imgModal = document.querySelector(".modal-img");
const modal = document.querySelector(".modal");
const span = document.querySelector(".close");

const choosen = dog => {
  modal.style.display = "block";
  imgModal.src = dog;
};

span.onclick = () => (modal.style.display = "none");

window.onclick = e => (e.target == modal ? (modal.style.display = "none") : "");

// --------- Pegando o valor do input name
const nameOfDog = document.querySelector(".input-name");
const fontDropdown = document.querySelector(".font-dropdown");
const colorFontDropdown = document.querySelector(".color-dropdown");
let labelName = document.querySelector(".dog-name");

// --------- Populando select com color

const colors = [
  {
    color: "#fb8602",
    name: "Laranja"
  },
  {
    color: "#94c6f7",
    name: "Azul claro"
  },
  {
    color: "#f93d32",
    name: "Vermelho"
  },
  {
    color: "#4e7e42",
    name: "Verde"
  },
  {
    color: "#fede00",
    name: "Amarelo"
  }
];

colors.forEach(
  color =>
    (colorFontDropdown.innerHTML += `
<option value=${color.color} style="background-color:${color.color} !important;">${color.name}</option>
`)
);

// --------- Populando select com Fonte

const fonts = [
  "Pacifico",
  "Indie Flower",
  "Amatic SC",
  "Gochi Hand",
  "Reenie Beanie"
];

fonts.forEach(
  font =>
    (fontDropdown.innerHTML += ` <option value="${font}" style="font-family:${font}, cursive" !important;">${font}</option>`)
);

// ----- Muda cor e fonte
const changeData = () => {
  labelName.style.fontFamily = fontDropdown.value;
  labelName.style.color = colorFontDropdown.value;
  labelName.innerHTML = nameOfDog.value;
};

document.onchange = () => {
  changeData();
};

// Salvando e mostrando toast

const btnSave = document.querySelector(".saveData");
const toast = document.querySelector("#toast");

btnSave.addEventListener("click", () => {
  saveOnStorage();
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
});

const saveOnStorage = () => {
  let arrOfDogs = JSON.parse(localStorage.getItem("dogs") || "[]");
  let listFilter = arrOfDogs.filter(dog => dog.img == imgModal.src);

  if (listFilter == "") {
    arrOfDogs.push({
      name: nameOfDog.value,
      img: imgModal.src,
      colorFont: colorFontDropdown.value,
      fontFamily: fontDropdown.value,
      date: new Date()
    });
    localStorage.setItem("dogs", JSON.stringify(arrOfDogs));
  }
};
