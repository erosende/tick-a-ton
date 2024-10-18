import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

function PersonList({ persons, onRemovePerson }) {
  if (persons.length === 0) {
    return <Typography>No persons added yet.</Typography>;
  }

  return (
    <List>
      {persons.map(person => (
        <ListItem
          key={person.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => onRemovePerson(person.id)}>
              <DeleteIcon />
            </IconButton>
          }
        >
          <ListItemText primary={person.name} />
        </ListItem>
      ))}
    </List>
  );
}

export default PersonList;
