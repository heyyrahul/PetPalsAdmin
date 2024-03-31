import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {UsePagination} from '../../hooks/UsePagination';
import {RiDeleteBinLine} from 'react-icons/ri';
import {BiShow} from 'react-icons/bi';

const ProductTable = () => {
    const [products,
        setProducts] = useState([])
    const fetchData = () => {
        axios
            .get("/product.json")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
 

    const [currentItems,
        setCurrentItems] = useState([])
    const [pageCount,
        setPageCount] = useState(0)
    const [itemsOffset,
        setItemsOffset] = useState(0)
    const itemsPerPage = 5

    const toggle = (index) => {
        setProducts((prevState) =>
          prevState.map((product, i) => {
            if (i === index) {
              return { ...product, isOn: !product.isOn };
            } else {
              return product;
            }
          })
        );
      };

    return (
        <div>
            <div
                className='bg-white border-[1px] border-gray-200/80 rounded-[10px] shadow-custom'>
                <div className="overflow-x-auto">
                    <div className="align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Sale Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Published
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentItems.map((product, index) => <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                                            <img className='w-8 h-8 rounded-full hidden md:block' src={product.picture} alt="" />
                                            <span>{product.name}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
                                            {product.sale_price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize font-semibold">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                            {product.selling && <span className='bg-success-100 text-success-500 text-[14px] px-[6px] py-[1px] rounded-full'>selling</span>}
                                            {!product.selling && <span className='bg-accent-100 text-accent-500 text-[14px] px-[6px] py-[1px] rounded-full'>Pending</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                        <button
                                        className={`relative inline-flex items-center h-4 rounded-full w-8 focus:outline-none ${
                                            product.isOn ? "bg-success-500" : "bg-gray-200"
                                        }`}
                                        onClick={() => toggle(index)}
                                        >
                                        <span
                                            className={`inline-block w-4 h-4 transform transition ${
                                            product.isOn ? "translate-x-5" : "translate-x-0"
                                            } bg-white rounded-full`}
                                        />
                                        </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                                        <div className="relative flex flex-col items-center group">
                                                <button className='text-gray-400 text-lg'><BiShow/></button>
                                                <div
                                                    className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                    <span
                                                        className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-success-500 shadow-lg">View</span>
                                                    <div className="w-3 h-3 -mt-2 rotate-45 bg-success-500"></div>
                                                </div>
                                            </div>
                                            <div className="relative flex flex-col items-center group">
                                            <button className='text-gray-400 text-lg'><RiDeleteBinLine/></button>
                                                <div
                                                    className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                                                    <span
                                                        className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-error-500 shadow-lg">Delete</span>
                                                    <div className="w-3 h-3 -mt-2 rotate-45 bg-error-500"></div>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>)
}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div
                    className='text-gray-900 flex flex-col md:flex-row gap-6 justify-between items-center w-full pl-[15px] pr-[30px] py-6 text-sm'>
                    <p className='uppercase font-semibold'>showing ({itemsOffset + 1}
                        - {itemsOffset + currentItems.length}) of {products.length}</p>
                    <UsePagination
                        pageCount={pageCount}
                        setPageCount={setPageCount}
                        itemsOffset={itemsOffset}
                        setItemsOffset={setItemsOffset}
                        setCurrentItems={setCurrentItems}
                        itemsPerPage={itemsPerPage}
                        items={products}/>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;