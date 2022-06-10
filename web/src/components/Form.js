import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import {
  ErrorMessage,
} from "../styles/ComponentStyles";

export default function Form() {
  const [error, setError] = useState(false);
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function HandleSubmit(e) {

    const budgetItem = {
      description: state.description, //string
      amount: state.amount*100, //number
      spent_at: new Date().toISOString(), //date
      currency: state.currency //string
    }
    if (budgetItem.amount !== 0 && budgetItem.description !== '') {
      setError(false);
      fetch(`http://localhost:5000/spendings`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(budgetItem)
      })
        .then(async (res) => {
          const body = await res.json();
          return {
            status: res.status,
            body,
          };
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError(true);
      e.preventDefault();
    }

  }

  return (
    <>
      <FormStyles
        onSubmit={HandleSubmit}
      >
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles
          type='submit'
          value='Save'
        />
      </FormStyles>
      {error && (
        <ErrorMessage>
          You need to fill out the descriprion and the amount!
        </ErrorMessage>
      )}
    </>
  );
}
