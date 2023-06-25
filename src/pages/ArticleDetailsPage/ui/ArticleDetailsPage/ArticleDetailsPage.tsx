import {classNames} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import React, {memo} from 'react';
import {ArticleDetails} from 'entities/Article';
import {useParams} from 'react-router-dom';
import cls from './ArticleDetailsPage.module.scss';
import {Text} from "shared/ui/Text";
import {CommentList} from "entities/Comment";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {articleDetailsCommentsReducer, getArticleComments} from "../../model/slices/ArticleDetailsCommentsSlice";
import {useSelector} from "react-redux";
import {getArticleCommentsIsLoading} from "../../model/selectors/comments";
import {useInitialEffect} from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
    fetchCommentsByArticleId
} from "pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer
}
const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {className} = props;
    const dispatch = useAppDispatch()
    const {t} = useTranslation('article-details');
    const {id} = useParams<{ id: string }>();
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id}/>
                <Text className={cls.commentTitle} title={t('Комментарии')}/>
                <CommentList isLoading={commentsIsLoading} comments={comments}/>
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);