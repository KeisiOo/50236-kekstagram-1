'use strict';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  var index = getRandomInRange(0, array.length - 1);
  return array[index];
}

var userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var userDesc = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

function generateGallery(len) {
  var gallery = [];
  for (var i = 0; i < len; i++) {
    gallery.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInRange(15, 200),
      comments: getRandomElement(userComments),
      description: userDesc[i]
    });
  }
  return gallery;
}

var pictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var showPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__stat--comments').textContent = getRandomInRange(15, 200);

  return pictureElement;
};

var photos = generateGallery(25);
var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(showPictures(photos[i]));
}
pictures.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');

var bigPictureContent = function (num) {
  bigPicture.querySelector('img').src = photos[num].url;
  bigPicture.querySelector('.likes-count').textContent = photos[num].likes;
  bigPicture.querySelector('.comments-count').textContent = 1835;

  var socialComments = bigPicture.querySelector('.social__comments');
  socialComments.querySelector('.social__picture').src = 'img/avatar-' + getRandomInRange(1, 6) + '.svg';
  socialComments.querySelector('.social__comment').insertAdjacentText('beforeend', photos[num].comments);
};

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

var openPicture = document.querySelectorAll('.picture__link');
var closePicture = document.querySelector('.big-picture__cancel');

for (var k = 0; k < openPicture.length; k++) {
  openPicture[k].pictureIndex = k;
  openPicture[k].addEventListener('click', function (evt) {
    bigPicture.classList.remove('hidden');
    bigPictureContent(evt.target.pictureIndex);
  });
}

closePicture.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

var uploadFile = document.querySelector('#upload-file');
var openUploadFile = document.querySelector('.img-upload__overlay');
var closeUploadFile = document.querySelector('.img-upload__cancel');

uploadFile.addEventListener('change', function () {
  openUploadFile.classList.remove('hidden');
});

closeUploadFile.addEventListener('click', function () {
  openUploadFile.classList.add('hidden');
});

var imgUploadPreview = document.querySelector('.img-upload__preview');
var effectsToggle = document.querySelectorAll('.effects__radio');

var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

for (var l = 0; l < effectsToggle.length; l++) {
  effectsToggle[l].effectIndex = l;
  effectsToggle[l].addEventListener('click', function (evt) {
    imgUploadPreview.classList.add(effects[evt.target.effectIndex]);
    imgUploadPreview.classList.remove(effects[evt.target.effectIndex - 1]);
    imgUploadPreview.classList.remove(effects[evt.target.effectIndex + 1]);
  });
}

