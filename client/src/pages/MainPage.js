import { SERVER_URL } from '@/constants/constant';
import { cardDetail, cardList } from '@/components/common';
import { $, slider } from '@/utils';
import { _ } from '@/utils/customFx';
import { navigate } from '@/core/router';

const oneCardIconUrl = `${SERVER_URL.IMG}icon/image.svg`;
const listIconUrl = `${SERVER_URL.IMG}icon/list.svg`;
const dropdownIconUrl = `${SERVER_URL.IMG}icon/angle-down.svg`;
const plusIconUrl = `${SERVER_URL.IMG}icon/plus.svg`;

const cards = [
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'twosome place',
    itemName: 'Americano & Tiramisu',
    dateOfUse: '2023.07.07 까지',
  },
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'starbucks',
    itemName: 'Latte',
    dateOfUse: '2023.07.07 까지',
  },
  {
    image: 'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/icon/gifticonSample.jpeg',
    shopName: 'The venti',
    itemName: 'Vanilla Latte',
    dateOfUse: '2023.07.07 까지',
  },
];
const MainPage = {};

MainPage.temp = `
    <article class='main-card-article'>
      <div class='main-card-container'>
        <div class="main-card-box">
          <div class='main-button-container'>
            <section class='show-card-section'>
              <img class='one-card-button' src='${oneCardIconUrl}' alt='square-card-button' />
              <img class='list-card-button' src='${listIconUrl}' alt='list-card-button' />
            </section>
            <section class='main-dropdown-section'>
              <button class='main-dropdown-button'>
              최신순
              <img class='main-dropdown-image' src='${dropdownIconUrl}' alt='dropdown-image' />
              </button>
            </section>
          </div>
          <section class='cards-section'>
            ${cards.map((detail) => cardDetail(detail)).join('')}
          </section>
          <ul class="card-pagination"></ul>
          <button type="button" id="plus-button">
            <img class='plus-button-image' src='${plusIconUrl}' alt='plus-button' />
          </button>
        </div>
      </div>
    </article>
  `;

// prettier-ignore
const renderDetail = () =>
  _.go(
    cards.map((detail) => cardDetail(detail)).join(''),
    $.el,
    $.replace($.qs('.cards-section')));

// prettier-ignore
const showCardDetail = () => 
  _.pipe(
    $.find('.one-card-button'),
    $.on('click', renderDetail()));

// prettier-ignore
const renderList = () => 
  _.go(
    cards.map((detail) => cardList(detail)).join(''), 
    $.el, 
    $.replace($.qs('.cards-section')));

// prettier-ignore
const showCardList = () => 
  _.pipe(
    $.find('.list-card-button'),
    $.on('click', renderList()));

// prettier-ignore
MainPage.handleClickaddCard = (target) =>
  _.pipe(
    $.find('#plus-button'),
    $.on('click', () => navigate('/post')))(target);

// prettier-ignore
MainPage.render = () =>
    _.go(
      MainPage.temp,
      $.el,
      $.replace($.qs('#root')));

// prettier-ignore
const navigateMain = () => 
    _.go(
      MainPage.render(),
      slider(),
      () => showCardList(),
      () => showCardDetail(),
      () => MainPage.handleClickaddCard());

export default navigateMain;
