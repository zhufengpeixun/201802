import React, {Component} from 'react';
import CategoryList from "./CategoryList";

export default class CategoryGroup extends Component {
    componentDidMount() {
        let {offsetTop} = this.el;
        this.props.getTop(offsetTop);
    }

    render() {
        let {category} = this.props;
        return (
            <div ref={x => this.el = x}>
                {Object.keys(category).map((key, idx) => (
                    <CategoryList list={category[key]}
                                  title={key}
                                  key={idx}/>
                ))}
            </div>
        )
    }
}