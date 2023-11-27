import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrdersForm = ({
    getOrders,
    orderSelected,
    deselectOrder
}) => {
const [options, setOptions] = useState([]);
const [selectedOption, setSelectedOption] = useState('');
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


const clear = () => {
        reset();
        deselectOrder();
}

useEffect(() => {
    if(orderSelected !== null) {
      setApprovedById(orderSelected.AprrovedById);
      setCarrierId(orderSelected.carrierId);
      setAddresseeId(orderSelected.addresseeId);
      setUserId(orderSelected.userId);
      setReceivedById(orderSelected.receivedById);
      setMaterial(orderSelected.material);
      setCarRegistration(orderSelected.carRegistration);
      setOwner(orderSelected.owner);
      setQuantity(orderSelected.quantity);
      setZone(orderSelected.zone);
    }  
  }, [orderSelected]);

const submit = (e) => {
    e.preventDefault();
  const order = {
      addresseeId,
      carrierId,
      approvedById,
      receivedById,
      userId,
      carRegistration,
      zone,
      material,
      quantity,
      owner
    };
  if (orderSelected !== null) {
    axios
    .patch(`https://tasks22.onrender.com/api/v1/orders/${orderSelected.id}/`, order)
    .then(() => {
        getOrders();
        reset();
        deselectOrder();
    });
  } else {
    axios
    .post("https://tasks22.onrender.com/api/v1/orders/", order)
    .then(() => {
        getOrders();
        reset();
    })
    .catch((error) => console.log(error.response));
  }
};
  const reset = () => {
    setAddresseeId("");
    setCarrierId("");
    setApprovedById("");
    setUserId("");  
    setReceivedById("");
    setCarRegistration("");
    setZone("");
    setMaterial("");
    setQuantity("");
    setOwner("");     
};
const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
};
return (
        <form onSubmit={submit}>
          <h1>New Order</h1>
            <div className='names-content'>
            <i className="fa-solid fa-user"></i>
            <div className="name-container">
                <label htmlFor="addresseeId"></label>
                <input
                    type="text"
                    id="name" placeholder='FirstName'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </div>
            </div>
              
              //Aplicar input autocompletado desplegable
            <div>
              <select id="dropdown" value={selectedOption} onChange={handleSelectChange}>
              <option value="" disabled>Selecciona...</option>
              {options.map((user) => (
              <option key={user.id} value={user.id}>
             {user.name}
              </option>
        ))}
      </select>

      {selectedOption && (
        <p>Has seleccionado el usuario con ID: {selectedOption}</p>
      )}
    </div>
            <div className='button-content'>
            <button>{userSelected !== null ? "Update" : "Create"}</button>
            <button onClick={clear} type="button"> Clear</button>
            </div>
        </form>
    );
  };

export default OrdersForm;
