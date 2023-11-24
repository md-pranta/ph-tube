"use strict";
const sorted = document.querySelector(".sorted");
const catagories = document.querySelector(".catagories");

const show = document.querySelector(".show");
const error = document.querySelector(".error");
// console.log(sorted);
let flag = false;
let catagory_id = null;
//convert the time
sorted.addEventListener("click", () => {
  flag = !flag;
  selectedCatagory(catagory_id);
});

function convertTime(sec) {
  let t = sec;
  let h = Math.round(t / 60 / 60);
  let m = Math.round(t / 60 - h * 60);
  return `${h} hours ${m} minutes ago`;
}

//display videos accourding to category
function display(list) {
  const data = JSON.parse(JSON.stringify(list));

  flag &&
    data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));

  if (data.length != 0) {
    error.classList.add("d-none");
    show.innerHTML = "";
    data.forEach((val) => {
      const div = document.createElement("div");
      div.innerHTML = `
      
      <div class="col">
      <div class="card">
      <div class="card_container">
      <img src=${val.thumbnail} class="card-img-top card_image" alt="thumbnail">
      <div class="time">
      <p class="p-0 m-0">
      ${val.others.posted_date ? convertTime(val.others.posted_date) : ""}
      </p>
      </div>
      </div>
      <div class="card-body">
      <div class="d-flex">
      <div>
      <img 
      class="img-fluid profile_img" src=${
        val.authors[0].profile_picture
      } alt="profile">
      </div>
      <div class="ps-2">
      <h6>${val.title}</h6>
      <div class="d-flex">
      <p class="py-0 pe-2 m-0">${val.authors[0].profile_name}</p>
      ${
        val.authors[0].verified == true
          ? `<i class="text-primary bi bi-patch-check-fill"></i>`
          : ""
      }
      </div>
      <p class="py-0 my-0">${val.others.views}</p>
      </div>
      </div>
      </div>
      </div>
      </div>`;
      show.appendChild(div);
    });
  } else {
    show.innerHTML = "";
    error.classList.remove("d-none");
  }
}

//parse data accouridin to catagory id
async function selectedCatagory(id) {
  catagory_id = id;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  // console.log(data);
  display(data.data);
}
// to create catagories
function createCatagories(list) {
  selectedCatagory(1000);
  list.forEach((val) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class= pe-3>
    <button onclick="selectedCatagory(${val.category_id})" class="btn btn-secondary category_btn">
    ${val.category}
    </button>
    </div>`;
    catagories.appendChild(div);
  });
}

async function parseCatagories() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  // console.log(data.data);
  createCatagories(data.data);
}
parseCatagories();
// // val.authors[0].varified
// //val.others.posted_date
// "use strict";
// const btn1 = document.querySelector(".btn1");
// const btn2 = document.querySelector(".btn2");
// const cat = document.querySelector(".catagories");
// const all = document.querySelector(".all");

// const showVideos = function (arra, id) {
//   console.log(id);
//   const s = document.querySelector(".show");
//   //   console.log(arra);
//   all.innerHTML = arra
//     .map((val) => {
//       return `
//         <div class="card" style="width: 18rem;">
//             <img src=${val.thumbnail} class="card-img-top" alt="thumbnail">
//             <div class="card-body">
//                 <h3>${val.title}</h3>
//                 <p>${val.authors[0].profile_name}</p>
//                 <p>${val.others.views}</p>
//             </div>
//         </div>
//         `;
//     })
//     .join("");
// };
// const videos = function (id) {
//   //   console.log(id);
//   fetch(`https://openapi.programming-hero.com/api/videos/category/${1000}`)
//     .then((res) => res.json())
//     .then((data) => showVideos(data.data, id));
// };

// function createCatagories(array) {
//   array.forEach((element) => {
//     console.log(element);
//     const bt = `
//       <button onClick= "videos(${element.category_id})">${element.category}</button>
//        `;
//     cat.insertAdjacentHTML("beforeend", bt);
//   });
// }

// const catagories = function () {
//   fetch("https://openapi.programming-hero.com/api/videos/categories")
//     .then((res) => res.json())
//     .then((data) => createCatagories(data.data));
// };
// // catagories();
