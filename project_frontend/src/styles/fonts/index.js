import { createGlobalStyle } from 'styled-components';
import NanumSquare_acR from './NanumSquare_acR.ttf';
import NanumSquareNeo_Variable from './NanumSquareNeo_Variable.woff';

export default createGlobalStyle`
    @font-face {
        font-family: "NanumSquare_acR";
        src: url(${NanumSquare_acR}) format('truetype');
    }
    @font-face {
        font-family: "NanumSquareNeo";
        src: url(${NanumSquareNeo_Variable}) format('woff');
    }
`;
