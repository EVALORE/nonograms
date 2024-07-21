import './style.scss';
import { nonogram } from './nonogram.ui';
export * from './nonogram.model';
export * from './nonogram.service';

export const Nonogram = nonogram().node;
