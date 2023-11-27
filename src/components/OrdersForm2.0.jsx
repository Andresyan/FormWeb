import React, { useState } from 'react';
import axios from 'axios';

const AutocompleteInput = ({ label, onUserSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const fetchUserSuggestions = async (value) => {
    try {
      const response = await fetch(`https://tasks22.onrender.com/api/v1/users?name_and_lastName_like=${value}`);
      const responseData = await response.json();

      const usersData = responseData.data?.users || [];
      console.log(usersData);
      return usersData;
    } catch (error) {
      console.error('Error fetching user suggestions:', error);
      return [];
    }
  };

  const handleInputChange = async (value) => {
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    const suggestions = await fetchUserSuggestions(value);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (user) => {
    setInputValue(`${user.name} ${user.lastName}`);
    setSelectedUser(user);
    setSuggestions([]);
    onUserSelect(user.id);
  };

  return (
    <div>
      <label>{label}:</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <ul>
        {suggestions.map((user, index) => (
          <li key={index} onClick={() => handleSuggestionClick(user)}>
            {user.name} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserForm = () => {
  const [formValues, setFormValues] = useState({
    addresseeId: '',
    carrierId: '',
    approvedById: '',
    userId: '',
    receivedById: '',
    owner: '',
    quantity: 0,
    carRegistration: 0,
    zone: '',
    material: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleUserSelect = (field, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const validateForm = () => {
    // Validar que todos los campos contengan valores de usuarios válidos
    return (
      formValues.addresseeId !== '' &&
      formValues.carrierId !== '' &&
      formValues.approvedById !== '' &&
      formValues.userId !== '' &&
      formValues.receivedById !== '' &&
      formValues.owner !== '' &&
      formValues.quantity > 0 &&
      formValues.carRegistration > 0 &&
      formValues.zone !== '' &&
      formValues.material !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario antes de enviar
    const isFormValid = validateForm();

    // Actualizar el estado formSubmitted para mostrar el mensaje de error solo después de enviar el formulario
    setFormSubmitted(true);

    if (isFormValid) {
      // Aquí puedes enviar el formulario con el ID del usuario (formValues.userId)
      axios
      .post("https://tasks22.onrender.com/api/v1/orders/", formValues)
      .then(() => {
          //Colocar el reset y get orders para el orderList
      })
      .catch((error) => console.log(error.response));
      
      console.log('Enviando formulario:', formValues);
      setIsValid(true);
    } else {
      // Mostrar un mensaje de error o realizar alguna acción en caso de formulario inválido
      setIsValid(false);
    }
  };

  return (
    <div>
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <AutocompleteInput label="Addresse" onUserSelect={(value) => handleUserSelect('addresseeId', value)} />
        <AutocompleteInput label="Carrier" onUserSelect={(value) => handleUserSelect('carrierId', value)} />
        <AutocompleteInput label="ApprovedBy" onUserSelect={(value) => handleUserSelect('approvedById', value)} />
        <AutocompleteInput label="Main user" onUserSelect={(value) => handleUserSelect('userId', value)} />
        <AutocompleteInput label="ReceivedBy" onUserSelect={(value) => handleUserSelect('receivedById', value)} />

        {/* Campos adicionales */}
        <label>Owner:</label>
        <input
          type="text"
          value={formValues.owner}
          onChange={(e) => handleUserSelect('owner', e.target.value)}
        />

        <label>Quantity:</label>
        <input
          type="number"
          value={formValues.quantity}
          onChange={(e) => handleUserSelect('quantity', parseInt(e.target.value, 10))}
        />

        <label>Car Registration:</label>
        <input
          type="text"
          value={formValues.carRegistration}
          onChange={(e) => handleUserSelect('carRegistration', parseInt(e.target.value, 10))}
        />

        <label>Zone:</label>
        <input
          type="text"
          value={formValues.zone}
          onChange={(e) => handleUserSelect('zone', e.target.value)}
        />

        <label>Material:</label>
        <input
          type="text"
          value={formValues.material}
          onChange={(e) => handleUserSelect('material', e.target.value)}
        />

        <button type="submit">Enviar</button>
      </form>

      {formSubmitted && !isValid && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          Por favor, selecciona usuarios válidos para todos los campos.
        </div>
      )}
    </div>
  );
};

export default UserForm;
