import React, {PureComponent} from 'react';
import {CategoryItemEdit} from '../category-item-edit';

export class CategoryListEdit extends PureComponent {
    render() {
        const { items,
            categoriesById,
            onToggleCategory,
        } = this.props;

        return (
            <ul className="category-list list-group">
                {items.map((item) => {
                    return <CategoryItemEdit key={item}
                                         categoryId={item}
                                         item={categoriesById[item]}
                                         onToggleCategory={onToggleCategory}
                                         categoriesById={categoriesById}/>
                })}
            </ul>
        );
    }
}

