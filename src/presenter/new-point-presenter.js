import {remove, render, RenderPosition} from '../framework/render.js';
import PointEditFormView from '../view/point-edit-form-view.js';
import {nanoid} from 'nanoid';
import {UserAction, UpdateType} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditFormComponent = null;

  #destinations = [];
  #listOffers = [];

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(destinations, listOffers) {
    this.#destinations = destinations;
    this.#listOffers = listOffers;

    if (this.#pointEditFormComponent !== null) {
      return;
    }

    this.#pointEditFormComponent = new PointEditFormView({ // При создании НЕ указываем точку, чтобы был BLANK POINT
      destinations: this.#destinations,
      listOffers: this.#listOffers,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if(this.#pointEditFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditFormComponent);
    this.#pointEditFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
