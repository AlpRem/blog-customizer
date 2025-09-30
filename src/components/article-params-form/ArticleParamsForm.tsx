import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { MouseEvent, useState } from 'react';
import { clsx } from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	onApply: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [stateStyle, setStateStyle] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (field: keyof ArticleStateType, value: OptionType) => {
		setStateStyle((prev) => ({ ...prev, [field]: value }));
	};

	const onApplyStyle = (e: MouseEvent) => {
		e.preventDefault();
		onApply(stateStyle);
	};

	const onResetStyle = (e: MouseEvent) => {
		e.preventDefault();
		setStateStyle(defaultArticleState);
		onApply(defaultArticleState);
	};

	const toggleArrowButton = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleArrowButton} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<header>
						<h2 className={styles.title}>Задайте параметры</h2>
					</header>

					<Select
						title={'Шрифт'}
						placeholder={'Установите размер шрифта'}
						options={fontFamilyOptions}
						selected={stateStyle.fontFamilyOption}
						onChange={(v) => handleChange('fontFamilyOption', v)}
					/>

					<RadioGroup
						title={'Размер шрифта'}
						name={'fontSize'}
						options={fontSizeOptions}
						selected={stateStyle.fontSizeOption}
						onChange={(v) => handleChange('fontSizeOption', v)}
					/>

					<Select
						title={'Цвет шрифта'}
						placeholder={'Установите цвет шрифта'}
						options={fontColors}
						selected={stateStyle.fontColor}
						onChange={(v) => handleChange('fontColor', v)}
					/>

					<Separator />

					<Select
						title={'Цвет фона'}
						placeholder={'Установите цвет фона'}
						options={backgroundColors}
						selected={stateStyle.backgroundColor}
						onChange={(v) => handleChange('backgroundColor', v)}
					/>

					<Select
						title={'Ширина контента'}
						placeholder={'Установите ширину контента'}
						options={contentWidthArr}
						selected={stateStyle.contentWidth}
						onChange={(v) => handleChange('contentWidth', v)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={(e) => onResetStyle(e)}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={(e) => onApplyStyle(e)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
