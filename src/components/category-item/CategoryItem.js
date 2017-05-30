import React, {PureComponent} from 'react';
import './CategoryItem.css';
import {CategoryList} from "../category-list";

export class CategoryItem extends PureComponent {
    changeCategory = (e) => {
        e.stopPropagation();
        this.props.onChangeCategory(this.props.categoryId);
    };

    toggleCategory = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onToggleCategory(this.props.categoryId);
    };

    deleteCategory = () => {
        const {categoryId, selectedCategory, onChangeCategory, onDeleteCategory, onCloseModal} = this.props;
        if (categoryId === selectedCategory ) {
            onChangeCategory(null);
        }
        onDeleteCategory(categoryId);
        onCloseModal();
    };

    addSubcategory = (value) => {
        this.props.onAddSubcategory({parent: this.props.categoryId, value: value});
        this.props.onCloseModal();
    };

    editCategory = (title) => {
        this.props.onEditCategory({id: this.props.categoryId, title: title});
        this.props.onCloseModal();
    };

    openDeleteCategoryModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onOpenModal({successCb: this.deleteCategory, type:'confirm', title: 'Delete category', text: 'Do you want to delete this category?', open: true});
    };

    openAddSubcategoryModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onOpenModal({successCb: this.addSubcategory, type:'enter', title: 'Enter subcategory title', open: true});
    };

    openEditCategoryModal = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onOpenModal({successCb: this.editCategory, type:'enter', title: 'Enter new title', open: true});
    };

    render() {
        const {
            item :{ title, subCategories, opened },
            onChangeCategory,
            onToggleCategory,
            categoriesById,
            onDeleteCategory,
            onAddSubcategory,
            onOpenModal,
            onCloseModal,
            selectedCategory,
            categoryId,
            onEditCategory
        } = this.props;

        return (
        <li className={selectedCategory === categoryId ? "category-item list-group-item active" : "category-item list-group-item"}
            onClick={this.changeCategory}>
            <h4 className="category-item__title">
                {!!subCategories.length && <a href=""
                   className={opened ? "category-item__btn-collapse btn opened" : "category-item__btn-collapse btn"}
                   onClick={this.toggleCategory}>
                    <span className={opened ? "glyphicon glyphicon-chevron-up" : "glyphicon glyphicon-chevron-down"}></span>
                </a>}

                {title}

                <a href=""
                   className="category-item__btn-edit btn"
                   onClick={this.openEditCategoryModal}>
                    <span className="glyphicon glyphicon-edit"></span>
                </a>
            </h4>
            <div className="category-item__action-buttons">
                <a href="" className="category-item__btn-delete btn"
                   onClick={this.openDeleteCategoryModal}><span className="glyphicon glyphicon-trash"></span></a>
                <a href="" className="category-item__btn-add btn"
                   onClick={this.openAddSubcategoryModal}><span className="glyphicon glyphicon-plus-sign "></span></a>
            </div>
            {opened && !!subCategories.length && <CategoryList items={subCategories}
                                                               categoriesById={categoriesById}
                                                               onChangeCategory={onChangeCategory}
                                                               onToggleCategory={onToggleCategory}
                                                               onDeleteCategory={onDeleteCategory}
                                                               onAddSubcategory={onAddSubcategory}
                                                               onOpenModal={onOpenModal}
                                                               onCloseModal={onCloseModal}
                                                               selectedCategory={selectedCategory}
                                                               onEditCategory={onEditCategory}/>}
        </li>
        );
    }
}

