import React from 'react';
import {Link} from 'react-router-dom';

export default class CourseItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {id, name, pic, dec, price} = this.props.item;
        return <li><Link to={`/course/info?courseId=${id}`}>
            <h3>{name}</h3>
            <div className='content'>
                <div className='pic'><img src={pic} alt={name}/></div>
                <div className='desc'>
                    <p>{dec}</p>
                    <p>价格:{price}</p>
                </div>
            </div>
        </Link></li>;
    }
}