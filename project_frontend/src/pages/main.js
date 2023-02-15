import React, { Fragment } from 'react';
import { Link } from "react-router-dom"

function Home(){
    return (<Fragment>
        <div>메인 페이지_#22 test</div>
        <div><Link to="login">로그인</Link></div>
        </Fragment>
    )
}
export default Home;