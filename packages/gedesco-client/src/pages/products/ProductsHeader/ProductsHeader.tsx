import React, { useState } from 'react';
import { SortOrder } from '../products-utils';
import OrderByComponent from './OrderBy/OrderBy';

type ProductsHeaderProps = {
    title: string;
    categories: string[];
    onFilter: (category: string) => void;
    onOrder: (orderBy: string, Order: SortOrder) => void;
};

const ProductsHeader = (props: ProductsHeaderProps) => {
    const { title, categories, onFilter, onOrder } = props;
    const [active, setActive] = useState('');

    const handleFilter = (category: string) => {
        setActive(category);
        onFilter(category);
    }

    return (
        <div className='products-header'>
            <div className='products-header-title'>
                <span onClick={() => handleFilter('')}>{title}</span>
            </div>
            <div className='products-header-categories'>
                {categories.map((category, key) => {
                    return <>
                        <span
                            className={`product-header-catergory${active === category ? '-active' : ''}`}
                            key={key} 
                            onClick={() => handleFilter(category)}>
                            {category}
                        </span>
                    </>
                })}
            </div>
            <div className='products-header-order'>
                <OrderByComponent onOrder={onOrder}/>
            </div>

        </div>
    )
}

export default ProductsHeader;

