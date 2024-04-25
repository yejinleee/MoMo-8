import { createContext } from 'react';
import { IPostTitleCustom } from '@/api/_types/apiModels';

export const postIdContext = createContext<string>('');
export const postTitleContext = createContext<IPostTitleCustom | null>(null);
