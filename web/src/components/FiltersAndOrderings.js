import React from 'react';
import { useState, useEffect } from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';


export default function CurrencyFilter({ setFilteredList, spendings }) {
  const [sortType, setSortType] = useState("-date");

  const filterByCurrency = (e, originalList) => {
    originalList = spendings;
    if (e.target.name === "USD" || e.target.name === "HUF") {
      setFilteredList(originalList.filter(item => item.currency === e.target.name));
    } else {
      setFilteredList(originalList);
    }
  }

  useEffect(() => {
    const sortArray = type => {
      const types = {
        '-date': 'date',
        'date': 'date',
        '-amount_in_huf': 'amount',
        'amount_in_huf': 'amount',
      };
      const sortProperty = types[type];
      const sorted = [...spendings].sort((a, b) => {
        if(type==='-date'){
          return b[sortProperty] - a[sortProperty] ? 1 : -1
        } else if(type==='date'){

          return a[sortProperty] - b[sortProperty] ? 1 : -1
        } else if(type==='-amount_in_huf'){

          return a[sortProperty] < b[sortProperty] ? 1 : -1
        } else if(type==='amount_in_huf'){

          return a[sortProperty] > b[sortProperty] ? 1 : -1
        }
      });
      setFilteredList(sorted);
    };

    sortArray(sortType);
  }, [sortType]);

  // setFilteredList(spendings.sort((a,b) =>  new Date(b.spent_at) - new Date(a.spent_at)));


  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
              onClick={filterByCurrency}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
              onClick={filterByCurrency}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
              onClick={filterByCurrency}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
