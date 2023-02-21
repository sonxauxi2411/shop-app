import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import HistoryAPI from "../../api/HistoryAPI";
import convertMoney from "../../utils/convertMoney";
import {
  BsPersonPlus,
  BsCurrencyDollar,
  BsFileEarmarkDiff,
} from "react-icons/bs";

function Dashboard() {
  const [historyList, setHistoryList] = useState([]);
  const [total, setTotal] = useState("");
  const [orderUser, setOrderUser] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await HistoryAPI.getAllHistory();
      console.log(res);
      setHistoryList(res);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const res = await HistoryAPI.getTitle();
      // console.log(res);
      setOrderUser(res.userOrder);
      setOrder(res.count);
      setTotal(res.total);
    };
    fetchData();
  }, []);
  // console.log(order, orderUser, total);

  return (
    <div className="">
      <h4>Dashboad</h4>
      <div className="d-flex container w-100 gap-2">
        <div
          className="card  w-100 p-3 "
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            border: "none",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="fs-3 fw-bold">{orderUser}</span>
              <span className="text-black-50" style={{ fontSize: "12px" }}>
                Clients
              </span>
            </div>
            <div>
              <span className="fs-3 text-black-50">
                <BsPersonPlus />
              </span>
            </div>
          </div>
        </div>
        <div
          className="card  w-100 p-3 "
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            border: "none",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="fs-3 fw-bold">
                {convertMoney(total)} <span className="fs-5">VND</span>
              </span>
              <span className="text-black-50" style={{ fontSize: "12px" }}>
                Earnings Of Month
              </span>
            </div>
            <div>
              <span className="fs-3 text-black-50">
                <BsCurrencyDollar />
              </span>
            </div>
          </div>
        </div>
        <div
          className="card  w-100 p-3 "
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            border: "none",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <span className="fs-3 fw-bold">{order}</span>
              <span className="text-black-50" style={{ fontSize: "12px" }}>
                New Order
              </span>
            </div>
            <div>
              <span className="fs-3 text-black-50">
                <BsFileEarmarkDiff />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div
          className="container p-4"
          style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            border: "none",
            minHeight: "100vh",
          }}
        >
          <h5>History</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID User</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Total</th>
                <th>Delivery</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {historyList &&
                historyList.map((item) => {
                  //console.log(item);
                  return (
                    <tr key={item._id}>
                      <td>{item.user.userId}</td>
                      <td>{item.user.fullname}</td>
                      <td>{item.user.phone}</td>
                      <td>{item.user.address}</td>
                      <td>{convertMoney(item.user.total)}</td>
                      <td>Chưa Vận Chuyển</td>
                      <td>Chưa Thanh Toán</td>
                      <td>
                        <div>
                          <button className="btn btn-success">View</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
