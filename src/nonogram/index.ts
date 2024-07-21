import './style.scss';
import { NonogramModel } from './nonogram.model';
import { NonogramService } from './nonogram.service';
import { nonogram } from './nonogram.component';

const nonogramModel = new NonogramModel();
const nonogramService = new NonogramService(nonogramModel);
export const Nonogram = nonogram(nonogramService).node;
