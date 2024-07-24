import './style.scss';
import { NonogramModel } from './nonogram.model';
import { nonogram } from './nonogram.component';
import { template } from './api/templateExample';

const nonogramModel = new NonogramModel(template);

export const Nonogram = nonogram(nonogramModel).node;
