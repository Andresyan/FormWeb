import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersForm = ({
    getOrders,
    orderSelected,
    deselectOrder
}) => {
const [addresseeId, setAddresseeId] = useState("");
const [carrierId, setCarrierId] = useState("");
const [approvedById, setApprovedById] = useState("");
const [userId, setUserId] = useState("");
const [receivedById, setReceivedById] = useState("");
const [carRegistration, setCarRegistration] = useState("");
const [zone, setZone] = useState("");
const [material, setMaterial] = useState("");
const [quantity, setQuantity] = useState("");
const [owner, setOwner] = useState("");

const reset = () => {
      setAddresseeId("");
      setCarriedId("");
      setApprovedById("");
      setUserId("");  
      setReceivedById("");
      setCarRegistration("");
      setZone("");
      setMaterial("");
      setQuantity("");
      setOwner("");     
};
    //setDate("");
const clear = () => {
        reset();
        deselectOrder();
}

return (
        <form onSubmit={submit}>
            <h1>New User</h1>
            <div className='names-content'>
            <i className="fa-solid fa-user"></i>
            <div className="name-container">
                <label htmlFor="name"></label>
                <input
                    type="text"
                    id="name" placeholder='FirstName'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
              
              //Aplicar input autocompletado desplegable
              
            <div className='button-content'>
            <button>{userSelected !== null ? "Update" : "Create"}</button>
            <button onClick={clear} type="button"> Clear</button>
            </div>
        </form>
    );
};

export default OrderForm;
