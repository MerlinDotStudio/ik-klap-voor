import React from "react";
import { css } from "@emotion/core";

function FacebookIcon(props) {
	const { color, width, height, styles } = props;
	const style = css`
		width: ${width ? width : '1.75rem'};
		height: ${height ? height : '1.75rem'};
		position: absolute;
		top: 50%;
		left: 1.5rem;
		transform: translateY(-50%);
`

	return (
		<svg css={[style, styles ? styles : null]} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
			<path fill={color ? color : '#FFF'} d="M32.58 24.27a.83.83 0 01-.83.73h-3.42a.83.83 0 00-.83.83v13.34c0 .46.37.83.83.83h10c.92 0 1.67-.75 1.67-1.67V1.67C40 .75 39.25 0 38.33 0H1.67C.75 0 0 .75 0 1.67v36.66C0 39.25.75 40 1.67 40H20c.46 0 .83-.37.83-.83V25.83A.83.83 0 0020 25h-3.33a.83.83 0 01-.84-.83v-5c0-.46.38-.84.84-.84H20c.46 0 .83-.37.83-.83v-2.18a9.48 9.48 0 019.49-9.49h2.18c.46 0 .83.38.83.84v5c0 .46-.37.83-.83.83h-2.18a2.82 2.82 0 00-2.82 2.82v2.18c0 .46.37.83.83.83h4.05a.83.83 0 01.84.94l-.64 5z"></path>
		</svg>
	);
}

export default FacebookIcon;
