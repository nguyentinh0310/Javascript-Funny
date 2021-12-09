// Active modal

// let template = `<div class="modal">
// <div class="modal-content">
//   <i class="fa fa-times modal-close"></i>
//   <div class="modal-desc">
//     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium,
//     cum quae? Vel possimus libero sed eligendi assumenda ducimus
//     voluptatem officiis ipsum. Beatae error distinctio officiis ad
//     quisquam. Vero, nesciunt repellat.
//   </div>

//   <div class="modal-action">
//     <button class="modal-submit">Confirm</button>
//     <button class="modal-cancel">Cancel</button>
//   </div>
// </div>
// </div>`;

// const body = document.body;

// body.insertAdjacentHTML("afterbegin", template);

const modal = document.createElement("div");
modal.classList.add("modal");
const modalContent = document.createElement("div");
modalContent.classList.add("modal-content");
modal.appendChild(modalContent);
const modalClose = document.createElement("i");
modalClose.classList.add("fa fa-times modal-close");
modalContent.appendChild(modalClose);
// const modalDesc = document.createElement("div");
// modalDesc.classList.add("modal-desc");
// modalDesc.textContent =
//   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium,cum quae? Vel possimus libero sed eligendi assumenda ducimus voluptatem officiis ipsum. Beatae error distinctio officiis ad quisquam. Vero, nesciunt repellat.";
// modalContent.appendChild(modalDesc);
document.body.appendChild(modal);

const modalWrapper = document.querySelector(".modal");

if (modalWrapper) {
  setTimeout(() => {
    modalWrapper.classList.add("is-show");
  }, 5000);
}
console.log("hello world")
