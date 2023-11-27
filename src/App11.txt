import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAutosuggest = ({ selectedOption, onUserSelection }) => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e, { newValue }) => {
    onUserSelection(newValue);
  };

  const handleUserSelection = (event, { suggestion }) => {
    onUserSelection(`${suggestion.lastName} - ${suggestion.name}`, suggestion.id);
  };

  const getSuggestions = async (value) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`https://tasks22.onrender.com/api/v1/users?q=${value}`);
      setUserSuggestions(response.data.users);
    } catch (error) {
      console.error('Error fetching user suggestions:', error);
    }

    setIsLoading(false);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setUserSuggestions([]);
  };

  return (
    <Autosuggest
      suggestions={userSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={(suggestion) => `${suggestion.username} - ${suggestion.name}`}
      renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
      inputProps={{
        value: selectedOption,
        onChange: handleChange,
      }}
      onSuggestionSelected={handleUserSelection}
    />
  );
};

const InputField = ({ label, value, onChange }) => (
  <label>
    {label}:
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
  </label>
);

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

  return (
    <div>
      <h2>Orders Form</h2>
      <InputField label="Addressee ID" value={addresseeId} onChange={setAddresseeId} />
      <InputField label="Carrier ID" value={carrierId} onChange={setCarrierId} />
      {/* Otros campos del formulario */}
      <UserAutosuggest selectedOption={userId} onUserSelection={(value, id) => { setUserId(id); }} />
      <InputField label="Received By ID" value={receivedById} onChange={setReceivedById} />
      <InputField label="Car Registration" value={carRegistration} onChange={setCarRegistration} />
      <InputField label="Zone" value={zone} onChange={setZone} />
      <InputField label="Material" value={material} onChange={setMaterial} />
      <InputField label="Quantity" value={quantity} onChange={setQuantity} />
      <InputField label="Owner" value={owner} onChange={setOwner} />
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default OrdersForm;