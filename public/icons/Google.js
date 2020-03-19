import React from "react";
import { css } from "@emotion/core";

function GoogleIcon(props) {
	const { width, height, styles } = props;
	const style = css`
		width: ${width ? width : '1.75rem'};
		height: ${height ? height : '1.75rem'};
		position: absolute;
		top: 50%;
		left: 1.5rem;
		transform: translateY(-50%);
`

	return (
		<svg
			css={[style, styles ? styles : null]}
			xmlns="http://www.w3.org/2000/svg"
			x="0"
			y="0"
			version="1.1"
			viewBox="0 0 533.5 544.3"
			xmlSpace="preserve"
		>
			<path
				fill="#4285f4"
				d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
			></path>
			<path
				fill="#34a853"
				d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1a272.19 272.19 0 00243.2 149.9z"
			></path>
			<path
				fill="#fbbc04"
				d="M119.3 324.3a163.01 163.01 0 010-104.2V150H28.9a272.38 272.38 0 000 244.4l90.4-70.1z"
			></path>
			<path
				fill="#ea4335"
				d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7A261.56 261.56 0 00272.1 0C169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
			></path>
		</svg>

	);
}

export default GoogleIcon;
