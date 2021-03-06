import { randomNumber, setBackgroundImage, setFieldValue, setTextContent } from '.';
import * as yup from 'yup';

const ImageSource = {
  PICSUM: 'picsum',
  UPLOAD: 'upload',
};

function setFormValues(form, formValues) {
  setFieldValue(form, '[name="title"]', formValues?.title);
  setFieldValue(form, '[name="author"]', formValues?.author);
  setFieldValue(form, '[name="description"]', formValues?.description);

  setFieldValue(form, '[name="imageUrl"]', formValues?.imageUrl); // hidden field
  setBackgroundImage(document, '#postHeroImage', formValues?.imageUrl);
}

function getFormValues(form) {
  const formValues = {};

  // C1: query each input and add to values object
  // ['title', 'author', 'description', 'imageUrl'].forEach((name) => {
  //   const field = form.querySelector(`[name="${name}"]`);
  //   if (field) formValues[name] = field.value;
  // });

  // C2: using form data
  const data = new FormData(form);
  for (const [key, value] of data) {
    formValues[key] = value;
  }
  return formValues;
}

function getPostSchema() {
  return yup.object().shape({
    title: yup.string().required('Please enter title'),
    author: yup
      .string()
      .required('Please enter author')
      .test(
        'at-least-two-words',
        'Please enter at least two words',
        (value) => value.split(' ').filter((x) => !!x && x.length >= 3).length >= 2
      ),
    description: yup.string(),
    imageSource: yup
      .string()
      .required('Please selected an image source')
      .oneOf([ImageSource.PICSUM, ImageSource.UPLOAD], 'Invalid image source'),
    imageUrl: yup.string().when('imageSource', {
      is: ImageSource.PICSUM,
      then: yup
        .string()
        .required('Please random a background image')
        .url('Please enter a valid URL'),
    }),
    image: yup.mixed().when('imageSource', {
      is: ImageSource.UPLOAD,
      then: yup
        .mixed()
        .test('required', 'Please select an image to upload', (file) => Boolean(file?.name))
        .test('max-3mb', 'The image is too large (max 3mb)', (file) => {
          const fileSize = file.size || 0;
          const MAX_SIZE = 3 * 1024 * 1024; // 3mb
          return fileSize <= MAX_SIZE;
        }),
    }),
  });
}

function setFieldError(form, name, error) {
  const element = form.querySelector(`[name="${name}"]`);
  if (element) {
    element.setCustomValidity(error);
    setTextContent(element.parentElement, '.invalid-feedback', error);
  }
}

// VALIDATOR
async function validatePostForm(form, formValues) {
  try {
    // reset previous errors
    ['title', 'author', 'imageUrl', 'image'].forEach((name) => setFieldError(form, name, ''));

    // start validation
    const schema = getPostSchema();
    //abortEarly: false c?? bao nhi??u l???i validate h???t
    await schema.validate(formValues, { abortEarly: false });
  } catch (error) {
    console.log(error.name);
    console.log(error.inner);
    const errorLog = {};

    if (error.name === 'ValidationError' && Array.isArray(error.inner)) {
      for (const validationError of error.inner) {
        // tr??? t???i path
        const name = validationError.path;

        // b??? qua n???u tr?????ng validate ???? c??
        if (errorLog[name]) continue;

        // set field error and mark as logged
        setFieldError(form, name, validationError.message);
        error[name] = true;
      }
    }
  }

  // add class="was-validated" to form element
  const isValid = form.checkValidity();
  if (!isValid) form.classList.add('was-validated');
  return isValid;
}

function showLoading(form) {
  const button = form.querySelector('[name="submit"]');
  if (button) {
    button.disabled = true;
    button.textContent = 'Saving...';
  }
}

function hideLoading(form) {
  const button = form.querySelector('[name="submit"]');
  if (button) {
    button.disabled = false;
    button.textContent = 'Save';
  }
}

function initRandomImage(form) {
  const randomButton = document.getElementById('postChangeImage');
  if (!randomButton) return;

  randomButton.addEventListener('click', () => {
    const imageUrl = `https://picsum.photos/id/${randomNumber(1000)}/1368/400`;
    console.log(imageUrl)

    setFieldValue(form, '[name="imageUrl"]', imageUrl); // hidden field
    setBackgroundImage(document, '#postHeroImage', imageUrl);
  });
}

function renderImageSource(form, selectedValue) {
  const controlList = form.querySelectorAll('[data-id="imageSource"]');
  controlList.forEach((control) => {
    control.hidden = control.dataset.imageSource !== selectedValue;
  });
}

function initRadioImageSource(form) {
  const radioList = form.querySelectorAll('[name="imageSource"]');
  radioList.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      renderImageSource(form, e.target.value);
    });
  });
}

async function validateFormField(form, formValues, name) {
  try {
    // clear previous error
    setFieldError(form, name, '');

    const schema = getPostSchema();
    await schema.validateAt(name, formValues);
  } catch (error) {
    setFieldError(form, name, error.message);
  }
  // show validation error (if any)
  const field = form.querySelector(`[name="${name}"]`);
  if (field && !field.checkValidity()) {
    field.parentElement.classList.add('was-validated');
  }
}

function initUploadImage(form) {
  // prev upload
  // m???i l???n thay ?????i file d?????i local -> use URL.createObjectURL(input.files[0])
  const uploadImage = form.querySelector('[name="image"]');
  if (!uploadImage) return;

  uploadImage.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const image = URL.createObjectURL(file);
      setBackgroundImage(document, '#postHeroImage', image);

      validateFormField(
        form,
        {
          imageSource: ImageSource.UPLOAD,
          image: file,
        },
        'image'
      );
    }
  });
}

function initValidationOnChange(form) {
  ['title', 'author'].forEach((name) => {
    const field = form.querySelector(`[name="${name}"]`);
    field.addEventListener('input', (e) => {
      const newValue = e.target.value;
      validateFormField(form, { [name]: newValue }, name);
    });
  });
}

export default function initPostForm({ formId, defaultValues, onSubmit }) {
  const form = document.getElementById(formId);
  if (!form) return;
  let submitting = false;
  setFormValues(form, defaultValues);

  // init events
  initRandomImage(form);
  initRadioImageSource(form);
  initUploadImage(form);
  initValidationOnChange(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prevent other submission
    if (submitting) return;

    showLoading(form);
    submitting = true;

    // get form values
    const formValues = getFormValues(form);
    // truy???n form l??n tk cha ph???i g???n id v??o
    formValues.id = defaultValues.id;

    // validation
    // if valid trigger submit callback
    // otherwise, show validation errors
    // 018 Handle form submission TODO
    const isValid = await validatePostForm(form, formValues);
    if (isValid) await onSubmit?.(formValues);

    // always hide loading no matter form is valid or not
    hideLoading(form);
    submitting = false;
  });
}
