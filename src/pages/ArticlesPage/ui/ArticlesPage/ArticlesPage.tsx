import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {DynamicModuleLoader, ReducersList} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {useAppDispatch} from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {Page} from '@/widgets/Page/Page';
import {ArticlesPageFilters} from '../ArticlesPageFilters/ArticlesPageFilters';
import {fetchNextArticlesPage} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {articlesPageReducer, getArticles} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import {ArticleInfiniteList} from "@/pages/ArticlesPage/ui/ArticleInfiniteList/ArticleInfiniteList";

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const {className} = props;
    const {t} = useTranslation();
    const dispatch = useAppDispatch();


    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                data-testid="ArticlesPage"
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlesPageFilters/>
                <ArticleInfiniteList/>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
