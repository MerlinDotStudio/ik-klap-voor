import React from "react";
import { css } from "@emotion/core";

export default function CloseIcon() {
	const style = css`
		width: 0.675rem;
    	height: 0.675rem;
    	position: absolute;
    	left: calc(2.75rem / 2);
    	top: calc(2.75rem / 2);
    	transform: translate(-50%, -50%);
	`

	return (
		<svg css={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
			<path
				fill="#383C3F"
				stroke="#383C3F"
				strokeWidth="0.5"
				d="M6.06 5l2.97 2.97a.75.75 0 11-1.06 1.06L5 6.06 2.03 9.03A.75.75 0 01.97 7.97L3.94 5 .97 2.03A.75.75 0 012.03.97L5 3.94 7.97.97a.75.75 0 111.06 1.06L6.06 5z"
			></path>
		</svg>
	);
}
