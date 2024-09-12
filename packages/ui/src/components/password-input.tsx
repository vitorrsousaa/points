"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";
import { forwardRef, useCallback, useMemo, useState } from "react";
import { FormDescription, RenderIf } from ".";
import { Button } from "./Button";
import { Input, type InputProps } from "./input";

const PasswordInput = forwardRef<
	HTMLInputElement,
	InputProps & {
		description?: string;
		showValidation?: boolean;
	}
>(
	(
		{
			className,
			value,
			onChange,
			onBlur,
			onFocus,
			showValidation = false,
			...props
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [showErrors, setShowErrors] = useState(false);

		const onValidatePassword = useCallback((password = "") => {
			return {
				minLength: password.length >= 6,
				hasLetter: /[a-zA-Z]/.test(password),
				hasNumber: /[0-9]/.test(password),
				hasSpecialChar: /[^a-zA-Z0-9]/.test(password),
			};
		}, []);

		const passwordValidation = useMemo(
			() => onValidatePassword(value as string),
			[value, onValidatePassword],
		);

		function handleToggleErrorsVisibility() {
			setShowErrors((prevState) => !prevState);
		}

		function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
			if (onChange) {
				onChange(e);
			}
		}

		function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
			if (onFocus) {
				onFocus(e);
			}

			handleToggleErrorsVisibility();
		}

		function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
			if (onBlur) {
				onBlur(e);
			}

			handleToggleErrorsVisibility();
		}

		const validationCriteria = [
			{
				valid: passwordValidation.minLength,
				title: "Tamanho mínimo",
				message: "Mínimo 6 caracteres.",
			},
			{
				valid: passwordValidation.hasLetter,
				title: "Letras",
				message: "Conter pelo menos uma letra.",
			},
			{
				valid: passwordValidation.hasNumber,
				title: "Números",
				message: "Conter pelo menos um número.",
			},
			{
				valid: passwordValidation.hasSpecialChar,
				title: "Caracteres especiais",
				message: "Conter ao menos um caractere especial.",
			},
		];

		const disabled = value === "" || value === undefined || props.disabled;

		return (
			<div>
				<div className="relative">
					<Input
						type={showPassword ? "text" : "password"}
						className={cn("hide-password-toggle pr-10", className)}
						ref={ref}
						value={value}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						{...props}
					/>

					<Button
						type="button"
						variant="ghost"
						size="sm"
						className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
						onClick={(e) => {
							e.stopPropagation();
							e.preventDefault();

							setShowPassword((prev) => !prev);
						}}
						disabled={disabled}
					>
						{showPassword && !disabled ? (
							<EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
						) : (
							<EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
						)}
						<span className="sr-only">
							{showPassword ? "Hide password" : "Show password"}
						</span>
					</Button>

					{/* hides browsers password toggles */}
					<style>{`
            .hide-password-toggle::-ms-reveal,
            .hide-password-toggle::-ms-clear {
              visibility: hidden;
              pointer-events: none;
              display: none;
            }
          `}</style>
				</div>

				<RenderIf
					condition={!!props.description}
					render={
						<FormDescription className="mt-2">
							{props.description}
						</FormDescription>
					}
				/>

				<RenderIf
					condition={showValidation && showErrors}
					render={
						<ul className="text-sm mt-4">
							{validationCriteria.map((criterion) => (
								<li
									key={Math.random().toString()}
									className={`text-sm ${criterion.valid ? "text-green-600" : "text-red-600"}`}
								>
									<strong>{`${criterion.title}: `}</strong>
									{criterion.message}
								</li>
							))}
						</ul>
					}
				/>
			</div>
		);
	},
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
