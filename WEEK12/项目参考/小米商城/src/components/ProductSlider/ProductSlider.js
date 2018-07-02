import React from 'react';
import ReactSwipe from 'react-swipe';
import './productSlider.less';

export default class ProductSlider extends React.Component {
    static defaultProps = {
        list: []
    };

    constructor() {
        super();
        this.state = {
            index: 0
        }
    }

    render() {
        let opts = {
            // continuous: true,
            // auto: 2000,
            callback: (index) => {

                this.setState({index});
            }
        };
        let list = this.props.list;

        return (
            <div className="product-swiper">
                <ReactSwipe className="carousel"
                            swipeOptions={opts} key={list.length}>
                    {list.map((item, index) => (
                        <div key={index}>
                            <a>
                                <img src={item}/>
                            </a>
                        </div>
                    ))}
                </ReactSwipe>
                <div className="dots">
                    {list.map((item, index) => (
                        <span className={this.state.index === index ? 'active' : ''}
                              key={index}/>
                    ))}
                </div>
            </div>
        )
    }
}