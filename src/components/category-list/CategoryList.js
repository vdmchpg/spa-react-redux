import React, {PureComponent} from 'react';
import './CategoryList.css';
import {CategoryItem} from '../category-item'

export class CategoryList extends PureComponent {
    render() {
        const { items,
            categoriesById,
            onChangeCategory,
            onToggleCategory,
            onDeleteCategory,
            onAddSubcategory,
            onOpenModal,
            onCloseModal,
            selectedCategory,
            onEditCategory
        } = this.props;

        return (
            <ul className="category-list list-group">
                {items.map((item) => {
                    return <CategoryItem key={item}
                                         categoryId={item}
                                         item={categoriesById[item]}
                                         onChangeCategory={onChangeCategory}
                                         onToggleCategory={onToggleCategory}
                                         categoriesById={categoriesById}
                                         onDeleteCategory={onDeleteCategory}
                                         onAddSubcategory={onAddSubcategory}
                                         onOpenModal={onOpenModal}
                                         onCloseModal={onCloseModal}
                                         selectedCategory={selectedCategory}
                                         onEditCategory={onEditCategory}/>
                })}
            </ul>
        );
    }
}

