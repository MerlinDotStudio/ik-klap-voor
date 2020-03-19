import React from "react";
import {css} from "@emotion/core";

export default function LargeArrow(props) {
	const { left, color, extraStyle } = props;

	const style = css`
        width: 2rem;
    	height: 2.2rem;
        transform: scaleX(${left && left === true ? 1 : -1});
        transform-origin: center;
    `;

	return (
		<svg css={[style, extraStyle]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" preserveAspectRatio={'none'}>
			<path fill={color ? color : '#FFF'} d="M9 24a4.6 4.6 0 011.56-3.46L32.86.92a3.7 3.7 0 014.88 5.55l-19.5 17.15a.5.5 0 000 .76l19.5 17.15a3.7 3.7 0 11-4.88 5.55l-22.3-19.62A4.62 4.62 0 019 24z"></path>
		</svg>
	);
}
