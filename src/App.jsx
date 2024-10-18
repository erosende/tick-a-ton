import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonList from './components/PersonList';
import AddPersonForm from './components/AddPersonForm';
import BillList from './components/BillList';
import AddBillForm from './components/AddBillForm';
import Summary from './components/Summary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [persons, setPersons] = useState([]);
  const [bills, setBills] = useState([]);

  // Calculate total amount owed by each person
  const calculateAmountsOwed = () => {
    const amountsOwed = {};
    persons.forEach(person => {
      amountsOwed[person.id] = 0;
    });

    bills.forEach(bill => {
      const amountPerPerson = bill.amount / persons.length;
      persons.forEach(person => {
        if (person.id !== bill.paidBy) {
          amountsOwed[person.id] += amountPerPerson;
        } else {
          amountsOwed[person.id] -= (bill.amount - amountPerPerson);
        }
      });
    });

    return amountsOwed;
  };

  const [amountsOwed, setAmountsOwed] = useState({});

  useEffect(() => {
    setAmountsOwed(calculateAmountsOwed());
  }, [persons, bills]);

  const addPerson = (name) => {
    const newPerson = {
      id: Date.now().toString(),
      name,
    };
    setPersons([...persons, newPerson]);
  };

  const removePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id));
    setBills(bills.filter(bill => bill.paidBy !== id));
  };

  const addBill = (description, amount, paidBy) => {
    const newBill = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      paidBy,
    };
    setBills([...bills, newBill]);
  };

  const removeBill = (id) => {
    setBills(bills.filter(bill => bill.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Typography variant="h2" component="h1" gutterBottom>
          Tick-a-ton
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ position: 'sticky', top: 20 }}>
              <Summary amountsOwed={amountsOwed} persons={persons} />
            </Box>
            <AddBillForm onAddBill={addBill} persons={persons} />
          </Grid>
          <Grid item xs={12} md={8}>
            <PersonList persons={persons} onRemovePerson={removePerson} />
            <AddPersonForm onAddPerson={addPerson} />
            <BillList bills={bills} persons={persons} onRemoveBill={removeBill} />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
