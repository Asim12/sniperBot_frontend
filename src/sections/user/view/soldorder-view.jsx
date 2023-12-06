import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useUserContext } from 'src/hooks/useUserContext';

import { callApi } from 'src/API/api';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import Variants from 'src/components/Skeleton/Skeleton';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
// import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function SoldOrders() {
  const { state, dispatch } = useUserContext();
  const usersList = state.userList;
  const [Loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });
  const dataFiltered = useMemo(
    () =>
      applyFilter({
        inputData: usersList,
        comparator: getComparator(order, orderBy),
        filterName,
      }),
    [filterName, order, orderBy, usersList]
  );

  const notFound = !dataFiltered.length && !!filterName;

  useEffect(() => {
    const getAllSoldOrders = async () => {
      try {
        const response = await callApi('/getSoldOrder', 'GET');

        if (response.status === 200) {
          setLoading(false);
          dispatch({ type: 'SET_USERS', payload: response.data.sold_order });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllSoldOrders();
  }, [dispatch]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Sold Orders</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>

      <Card>
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          {Loading ? <Variants /> : ''}
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'symbol', label: 'symbol' },
                  { id: 'contractAddress', label: 'Contract Address' },
                  { id: 'pairAddress', label: 'Pair Address' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'buy_price', label: 'Buy-price' },
                  { id: 'sell_price', label: 'Sell-price' },
                  { id: 'status', label: 'Status' },
                  { id: 'profit_percentage', label: 'Profit %' },
                  { id: 'updatedAt', label: 'Updated-At' },
                  { id: 'createdAt', label: 'Created-At' },
                  // { id: 'user_id', label: 'user_id' },
                  // { id: '', label: 'Action' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {usersList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row._id}
                      contractAddress={row.contractAddress}
                      pairAddress={row.pairAddress}
                      amount={row.amount}
                      buy_price={row.buy_price}
                      sell_price={row.sell_price}
                      createdAt={row.createdAt}
                      logo={row.logo}
                      profit_percentage={row.profit_percentage}
                      status={row.status}
                      symbol={row.symbol}
                      updatedAt={row.updatedAt}
                      user_id={row.user_id}
                      _id={row._id}
                      selected={selected.indexOf(row._id) !== -1}
                      handleClick={(event) => handleClick(event, row._id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
