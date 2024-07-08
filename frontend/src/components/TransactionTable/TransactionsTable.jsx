import React, { useState } from 'react';
import "./TransactionsTable.css"

const TransactionsTable = ({ transactions }) => {

  
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase() ||
    transaction.description.toLowerCase() ||
    transaction.price.toString()
  );

  // .includes(search.toLowerCase())   .includes(search.toLowerCase())   .includes(search)

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Category</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default TransactionsTable;
