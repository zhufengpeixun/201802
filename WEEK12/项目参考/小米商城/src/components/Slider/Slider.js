import React from 'react';
import ReactSwipe from 'react-swipe';
import './slider.less';
import {getSlider} from "../../api/home";

export default class Slider extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            list: []
        }
    }

    async componentDidMount() {
        let {list} = this.props;
        if (!list || list.length === 0) {
            list = await getSlider(this.props.type)
        }
        this.setState({list});
    }

    render() {
        let opts = {
            // continuous: true,
            // auto: 2000,
            callback: (index) => {
                this.setState({index});
            }
        };
        return (
            <div className="pub-swiper">
                <ReactSwipe className="carousel"
                            key={this.state.list.length}
                            swipeOptions={opts}>
                    {this.state.list.map((item, index) => (
                        <div key={index}>
                            <a>
                                <img src={item}/>
                            </a>
                        </div>
                    ))}
                </ReactSwipe>
                <div className="dots">
                    {this.state.list.map((item, index) => (
                        <span className={this.state.index === index ? 'active' : ''}
                              key={index}/>
                    ))}
                </div>
            </div>
        )
    }
}