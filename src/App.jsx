import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import OrdersList from './components/OrdersList';
import OrdersForm from './components/OrdersForm';

function App() {
    const [ordersList, setOrdersList] = useState([]);
    const [orderSelected, setOrderSelected] = useState(null);

    useEffect(()=>{
        axios
        .get("https://tasks22.onrender.com/api/v1/orders/")
        .then((res) => setOrdersList(res.data.data));
    }, []);

    const getOrders = () => {
        axios
        .get("https://tasks22.onrender.com/api/v1/orders/")
        .then((res) => setOrdersList(res.data.data));
    };

    const selectOrder = (order) => {
        setOrderSelected(order);
      };
    
    const deselectOrder = () => setOrderSelected(null);
    
    const deleteOrder = (id) => {
        axios
        .delete(`https://tasks22.onrender.com/api/v1/orders/${id}/`)
        .then(() => getOrders());
    };

    return(
        <div className="App">
            <div className="">
            <OrdersList ordersList={ordersList} selectOrder={selectOrder} deleteOrder={deleteOrder}/>
            </div>
            <div className="">
            <OrdersForm getOrders={getOrders} orderSelected={orderSelected} deselectOrder={deselectOrder}/>
            </div>
        </div>    
    )
};

export default App