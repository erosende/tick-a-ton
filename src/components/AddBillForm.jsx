import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function AddBillForm({ onAddBill, persons }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && amount && paidBy) {
      onAddBill(description.trim(), amount, paidBy);
      setDescription('');
      setAmount('');
      setPaidBy('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      <TextField
        label="Descripción"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Cantidad"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        select
        label="Pagada por"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        sx={{ mr: 2, mb: 2, minWidth: 150}}
      >
        {persons.map((person) => (
          <MenuItem key={person.id} value={person.id}>
            {person.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained">Add Bill</Button>
    </Box>
  );
}

export default AddBillForm;
