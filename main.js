'use strict';

/**
 * Осуществляет глубокое копирование объекта
 * @param {*} sourceObject - исходный объект
 * @returns новый объект - копия исходного объекта
 */
const makeObjectDeepCopy = (sourceObject) => {
  let copyResult = {};
  for (let key in sourceObject) {
    if (typeof sourceObject[key] !== "object" || sourceObject[key] === null) {
      copyResult[key] = sourceObject[key];
    } else {
      copyResult[key] = makeObjectDeepCopy(sourceObject[key]);
    }
  }
  return copyResult;
}

/**
 * Проверяет, содержит ли массив только числовые значения
 * @param {Array} array - переданный массив
 * @returns {Boolean} - признак (true/false)
 */
const checkIsEveryNumber = (array) => {
  const flag = array.every((value) => {
    return typeof value === `number`;
  });
  return flag;
}

/**
 * Формирует новый массив из значений переданного, которые входят в интервал (порядок ввода границ интервала не имеет значения)
 * @param {Array} array - переданный массив
 * @param {Number} firstEdge - крайнее значение интервала
 * @param {Number} secondEdge - крайнее значение интервала
 * @returns {Array} - новый массив
 */
const selectFromInterval = (array, firstEdge, secondEdge) => {
  if (!Array.isArray(array)) {
    throw new Error(`Неккоректый ввод!`);
  } else if (!checkIsEveryNumber(array)) {
    throw new Error(`Неккоректый ввод!`);
  }

  if (typeof firstEdge !== `number` || typeof secondEdge !== `number`) {
    throw new Error(`Неккоректый ввод!`);
  }

  if (firstEdge > secondEdge) {
    [firstEdge, secondEdge] = [secondEdge, firstEdge];
  }

  return array.filter(function (value) {
    return (value >= firstEdge && value <= secondEdge);
  })
}

const myIterable = {
  from: 1,
  to: 7
}

myIterable[Symbol.iterator] = function() {
  if (typeof this.from !== `number` || typeof this.to !== `number`) {
    throw new Error(`Ошибка в указании диапазона!`);
  } else if (this.from > this.to) {
    throw new Error(`Ошибка в указании диапазона!`);
  }
  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return {
          done: false,
          value: this.current++
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
};
