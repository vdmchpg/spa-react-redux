import React, {PureComponent} from 'react';
import { browserHistory } from 'react-router';
import {CategoryListEdit} from "../category-list-edit";

export class CategoryItemEdit extends PureComponent {
    toggleCategory = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onToggleCategory(this.props.categoryId);
    };

    moveToCategory = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const {query, pathname} = browserHistory.getCurrentLocation();
        browserHistory.replace({pathname: pathname, query: {...query, newCategory: this.props.categoryId}});
    };

    render() {
        const {
            item :{ title, subCategories, opened },
            onToggleCategory,
            categoriesById,
            categoryId
        } = this.props;
        const {category} = browserHistory.getCurrentLocation().query;

        return (
        <li className="category-item list-group-item">
            <h4 className="category-item__title">
                {!!subCategories.length && <a href=""
                   className={opened ? "category-item__btn-collapse btn opened" : "category-item__btn-collapse btn"}
                   onClick={this.toggleCategory}>
                    <span className={opened ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
                </a>}
                {title}
            </h4>
            <div className="category-item__action-buttons">
                {category !== categoryId && <a href="" className="category-item__btn-move btn"
                   onClick={this.moveToCategory}>
                    <span className="glyphicon glyphicon-share-alt "></span>
                </a>}
            </div>
            {opened && !!subCategories.length && <CategoryListEdit items={subCategories}
                                                                   categoriesById={categoriesById}
                                                                   onToggleCategory={onToggleCategory}/>}
        </li>
        );
    }
}

