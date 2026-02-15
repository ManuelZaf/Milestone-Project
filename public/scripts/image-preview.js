const imagePickerElement = document.querySelector('#image-upload-control input');
const imagePreviwElement = document.querySelector('#image-upload-control img');

function updateImagePreview(){
    const files = imagePickerElement.files;

    if(!files || files.length === 0){
        imagePreviwElement.computedStyleMap.display = 'none';
        return;
    }

    const pickedFile = files[0];
    imagePreviwElement.src = URL.createObjectURL(pickedFile);
    //URL is a built-in class in JS. On that class, we use this static method. 
    //Since it's static, we don't have to instantiate the class
    imagePreviwElement.style.display = 'block';
}



imagePickerElement.addEventListener('change',updateImagePreview);