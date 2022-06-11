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
    setSortType(sortType);
    const sortArray = type => {
      const types = {
        '-date': 'spent_at',
        'date': 'spent_at',
        '-amount_in_huf': 'amount',
        'amount_in_huf': 'amount',
      };

      const sortProperty = types[type];
      function sortByAmCur(a, b, sortAsc = true) {
        let val1 = a[sortProperty];
        let val2 = b[sortProperty];

        if(a.currency=== 'USD' && a[sortProperty]===a.amount){
          val1 *= 378;
        } else if (b.currency=== 'USD' && b[sortProperty]===b.amount){
          val2 *= 378;
        }
        let result = ((val1 < val2) ? -1 : ((val1 > val2) ? 1 : 0));
        if (!sortAsc) {
          result *= -1;
        }
        return result;
      }
      const sorted = [...spendings].sort((a, b) => {
        let result = [];
        if (type === '-date' || type === '-amount_in_huf') {
          result = sortByAmCur(a, b, false);
        } else if (type === 'date' || type === 'amount_in_huf') {
          result = sortByAmCur(a, b, true);
        }
        return result;
      });
      setFilteredList(sorted);
    };
    sortArray(sortType);
  }, [sortType, spendings, setFilteredList]);


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
