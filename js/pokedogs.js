const divPoke = document.querySelector(".pokedogs-container");
window.onload = () => getStorage();

console.log("oi");

const getStorage = () => {
  let arrOfDogs = JSON.parse(localStorage.getItem("dogs") || "[]");
  console.log(arrOfDogs);
  arrOfDogs.forEach(
    dog =>
      (divPoke.innerHTML += `
    <div class="card-dog">
      <label style="color:${dog.colorFont}; font-family:${dog.fontFamily};"> ${dog.name} </label>
      <img src="${dog.img}"/>
      </div>
  `)
  );
};
