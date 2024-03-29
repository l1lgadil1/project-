import {classNames} from '@/shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {Text, TextSize} from "@/shared/ui/Text/Text";
import {ArticleList} from "@/entities/Article";
import {useArticleRecommendations} from "../../api/articleRecommendationsApi";

interface ArticleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = memo((props: ArticleRecommendationListProps) => {
    const {className} = props;
    const {t} = useTranslation();
    const {data: articles, isSuccess, isLoading, error} = useArticleRecommendations(3);

    if (isLoading || error || !articles) {
        return null
    }

    return (
        <div className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            {isSuccess && <ArticleList articles={articles} target="_blank"/>}
        </div>
    );
});
