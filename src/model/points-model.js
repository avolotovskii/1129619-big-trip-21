import Observable from '../framework/observable';


export default class PointsModel extends Observable {
  #points;
  #listOffers;
  #listDestination;

  constructor(points, listOffers, listDestination) {
    super();
    this.#points = points;
    this.#listOffers = listOffers;
    this.#listDestination = listDestination;
  }

  get points() {
    return this.#points;
  }

  get listOffers() {
    return this.#listOffers;
  }

  get listDestination() {
    return this.#listDestination;
  }

  updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      updatedPoint,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, updatedPoint);
  }

  addPoint(updateType, updatedPoint) {
    this.#points = [
      updatedPoint,
      ...this.#points,
    ];

    this._notify(updateType, updatedPoint);
  }


  deletePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((task) => task.id === updatedPoint.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

}
