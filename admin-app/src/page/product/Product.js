import React, { useEffect, useState } from "react";
import ProductAPI from "../../api/ProductAPI";
import queryString from "query-string";
import Table from "react-bootstrap/Table";
import Pagination from "../../utils/Pagination";
import convertMoney from "../../utils/convertMoney";
import { useNavigate } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: "1",
    count: "8",
    search: "",
    category: "all",
  });

  const onChangeText = (e) => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log("Value: ", value);

    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await ProductAPI.getAPI();
      console.log(response);
      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(
        parseInt(response.length) / parseInt(pagination.count)
      );
      console.log(totalPage);
      setTotalPage(totalPage);
    };

    fetchAllData();
  }, [pagination]);

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      const response = await ProductAPI.getPagination(newQuery);
      const results = response;

      //console.log(response);
      setProducts(results);
      setLoading(false);

      console.log(products);
    };

    // console.log(products);
    fetchData();
  }, [pagination]);

  const handlerDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setLoading(true);
      await ProductAPI.deleteProduct(id);
      //render lại products
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);
      const newQuery = "?" + query;
      const response = await ProductAPI.getPagination(newQuery);
      const results = response;
      setProducts(results);
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Products</h4>
      <div className="mb-3 d-flex justify-content-between">
        <input
          className="form-control w-25 "
          onChange={onChangeText}
          type="text"
          placeholder="Enter Search!"
        />
        <button
          className="btn btn-primary me-3"
          onClick={(e) => navigate("/add-product")}
        >
          Add New
        </button>
      </div>

      <div className="w-100">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Count</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.results?.map((product) => {
                return (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{convertMoney(product.price)} VND</td>
                    <td>
                      <img
                        src={product.photos[0]}
                        style={{ height: "60px", width: "60px" }}
                      />
                    </td>
                    <td>{product.category}</td>
                    <td>{product.count}</td>
                    <td>
                      <div className="d-flex flex-column gap-2">
                        <button
                          className="btn btn-success mb-2"
                          onClick={(e) =>
                            navigate("/add-product", {
                              replace: true,
                              state: product,
                            })
                          }
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handlerDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Pagination
          pagination={pagination}
          handlerChangePage={handlerChangePage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
}

export default Product;
