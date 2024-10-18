import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

function Summary({ amountsOwed, persons }) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Resumen
      </Typography>
      <List>
        {persons.map(person => (
          <ListItem key={person.id} disablePadding>
            <ListItemText
              primary={person.name}
              secondary={`${amountsOwed[person.id] > 0 ? 'Debe' : 'Le deben'} ${Math.abs(amountsOwed[person.id]).toFixed(2)} €`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default Summary;
