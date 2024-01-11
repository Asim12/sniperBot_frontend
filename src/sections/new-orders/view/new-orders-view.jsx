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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
import { getNewOrders } from 'src/redux/action';
import { MoreVert, Visibility } from '@mui/icons-material';
import { Link } from '@mui/material';
// ----------------------------------------------------------------------

export default function NewOrdersPage() {
  const dispatch = useDispatch();

  const newOrdersState = useSelector((state) => state.order); // assuming 'soldOrders' is the key for your reducer

  console.log('sold order state is', newOrdersState);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false); // New state for the dialog
  const [selectedRow, setSelectedRow] = useState(null); // New state for selected row

  console.log('page number is ', page);
  console.log('selected row',selectedRow)

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const truncateAddress = (address) => {
    const prefix = address.substring(0, 6);
    const suffix = address.substring(address.length - 4);
    return `${prefix}...${suffix}`;
  };

  useEffect(() => {
    dispatch(getNewOrders({ limit: 20, pageNumber: page + 1 }));
  }, [rowsPerPage, page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };
  const vertClickHelper = (row) => {
    const selectedIndex = selected.indexOf(row._id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      // If the row is not selected, add it to the selection
      newSelected = newSelected.concat(selected, row._id);
    } else {
      // If the row is already selected, remove it from the selection
      newSelected = selected.filter((id) => id !== row._id);
      setSelectedRow(null); // Clear the selected row when unselecting
    }
  
    setSelected(newSelected);
    setSelectedRow(row);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = newOrdersState.newOrders
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((order) => order._id);

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
    setPage(0);
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
        <Typography variant="h4">New Orders</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>

      <Card>
        {/* <OrdersTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrdersTableHead
                order={order}
                // orderBy={orderBy}
                rowCount={
                  newOrdersState?.newOrders?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).length
                }
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: '_id', label: 'Order ID' },
                  { id: 'createdAt', label: 'Created' },
                  { id: 'symbol', label: 'Symbol', align: 'center' },
                  // { id: 'buyPrice', label: 'Buy Price' },
                  // { id: 'sellPrice', label: 'sold Price' },
                  // { id: 'sellPercentage', label: 'sell percentage' },
                  // { id: 'soldPercentage', label: 'sold percentage' },
                  { id: 'status', label: 'Status' },
                  { id: 'type', label: 'type' },
                  { id: 'updatedAt', label: 'Updated' },
                  { id: 'action', label: 'Action' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {newOrdersState?.newOrders
                  // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <>
                      <OrdersTableRow
                        key={row._id}
                        _id={row?._id}
                        sellPrice={row?.sell_price}
                        buyPrice={row?.buy_price}
                        profitAmount={row?.profit_amount}
                        symbol={row?.symbol}
                        logo={row?.logo}
                        buyTransactionHash={row?.buy_transaction_hash}
                        sellTransactionHash={row?.sell_transaction_hash}
                        status={row?.status}
                        contractAddress={row?.contractAddress}
                        pairAddress={row?.pairAddress}
                        userId={row?.user_id}
                        type={row?.type !== undefined && row?.type !== '' ? row.type : 'auto'}
                        createdAt={row?.createdAt}
                        updatedAt={row?.updatedAt}
                        soldPercentage={ ((row.sell_price - row.buy_price)/ ((row.sell_price + row.buy_price)/2))*100 }
                        amount={row?.amount}
                        chainId={row?.chain_id}
                        action={
                          <Visibility
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleDialogOpen();
                              vertClickHelper(row);
                            }}
                          />
                        }
                        profitPercentage={row?.profit_percentage}
                        selected={selected.indexOf(row._id) !== -1}
                        handleClick={(event) => handleClick(event, row._id)}
                      />
                    </>
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
           count={newOrdersState?.newOrderCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 15, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DialogTitle>More Details</DialogTitle>
        <div>
          <DialogContent>
            <DialogContentText>
              <Stack   direction={{base:'column',md:'row'}}  gap={'2px'}>
                <Typography variant="subtitle1" style={{fontWeght:'bold',color:'#000'}}>Contaract Address: </Typography>
                <Typography variant="p" color={'#000'}> <Link target="_blank" style={{color:"#007bff",textDecoration:'none'}} href={`${import.meta.env.VITE_HASH_URL}/${selectedRow?.contractAddress}`}>
                    {selectedRow?.contractAddress}
                  </Link></Typography>
              </Stack>

              <Stack
                style={{ marginTop: '1rem' }}
                direction={{base:'column',md:'row'}}
                gap={'2px'}
              >
                <Typography variant="subtitle1" style={{fontWeght:'bold',color:'#000'}}>Pair Address: </Typography>
                <Typography variant="p" color={'#000'}>{selectedRow?.pairAddress}</Typography>
              </Stack>

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </div>
      </Dialog>
    </Container>
  );
}
