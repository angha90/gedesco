import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import TableComponent, { TableRowProps } from '../../components/TableComponent/Table';
import { getProducts, ProductModel } from '../../services/productsServices';


const Products = () => {
    const [rows, setRows] = useState<TableRowProps[]>([]);
    const headCells = [
        { id: 'title', numeric: false, label: 'Title' },
        { id: 'category', numeric: false ,label: 'Category' },
        { id: 'price', numeric: true, label: 'Price (Euro)' },
    ];

    const mapRows = (products: ProductModel[]) => {
        const data = products.map(({ title, category, price }) => ({ title, category, price }));
        setRows(data);
    } 

    useEffect(() => {
        getProducts().then(mapRows)
    }, []);

    return (
        <>
            <Header title='ALL PRODUCTS' />
            <div className='products-container'>
                <div className='products-table-container'>
                    <TableComponent rows={rows} headCells={headCells} />  
                </div>
            </div>
        </>
    );
}

export default Products;