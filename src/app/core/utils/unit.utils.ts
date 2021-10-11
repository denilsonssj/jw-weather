import { Unit } from "../models/Unit.enum";

export function unitToSymbol(unit: Unit): string {
  switch(unit) {
    case Unit.METRIC:
      return 'ºC';
    case Unit.IMPERIAL:
      return 'ºF';
    case Unit.SI:
      return 'K';
    default:
      return '';
  }
}