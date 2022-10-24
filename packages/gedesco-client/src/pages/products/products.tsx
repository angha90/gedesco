import React, { useEffect, useState } from 'react';
import CardComponent from '../../components/Card/Card';
import { getProducts, getProductsByCategory, getProductsCategories } from '../../services/productsServices';
import ProductsHeader from './ProductsHeader/ProductsHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getComparator, Product, SortOrder, stableSort } from './products-utils';



type ProductsData = {
    title: string;
    products: Product[];
    categories: string[];
    filterByCategory: string;
    sort: Sort;
    loading: boolean;
};

type Sort = {
    order: SortOrder;
    orderBy: string;
};

const Products = () => {
    const [data, setData] = useState<ProductsData>({
        title: 'all prodcuts',
        products: [],
        categories: [],
        filterByCategory: '',
        loading: true,
        sort: { order: 'asc', orderBy: 'price'}
    });
   
    const filterProductByCategory = (category: string) => {
        setData({...data, loading: true});
        (category 
        ? getProductsByCategory(category)
        : getProducts())
        .then((products) => {
            const sortedProducts = stableSort(products, getComparator(data.sort.order, data.sort.orderBy))
            setData({...data, products: sortedProducts, loading: false})
        });
    }

    const orderBy = (orderBy: string, order: SortOrder) => {
        const products = stableSort(data.products, getComparator(order, orderBy));
        setData({...data, products, sort: { order, orderBy }});
    };



    useEffect(() => {
        Promise.all([
            getProducts(),
            getProductsCategories()
        ]).then((response) => {
            const  [products, categories] = response
            const sortedProducts = stableSort(products, getComparator(data.sort.order, data.sort.orderBy))
            setData({ 
                ...data, 
                products: sortedProducts, 
                categories, 
                loading: false
            });
        })
    }, []);


    const spinner = (
        <div className='center-content'>
            <CircularProgress />
        </div>
    );

    const content = (
        <div>
            <div className='products-list'>
                {data.products.map((row, key) => (
                    <CardComponent
                    key={key}
                    title={row.title}
                    imageUrl={row.image}
                    price={`${row.price}$`}
                    />
                ))}
        </div>
        </div>
    );
    
   
    return (
        <div className='products-container'>
             <ProductsHeader
                title={data.title}
                categories={data.categories}
                onFilter={filterProductByCategory}
                onOrder={orderBy}
            />
            {data.loading ? spinner: content}
        </div>
    );
}

export default Products;