import React from 'react';
import './notFound.less';
import Nav from '../Nav/Nav';
import a from '../../common/img/mitu.jpg';

export default class NotFound extends React.Component {
    render() {
        return <div>
            <Nav/>
            <div className="content_b">
                <div className="not-found">
                    <div className="inner-found">
                        <p>哎呀，找不到数据了诶~~</p>
                        <img src={a} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    }
}