import {classNames} from '@/shared/lib/classNames/classNames';
import React, {memo, SVGProps} from 'react';
import cls from './Icon.module.scss';

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
    const {className, Svg, inverted, ...otherProps} = props;

    return (
        <Svg className={classNames(cls.Icon, {[cls.Inverted]: inverted}, [className])}  {...otherProps}/>
    );
});
