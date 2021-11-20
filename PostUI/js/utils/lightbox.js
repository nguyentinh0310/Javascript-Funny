function showModal(modalElement) {
  // make sure bootstrap script is loaded
  if (!window.bootstrap) return;

  const modal = new window.bootstrap.Modal(modalElement);
  if (modal) modal.show();
}

// handle click for all imgs --> Event Delegation
// img click --> find all imgs with the same album / gallery
// determine index of selected img
// show modal with selected img
// handle prev / next click
export function registerLightBox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId);
  if (!modalElement) return;

  // check if this modal is registered or not
  if (Boolean(modalElement.dataset.registered)) return;

  // selectors
  const imageElement = modalElement.querySelector(imgSelector);
  const prevButton = modalElement.querySelector(prevSelector);
  const nextButton = modalElement.querySelector(nextSelector);
  if (!imageElement || !prevButton || !nextButton) return;

  // lightbox var
  let imgList = [];
  let currentIndex = 0;

  function showImageAtIndex(index) {
    imageElement.src = imgList[index].src;
  }

  document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.tagName !== 'IMG' || !target.dataset.album) return;

    // img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`);
    currentIndex = [...imgList].findIndex((x) => x === target);

    showImageAtIndex(currentIndex);
    showModal(modalElement);

    console.log({ target, currentIndex, imgList });

    prevButton.addEventListener('click', () => {
      // vd (-1 +3) % 3 = 2 
      // + imgList.length đảm bảo ko âm
      currentIndex = (currentIndex - 1 + imgList.length) % imgList.length;
      showImageAtIndex(currentIndex);
    });

    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imgList.length;
      showImageAtIndex(currentIndex);
    });
  });
    // mark this modal is already registered
    // tránh sự kiện modal lặp đi lặp lại nhiều lần
    modalElement.dataset.registered = 'true'
}
