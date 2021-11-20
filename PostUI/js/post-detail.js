import postApi from './api/postApi';
import { registerLightBox, setTextContent } from './utils';
import dayjs from 'dayjs';

function renderPostDetail(post) {
  if (!post) return;

  // update title, description, author, thumbnail
  setTextContent(document, '#postDetailTitle', post.title);
  setTextContent(document, '#postDetailDescription', post.description);
  setTextContent(document, '#postDetailAuthor', post.author);
  setTextContent(
    document,
    '#postDetailTimeSpan',
    dayjs(post.updatedAt).format(' - DD/MM/YYYY HH:mm')
  );

  // render hero image (imageUrl)
  const heroImage = document.getElementById('postHeroImage');
  if (heroImage) {
    heroImage.style.backgroundImage = `url("${post.imageUrl}")`;

    heroImage.addEventListener('error', () => {
      heroImage.style.backgroundImage = 'https://via.placeholder.com/1368x400?text=thumbnail';
    });
  }

  // render edit page link
  const editPageLink = document.getElementById('goToEditPageLink');
  if (editPageLink) {
    editPageLink.href = `/add-edit-post.html?id=${post.id}`;

    editPageLink.innerHTML = '<i class="fas fa-edit"></i> Edit Post';
  }
}

(async () => {
  try {
    registerLightBox({
      modalId: 'lightbox',
      imgSelector: 'img[data-id="lightboxImg"]',
      prevSelector: 'button[data-id="lightboxPrev"]',
      nextSelector: 'button[data-id="lightboxNext"]',
    });
    // get post id from URL
    const searchParams = new URLSearchParams(window.location.search);
    const postId = searchParams.get('id');
    if (!postId) {
      console.log('Post not found');
      return;
    }

    // fetch post detail API
    const post = await postApi.getById(postId);
    renderPostDetail(post);
    // render post detail
  } catch (error) {
    console.log('failed to fetch post detail', error);
  }
})();
