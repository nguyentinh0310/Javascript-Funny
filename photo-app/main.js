"use strict";
const url = "http://localhost:3000/products";
const photoList = document.getElementById("list-photo");
const formAdd = document.getElementById("form-add-photo");
const formEdit = document.getElementById("form-edit-photo");
const searchBar = document.getElementById("search-bar");
const randomPhotoAdd = document.getElementById("random-photo-add");
const randomPhotoEdit = document.getElementById("random-photo-edit");
const randomImgAdd = document.getElementById("random-img-add");
const randomImgEdit = document.getElementById("random-img-edit");
const chk = document.getElementById("chk");
const pageConfig = document.querySelector(".page-config select");
const mySelect = document.getElementById("mySelect");
const countTotalPage = document.querySelector(".total-page");
const countTotalProduct = document.querySelector(".total-item");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");
const header = document.querySelector("header");
const btnScrollToTop = document.querySelector("#btnScrollToTop");
const myModal = new bootstrap.Modal(document.getElementById("myModalEdit"), {
  keyboard: false,
});

let photoData = [];
let getAllPhoto = [];
let idCurrent = "";
let randomIdCurrent = "";
let perPage = 24;
let currentPage = 1;
let start = 0;
let end = perPage;
let totalPageCurrent = 0;

window.onscroll = function () {
  if (
    document.body.scrollTop >= 100 ||
    document.documentElement.scrollTop >= 100
  ) {
    document.querySelector("header").classList.add("sticky");
    btnScrollToTop.style.display = "block";
  } else {
    document.querySelector("header").classList.remove("sticky");
    btnScrollToTop.style.display = "none";
  }
};

btnScrollToTop.onclick = function () {
  window.scrollTo(0, 0);
};

chk.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".btn-active").classList.add("dark");
});

// gọi hàm in ra màn hình
window.onload = function () {
  loadPhotos();
  loadAllData();
};

// xử lý form tìm kiếm
searchBar.onkeyup = function (e) {
  window.scrollTo(0, 0);
  const searchString = e.target.value.trim().toLowerCase();
  if (!searchString) {
    return;
  }
  const filterPhotos = getAllPhoto.filter((photo) => {
    return photo.title.toLowerCase().includes(searchString);
  });
  document.querySelector(".photo__paging").style.display = "none";
  if (filterPhotos != 0) {
    document.querySelector(".no-result").style.display = "none";
    renderPhoto(filterPhotos);
  } else {
    document.querySelector(".no-result").style.display = "block";
    renderPhoto([]);
  }
};

// hàm load ảnh limit
const loadPhotos = async () => {
  try {
    const res = await fetch(`${url}?_limit=${perPage}&_page=${currentPage}`);
    photoData = await res.json();
    console.log(photoData);
    renderNumberPage(currentPage);
    renderPhoto(photoData);
  } catch (error) {
    console.error(error);
  }
};

// hàm load tất cả ảnh
const loadAllData = async function () {
  const res = await fetch(url);
  getAllPhoto = await res.json();
  let totalPage = Math.ceil(getAllPhoto.length / perPage);
  totalPageCurrent = totalPage;
  countTotalPage.innerHTML = `Total pages: ${totalPage}`;
  countTotalProduct.innerHTML = `Total Photo:  ${getAllPhoto.length}`;
};

