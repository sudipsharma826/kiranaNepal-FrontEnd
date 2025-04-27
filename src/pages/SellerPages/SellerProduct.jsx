import React from 'react'
import { useAppContext } from '../../context/AppContext';

const SellerProduct = () => {
  const { products, currency } = useAppContext();

  return (
    <div className="flex-1 flex flex-col px-4 md:px-10 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-4 px-6 text-left">Product</th>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left hidden md:table-cell">Price</th>
              <th className="py-4 px-6 text-left">In Stock</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 flex items-center gap-4">
                  <div className="w-14 h-14 overflow-hidden rounded-md border border-gray-300 bg-gray-50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="truncate max-w-[150px] md:max-w-none">{product.name}</div>
                </td>
                <td className="py-4 px-6 truncate">{product.category}</td>
                <td className="py-4 px-6 hidden md:table-cell">{currency}{product.price}</td>
                <td className="py-4 px-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={product.stock >0} 
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProduct;
