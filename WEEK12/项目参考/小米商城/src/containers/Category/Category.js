import React, {Component} from 'react';
import Nav from "../../components/Nav/Nav";
import './category.less';
import {getSortList, getCategoryList} from "../../api/sort";
import CategoryGroup from "./CategoryGroup/CategoryGroup";

export default class Category extends Component {
    static defaultProps = {
        childrenOffsetTop: []
    };

    constructor() {
        super();
        this.state = {
            index: 0,
            sortList: [],
            cateList: []
        }
    }

    computedIndex = (wrap) => {
        let {scrollTop, scrollHeight, offsetHeight} = wrap;
        //根据scrollTop的值计算this.state.index;
        let tops = this.props.childrenOffsetTop;
        let maxScrollTop = scrollHeight - offsetHeight;
        let findTop = scrollTop;
        let findIndex = 0;
        if (scrollTop === maxScrollTop) {
            findIndex = tops.length - 1;
        } else if (scrollTop === 0) {
            findIndex = 0
        } else {
            for (let top of tops) {
                if (top >= scrollTop) {
                    findTop = top;
                    break;
                }
            }
            findIndex = tops.indexOf(findTop) - 1;
        }
        this.setState({index: findIndex});
    };

    touchStartHandler = (e) => {
        e.currentTarget.addEventListener('touchend', this.touchEndHandler);
    };

    touchEndHandler = (e) => {
        let wrap = e.currentTarget;
        this.computedIndex(wrap);
    };

    async componentDidMount() {
        this.wrap.addEventListener('touchstart', this.touchStartHandler);
        let sortList = await getSortList();
        let cateList = await getCategoryList();
        this.setState({
            sortList,
            cateList
        });
    }

    getChildOffsetTop = (top) => {
        this.props.childrenOffsetTop.push(top);
    };

    focusToCategoryGroup = () => {
        let tops = this.props.childrenOffsetTop;
        let index = Math.min(this.state.index, tops.length - 1);
        this.wrap.scrollTop = tops[index];
    };

    menuClickHandler = (e) => {
        let {index} = e.currentTarget.dataset;
        this.setState({index}, this.focusToCategoryGroup);
    };

    render() {
        let {cateList} = this.state;
        let {sortList} = this.state;
        return (
            <div>
                <Nav>分类</Nav>
                <div className="content_m">
                    <div className="nav-list">
                        <ul>
                            {sortList.map((item, index) => (
                                <li key={index}
                                    data-index={index}
                                    onClick={this.menuClickHandler}
                                    className={this.state.index == index ? 'active' : ''}>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="list-wrap"
                         ref={x => this.wrap = x}>
                        {
                            cateList.map((item, index) => {
                                return <CategoryGroup
                                    category={item}
                                    key={index}
                                    getTop={this.getChildOffsetTop}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}