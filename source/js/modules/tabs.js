import utils from './utils';

const initialActiveSchool = 0;

const schoolMenu = document.querySelector('.schools');
const schoolsLinks = schoolMenu.children;
const lectures = document.querySelector('.lectures');
const schools = lectures.querySelectorAll('.school');

schoolMenu.children[initialActiveSchool].classList.add('schools__link--active');
schools[initialActiveSchool].classList.remove('is-hidden');

schoolMenu.addEventListener('click', onToggleMenu);

function onToggleMenu(e) {
  e.preventDefault();
  const target = e.target;

  if (target.classList.contains('schools__link--active')) {
    return;
  }

  if (target.classList.contains('schools__link')) {
    const activeLinkIndex = utils.indexOf(schoolMenu, target);
    
    toggleLink(activeLinkIndex);
    showActiveSchool(activeLinkIndex);
  }
}

function toggleLink(linkIndex) {
  for (let link of Array.from(schoolsLinks)) {
    if (link.classList.contains('schools__link--active')) {
      link.classList.remove('schools__link--active');
    }

    if (utils.indexOf(schoolMenu, link) === linkIndex) {
      link.classList.add('schools__link--active');
    }
  }
}

function showActiveSchool(schoolIndex) {
  for (let school of schools) {
    if (!school.classList.contains('is-hidden')) {
     school.classList.add('is-hidden');
    }

    if (utils.indexOf(lectures, school) === schoolIndex) {
      school.classList.remove('is-hidden');
    }
  }
}