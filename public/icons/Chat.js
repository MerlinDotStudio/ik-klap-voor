import React from "react";
import { css } from "@emotion/core";

function ChatIcon(props) {
	const { color, width, height } = props;
	const style = css`
		width: ${width ? width : '1.25rem'};
		height: ${height ? height : '1.25rem'};
`

	return (
		<svg css={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
			<path
				fill={color ? color : "#FF7919"}
				fillRule="evenodd"
				d="M20 13.33a2.22 2.22 0 01-2.22 2.23H4.44L0 20V2.22C0 1 1 0 2.22 0h15.56C19 0 20 1 20 2.22v11.11z"
			></path>
		</svg>
	);
}

export default ChatIcon;
