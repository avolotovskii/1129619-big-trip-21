import { render, RenderPosition } from './framework/render';
import { getRandomPoints, getListOffers, getDestinations } from './mock/points';
import TripInfo from './view/trip-info-view';
import BoardPresenter from './presenter/points-list-presenter';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import NewPointButtonView from './view/new-point-button';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const siteTripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteTripFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

// мы создали модель обьект с ключом points и значением массива обьектов с точками
const pointsModel = new PointsModel(getRandomPoints(), getListOffers(), getDestinations());
const filterModel = new FilterModel();
// аргументом мы передаем кусок разметки,
// где у нас будет распологаться содержимое презентера
const pointListPresenter = new BoardPresenter({
  pointContainer: tripEventsElement,
  pointsModel,
  filterModel,
  onNewTaskDestroy: handleNewTaskFormClose,
});

const newPointButtonView = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewTaskFormClose() {
  newPointButtonView.element.disabled = false;
}

function handleNewPointButtonClick() {
  pointListPresenter.createPoint();
  newPointButtonView.element.disabled = true;
}

render(new TripInfo(), siteTripMainElement, RenderPosition.AFTERBEGIN);

render(newPointButtonView, siteTripMainElement);

const filterPresenter = new FilterPresenter({
  filterContainer: siteTripFiltersElement,
  filterModel,
  pointsModel
});

filterPresenter.init();
pointListPresenter.init();
