import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import OrdersTableRow from '../orders-table-row';
import OrdersTableHead from '../orders-table-head';
import TableEmptyRows from '../table-empty-rows';
import OrdersTableToolbar from '../orders-table-toolbar';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getBuyOrders} from 'src/redux/action';
// ----------------------------------------------------------------------

export default function BuyOrdersPage() {
  const dispatch = useDispatch();



  const buyOrdersState = useSelector((state) => state.order); // assuming 'soldOrders' is the key for your reducer

  console.log('buy state',buyOrdersState.buyOrders)

  const [page, setPage] = useState(1);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log('page number is ',page)


  useEffect(() => {
    dispatch(getBuyOrders({limit:rowsPerPage,pageNumber:page}))
  }, [rowsPerPage,page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log('even target checked ',event.target.checked)
      const newSelecteds = buyOrdersState.buyOrders.map((order) => order._id);
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };
  
  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Buy Orders</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>

      <Card>
        <OrdersTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrdersTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'buyPrice', label: 'Buy Price' },
                  { id: 'symbol', label: 'Symbol', align: 'center' },
                  { id: 'logo', label: 'logo' },
                  { id: 'buyTransactionHash', label: 'Buy Transaction Hash' },
                  { id: 'status', label: 'Status' },
                  { id: '_id', label: '_id' },
                  { id: 'contractAddress', label: 'Contract Address' },
                  { id: 'pairAddress', label: 'Pair Address' },
                  { id: 'userId', label: 'User Id' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'chainId', label: 'Chain ID' },
                  { id: 'profitPercentage', label: 'Profit Percentage' },
                  { id: '' },
                ]}
              />
              <TableBody>
              {buyOrdersState?.buyOrders?.map((row) => (
                    <OrdersTableRow
                      key={row._id}
  
                      buyPrice={row?.buy_price}
                      symbol={row?.symbol}
                      logo={row?.logo}
                      buyTransactionHash={row?.buy_transaction_hash}
                      status={row?.status}
                      _id={row?._id}
                      contractAddress={row?.contractAddress}
                      pairAddress={row?.pairAddress}
                      userId={row?.user_id}
                      amount={row?.amount}
                      chainId={row?.chain_id}
                      profitPercentage={row?.profit_percentage}
                      selected={selected.indexOf(row._id) !== -1}
                      handleClick={(event) => handleClick(event, row._id)}
                    />
                  ))}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                /> */}

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={buyOrdersState.buyOrders.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Card>
    </Container>
  );
}