// hàm lấy dữ liệu photo
const renderPhoto = (photos) => {
  let html = photos
    .map((photo) => {
      return `<div class="col-md-3">
                <div class="photo" data-id="${photo.id}">
                  <img src=${photo.image} alt="" />
                  <div class="photo__overlay">
                    <h2 class="photo__title text-center">${photo.title}</h2>
                    <div class="photo__actions">
                      <div>
                        <button type="button" class="btn btn-outline-warning" onclick="onEditPhoto(${photo.id})">Edit</button>
                      </div>
                      <div>
                        <button type="button" class="btn btn-outline-danger" onclick="onDeletePhoto(${photo.id})">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
    })
    .join("");

  photoList.innerHTML = html;
};

// validation bootstrap 5
(function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      true
    );
  });
})();

// xử lý thêm ảnh
formAdd.onsubmit = async function (e) {
  e.preventDefault();

  let title = formAdd.title.value;
  let categoryId = formAdd.categoryId.value;
  categoryId = parseInt(categoryId);
  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        categoryId: categoryId,
        image: setRandomImageUrl(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        getAllPhoto.push(data);
        renderPhoto(getAllPhoto);
      })
      .then(() => location.reload());
  } catch (error) {
    console.log(error);
  }
};

// xử lý nút edit
const onEditPhoto = (id) => {
  idCurrent = id;
  let photoId = getAllPhoto.find((photo) => {
    return photo.id === id;
  });
  myModal.show();
  console.log("id: " + id, photoId);
  console.log("FormEdit", formEdit);
  formEdit.title.value = photoId.title;
  formEdit.categoryId.value = photoId.categoryId;
  formEdit.image.value = photoId.image;
};

// xử lý form edit
formEdit.onsubmit = async function (e) {
  e.preventDefault();
  let title = formEdit.title.value;
  let categoryId = formEdit.categoryId.value;
  categoryId = parseInt(categoryId);
  let image = formEdit.image.value;
  try {
    await fetch(`${url}/${idCurrent}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        categoryId: categoryId,
        image,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload);
  } catch (error) {
    console.log(error);
  }
};

// tạo random ảnh
const getRandomImageUrl = () => {
  const randomId = Math.trunc(Math.random() * 2000);
  console.log(randomId);
  randomIdCurrent = randomId;
  return `https://picsum.photos/id/${randomId}/300/300`;
};

// set random ảnh
const setRandomImageUrl = () => {
  return `https://picsum.photos/id/${randomIdCurrent}/300/300`;
}; //

// xử lý click nút generate photo formAdd
randomPhotoAdd.onclick = function () {
  const randomImageUrl = getRandomImageUrl();
  let html = `<img src=${randomImageUrl} onerror="this.onerror=null;this.src=getRandomImageUrl()" alt="Ooops ... not found. Please click random again!" 
  style="width: 15rem; height: 15rem; name="image">`;
  randomImgAdd.innerHTML = html;
};

// xử lý click nút generate photo formEdit
randomPhotoEdit.onclick = function () {
  const randomImageUrl = getRandomImageUrl();
  let html = `<input type="image" src=${randomImageUrl} onerror="this.onerror=null;this.src=getRandomImageUrl()" alt="Ooops ... not found. Please click random again!" 
        style="width: 15rem; height: 15rem;" name="image">`;
  randomImgEdit.innerHTML = html;
  document.querySelector("#input-image").style.display = "none";
  formEdit.image.value = randomImageUrl;
};
// xử lý nút xóa
const onDeletePhoto = async (id) => {
  if (confirm("Are you sure you want to delete?")) {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json)
      .then(() => location.reload());
  }
};

// tính số trang
function getCurrentPage(currentPage) {
  start = (currentPage - 1) * perPage;
  end = currentPage * perPage;
  console.log(start, end);
}

// xử lý nút prev trang
btnPrev.onclick = function () {
  window.scrollTo(0, 0);
  currentPage--;
  if (currentPage <= 1) {
    currentPage = 1;
  }
  if (currentPage === 1) {
    document.querySelector(".btn-prev").classList.add("btn-active");
  } else {
    document.querySelector(".btn-next").classList.remove("btn-active");
  }

  getCurrentPage(currentPage);
  renderPhoto(photoData);
  loadPhotos();
};

// xử lý nút next trang
btnNext.onclick = function () {
  window.scrollTo(0, 0);
  currentPage++;
  if (currentPage > totalPageCurrent) {
    currentPage = totalPageCurrent;
  }
  if (currentPage === totalPageCurrent) {
    btnNext.setAttribute("disabled", true);
    document.querySelector(".btn-next").classList.add("btn-active");
  } else {
    document.querySelector(".btn-prev").classList.remove("btn-active");
  }

  getCurrentPage(currentPage);
  renderPhoto(photoData);
  loadPhotos();
};

// xử lý hiển thị số page
const renderNumberPage = (currentPage) => {
  console.log(currentPage);
  let html = `<li><a>${currentPage}</a></li>`;

  document.getElementById("number-page").innerHTML = html;
};
