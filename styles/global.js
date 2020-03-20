// styles/theme.js
const theme = {
    colors: {
        grey: '#E8E8E8',
        greyType: '#383c3f',
        greyTypeLight: '#6a7177',
        greyLines: '#383c3f',
        primary: '#C30A14',
        primaryLight: 'rgba(255,121,25,0.1)',
        primaryDark: '#CD5C17',
        secondary: '#3d5ef9',
        secondaryLight: '#EBEEFE',
        white: '#ffffff',
        whiteDarken: '#ebeffe',
        black: '#000000',
        statusGreen: '#15CD9D',
        statusGreenLight: '#E7FCF6',
        statusRed: '#ff3410',
        statusRedLight: '#ffece8',
		darkBlue: '#13547A',
		lightBlue: '#80D0C7'
    },
};

const mq = {
    min: {
        small: '(min-width: 21rem)',
        medium: '(min-width: 48rem)',
        large: '(min-width: 64rem)',
        xlarge: '(min-width: 80rem)',
    },
    max: {
        small: '(max-width: 21rem)',
        medium: '(max-width: 48rem)',
        large: '(max-width: 64rem)',
        xlarge: '(max-width: 80rem)',
    },
};

export { theme, mq };
