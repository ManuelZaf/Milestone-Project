const mobileMenuBtnElement = document.getElementById('mobile-menu-btn');
const mobileMenuElement = document.getElementById('mobile-menu');


function toggleMobileMenu(){
    mobileMenuElement.classList.toggle('open'); //With classList we edit the class attributes of the element
}

mobileMenuBtnElement.addEventListener('click', toggleMobileMenu);