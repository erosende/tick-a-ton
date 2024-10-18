import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

function EditBillForm({ bill, persons, onEditBill, onCancel }) {
  const [description, setDescription] = useState(bill.description);
  const [amount, setAmount] = useState(bill.amount.toString());
  const [paidBy, setPaidBy] = useState(bill.paidBy);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim() && amount && paidBy) {
      onEditBill({
        description: description.trim(),
        amount: parseFloat(amount),
        paidBy,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, mb: 2 }}>
      <TextField
        label="Bill Description"
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        label="Amount"
        variant="outlined"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mr: 2, mb: 2 }}
      />
      <TextField
        select
        label="Paid By"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
        sx={{ mr: 2, mb: 2, minWidth: 120 }}
      >
        {persons.map((person) => (
          <MenuItem key={person.id} value={person.id}>
            {person.name}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" sx={{ mr: 2 }}>Save Changes</Button>
      <Button onClick={onCancel} variant="outlined">Cancel</Button>
    </Box>
  );
}

export default EditBillForm;
