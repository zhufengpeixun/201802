import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import action from '../../store/action/index';

class CourseItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {id, name, pic, dec, price, check} = this.props.item;
        return <li>
            {this.props.input ?
                <input type="checkbox" checked={check} onChange={this.props.handleSelect.bind(this, id)}/> : ''}

            <Link to={`/course/info?courseId=${id}`}>
                <h3>{name}</h3>
                <div className='content'>
                    <div className='pic'><img src={pic} alt={name}/></div>
                    <div className='desc'>
                        <p>{dec}</p>
                        <p>价格:{price}</p>
                    </div>
                </div>
            </Link>
        </li>;
    }
}

export default connect(state => state.course, action.course)(CourseItem);