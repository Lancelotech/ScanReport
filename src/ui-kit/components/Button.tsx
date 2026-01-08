import React from 'react';
import {
	ActivityIndicator,
	Pressable,
	PressableProps,
	Text,
	TextStyle,
	ViewStyle,
} from 'react-native';
import { Colors } from '../../constants/theme';
import { useColorScheme } from '../../hooks/use-color-scheme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
	title: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	disabled?: boolean;
	containerStyle?: ViewStyle;
	textStyle?: TextStyle;
	fullWidth?: boolean;
}

/**
 * Common Button component with theme support
 * - Supports multiple variants (primary, secondary, outline, ghost)
 * - Supports multiple sizes (sm, md, lg)
 * - Loading state with spinner
 * - Disabled state
 * - Full width option
 */
export function Button({
	title,
	variant = 'primary',
	size = 'md',
	loading = false,
	disabled = false,
	containerStyle,
	textStyle,
	fullWidth = false,
	onPress,
	...pressableProps
}: ButtonProps) {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? 'light'];

	const isDisabled = disabled || loading;

	// Size styles
	const sizeClasses = {
		sm: 'px-4 py-2',
		md: 'px-6 py-3',
		lg: 'px-8 py-4',
	};

	const textSizeClasses = {
		sm: 'text-sm',
		md: 'text-base',
		lg: 'text-lg',
	};

	// Variant styles
	const getVariantClasses = () => {
		if (isDisabled) {
			return 'bg-transparent';
		}

		switch (variant) {
			case 'primary':
			case 'secondary':
			case 'outline':
			case 'ghost':
				return 'bg-transparent';
			default:
				return 'bg-transparent';
		}
	};

	const getTextColorClasses = () => {
		// Text color is handled via inline styles
		return '';
	};

	// Get border style based on variant
	const getBorderStyle = (): ViewStyle => {
		if (isDisabled) {
			return {
				borderWidth: 2,
				borderColor: colorScheme === 'dark' ? '#4B5563' : '#9CA3AF',
			};
		}

		return {
			borderWidth: 2,
			borderColor: colors.tint,
		};
	};

	const widthClass = fullWidth ? 'w-full' : '';
	const buttonClassName = [
		sizeClasses[size],
		getVariantClasses(),
		widthClass,
		'rounded-lg items-center justify-center flex-row min-h-[44px]',
		isDisabled ? 'opacity-50' : '',
	]
		.filter(Boolean)
		.join(' ');

	const textClassName = [
		textSizeClasses[size],
		getTextColorClasses(),
		'font-semibold',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<Pressable
			onPress={isDisabled ? undefined : onPress}
			disabled={isDisabled}
			className={buttonClassName}
			style={[getBorderStyle(), containerStyle]}
			{...pressableProps}
			{...({} as any)}
		>
			{loading ? (
				<ActivityIndicator
					size="small"
					color={isDisabled ? (colorScheme === 'dark' ? '#9CA3AF' : '#6B7280') : colors.tint}
					className="mr-2"
					{...({} as any)}
				/>
			) : null}
			<Text
				className={textClassName}
				style={[
					{
						color: isDisabled
							? colorScheme === 'dark'
								? '#9CA3AF'
								: '#6B7280'
							: colors.tint,
					},
					textStyle,
				]}
				{...({} as any)}
			>
				{title}
			</Text>
		</Pressable>
	);
}

