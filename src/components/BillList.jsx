import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

function BillList({ bills, persons, onRemoveBill }) {
  if (bills.length === 0) {
    return <Typography>No bills added yet.</Typography>;
  }

  return (
    <List>
      {bills.map(bill => {
        const paidByPerson = persons.find(person => person.id === bill.paidBy);
        return (
          <ListItem
            key={bill.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onRemoveBill(bill.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={bill.description}
              secondary={`Cantidad: ${bill.amount.toFixed(2)} € | Pagado por: ${paidByPerson ? paidByPerson.name : 'Unknown'}`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default BillList;
