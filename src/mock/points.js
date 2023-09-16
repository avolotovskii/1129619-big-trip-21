import { POINTS_TYPE } from './const';
import { getRandomArrayElement, getRandomPhotos, getRandomDescription, getRandomArbitrary } from './utils';
import { POINTS_COUNT, Time, PRICE } from './const';
import { nanoid } from 'nanoid';

const mockDestinations = [
  {
    id: 0,
    description: 'Столица России, город федерального значения, административный центр Центрального федерального округа и центр Московской области',
    name: 'Moscow',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Moscow  Moscow '
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Moscow  Moscow '
      }
    ]
  },
  {
    id: 1,
    description: 'Saint Petersburg, formerly known as Petrograd (1914–1924) and later Leningrad (1924–1991; see below), is the second-largest city in Russia after Moscow.',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Saint Petersburg Saint Petersburg'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Saint Petersburg1 Saint Petersburg1'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Saint Petersburg2 Saint Petersburg2'
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Saint Petersburg3 Saint Petersburg3'
      }
    ]
  },
  {
    id: 2,
    description: 'Is the largest city and administrative centre of Novosibirsk Oblast and the Siberian Federal District in Russia.',
    name: 'Novosibirsk',
    pictures: []
  },
  {
    id: 3,
    description: 'Is a city and the administrative centre of Sverdlovsk Oblast and the Ural Federal District, Russia.',
    name: 'Yekaterinburg ',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Yekaterinburg  Yekaterinburg '
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomArbitrary(1, 10)}`,
        description: 'Yekaterinburg  Yekaterinburg '
      }
    ]
  }
];

const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        idOffer: 1,
        title: 'Choose the radio station',
        price: 60,
      },
      {
        idOffer: 2,
        title: 'Smoking in the cabin',
        price: 100,
      },
      {
        idOffer: 3,
        title: 'Drink alcohol',
        price: 120,
      },
      {
        idOffer: 4,
        title: 'Dance on top of the car alcohol',
        price: 1000,
      },
      {
        idOffer: 5,
        title: 'Fight with the driver',
        price: 500,
      },
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        idOffer: 6,
        title: 'Change place',
        price: 70,
      },
      {
        idOffer: 7,
        title: 'Upgrade to a business class',
        price: 90,
      },
      {
        idOffer: 8,
        title: 'Touch stewardess',
        price: 20,
      },
      {
        idOffer: 9,
        title: 'Touch Visit the cockpit',
        price: 200,
      },
      {
        idOffer: 10,
        title: 'Drink with the pilot',
        price: 150,
      },
      {
        idOffer: 11,
        title: 'Optional lunch',
        price: 33,
      },
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        idOffer: 12,
        title: 'Diving',
        price: 30,
      },
      {
        idOffer: 13,
        title: 'Catch an octopus',
        price: 45,
      },
      {
        idOffer: 14,
        title: 'Release octopus',
        price: 342,
      },
      {
        idOffer: 15,
        title: 'Change cabin',
        price: 123,
      },
      {
        idOffer: 16,
        title: 'Dance with the captain',
        price: 321,
      },
    ]
  },
];

function getRandomPoint() {
  const typePoint = getRandomArrayElement(POINTS_TYPE);
  return {
    id: nanoid(),
    basePrice: getRandomArrayElement(PRICE),
    typePoint,
    destination: getRandomArbitrary(0, 3),
    timeStart: getRandomArrayElement(Time.START),
    timeEnd: getRandomArrayElement(Time.END),
    offersCheck: getCheckedOffers(typePoint),
    description: getRandomDescription(),
    photos: getRandomPhotos(),
    isFavorite: Boolean(getRandomArbitrary(0, 1)),
  };
}

function getRandomPoints() {
  return Array.from({ length: POINTS_COUNT }, getRandomPoint);
}

function getCheckedOffers(typePoint) {
  const checkedOffersId = [];
  const typeOffersObj = mockOffers.find((item) => item.type === typePoint);
  const objWithOffers = typeOffersObj.offers.slice(getRandomArbitrary(1, 2), getRandomArbitrary(1, typeOffersObj.offers.length));
  objWithOffers.forEach((offer) => {
    checkedOffersId.push(offer.idOffer);
  });
  return checkedOffersId;
}

function getListOffers () {
  return mockOffers;
}

function getDestinations() {
  return mockDestinations;
}

export { getRandomPoint, getListOffers, getRandomPoints, getDestinations };

