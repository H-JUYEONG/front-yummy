import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/vender/createPage.css"

const CreatePage = () => {
    return (
        <>
            <div id="createPage-wrap">
                <div>
                    <ul id="createPage-nav">
                        <li>나만의 사이트를 꾸며보세요!</li>
                        <li><Link to="#">미리보기</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CreatePage;