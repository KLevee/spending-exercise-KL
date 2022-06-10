import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [filtering, setFiltering] = useState([]);


  return (
    <>
      <Layout>
        <Form />
        <FiltersAndOrderings
          setFilteredList={setFiltering}
          spendings={spendings}
        />
        <SpendingList
          spendings={filtering}
          setSpendings={setSpendings}
          setFiltering={setFiltering}
        />
      </Layout>
    </>
  );
}
