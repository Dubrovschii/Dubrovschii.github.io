const hoverText = document.querySelectorAll('img');
const modalPlus = document.querySelectorAll('.portfolio_plus');

modalPlus.forEach(e => {
    e.style.display = 'none';
});

hoverText.forEach(item => item.addEventListener('mouseover', (e) => {
    const thisModal = e.target.parentElement;
    console.log(thisModal);
    thisModal.children[1].style = 'display: block;'
}))


hoverText.forEach(item => item.addEventListener('mouseout', (e) => {
    const thisModal = e.target.parentElement;
    thisModal.children[1].style = 'display: none;'
}))

modalPlus.forEach(elem => elem.addEventListener('click', (e) => {
    const thisElem = e.target.parentElement;
    thisElem.children[2].style = 'display: block;'
}))

