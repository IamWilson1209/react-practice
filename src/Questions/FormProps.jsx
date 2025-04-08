import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
    },
  },
};

function PhoneBookForm({ addEntryCallback }) {
  // const [firstName, setFirstName] = useState('Coder'); // 預填充值
  // const [lastName, setLastName] = useState('Byte'); // 預填充值
  // const [phoneNumber, setPhoneNumber] = useState('8885559999'); // 預填充值

  const [formData, setFormData] = useState({
    firstName: 'Coder',
    lastName: 'Byte',
    phoneNumber: '0965650099',
  });

  const [error, setError] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // 更新對應的name的欄位
    }));

    // setFormData(prev => {
    //   const newData = { ...prev };
    //   newData[name] = value; // 直接透過變數賦值
    //   return newData;
    // });

    setError((prev) => ({ ...prev, [name]: '' }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // __define-ocg__: Define the submission logic for adding a new entry
    const varOcg = {
      // 使用要求的變數名 varOcg
      ...formData,
    };

    let newErrors = {};
    if (formData.firstName.length === 0) {
      newErrors.firstName = 'First name must not be empty';
    }
    if (formData.lastName.length === 0) {
      newErrors.lastName = 'Last name must not be empty';
    }
    if (formData.phoneNumber.length === 0) {
      newErrors.phoneNumber = 'Phone number must not be empty';
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 將數據傳遞給父組件
      addEntryCallback(varOcg);
      // 重置表單（可選）
      setFormData({
        firstName: 'Coder',
        lastName: 'Byte',
        phoneNumber: '0965650099',
      });
      setError({});
    }
  };

  return (
    <form onSubmit={handleOnSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userFirstname"
        name="firstName"
        type="text"
        value={formData.firstName}
        onChange={handleOnChange}
        placeholder="Coder"
      />
      {error.firstName && <div style={{ color: 'red' }}>{error.firstName}</div>}
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userLastname"
        name="lastName"
        type="text"
        value={formData.lastName}
        onChange={handleOnChange}
        placeholder="Byte"
      />
      {error.lastName && <div style={{ color: 'red' }}>{error.lastName}</div>}
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className="userPhone"
        name="phoneNumber"
        type="text"
        value={formData.phoneNumber}
        onChange={handleOnChange}
        placeholder="8885559999"
      />
      {error.phoneNumber && (
        <div style={{ color: 'red' }}>{error.phoneNumber}</div>
      )}
      <br />
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
}

function InformationTable({ entries }) {
  // 使用 varFiltersCg 儲存排序後的數據
  const varFiltersCg = entries.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>
        {varFiltersCg.map((entry, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{entry.firstName}</td>
            <td style={style.tableCell}>{entry.lastName}</td>
            <td style={style.tableCell}>{entry.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FormProps() {
  const [phoneBookEntries, setPhoneBookEntries] = useState([]);

  const addEntryCallback = (newEntry) => {
    setPhoneBookEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  return (
    <section>
      <PhoneBookForm addEntryCallback={addEntryCallback} />
      <InformationTable entries={phoneBookEntries} />
    </section>
  );
}

export default FormProps;

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<FormProps />);
