"use client";

import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { cn } from "@utils/cn";
import { forwardRef, useState } from "react";
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

		function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
			if (onChange) {
				onChange(e);
			}
		}

		function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
			if (onFocus) {
				onFocus(e);
			}
		}

		function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
			if (onBlur) {
				onBlur(e);
			}
		}

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
			</div>
		);
	},
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
