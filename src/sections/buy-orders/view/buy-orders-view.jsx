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
import { getBuyOrders, soldManual } from 'src/redux/action';
import { MoreVert, Visibility } from '@mui/icons-material';
import { io } from 'socket.io-client';
import { CircularProgress, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function BuyOrdersPage() {
  const dispatch = useDispatch();

  const [realTimePrices, setRealTimePrices] = useState([{}]);

  const buyOrdersState = useSelector((state) => state.order); // assuming 'soldOrders' is the key for your reducer

  console.log('buy state', buyOrdersState);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [btnClicked, setBtnClicked] = useState(false);

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');
  const [selectedRow, setSelectedRow] = useState(null); // New state for selected row

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false); // New state for the dialog

  const [totalPages, setTotalPages] = useState(1);

 

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  console.log('page number is ', page);

  useEffect(() => {
    dispatch(getBuyOrders({ limit: 10, pageNumber: page + 1 }));
  }, [rowsPerPage, page,buyOrdersState?.soldManual]);

  const socket = io('http://3.21.242.18:3000');
  const uniqueSymbols = Array.from(new Set(buyOrdersState.buyOrders.map((order) => order.symbol)));
  useEffect(() => {
    // Extract unique symbols from buyOrdersState.buyOrders

    console.log('unique symbols', uniqueSymbols);
    // Subscribe to getPrices event with uniqueSymbols payload
    socket.emit('getPrices', uniqueSymbols);

    // Handle incoming prices
    socket.on('prices', (prices) => {
      // Update the state with real-time prices
      console.log('real time prices are', prices);
      setRealTimePrices(prices?prices:0);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [buyOrdersState.buyOrders,uniqueSymbols]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = buyOrdersState.buyOrders
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((order) => order._id);

      setSelected(newSelecteds);
    } else {
      setSelected([]);
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
        <Typography variant="h4">Buy Orders</Typography>

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
              {buyOrdersState?.soldManualLoading?
              <div style={{textAlign:'center',margin:'20px 0'}}><CircularProgress/></div>:
              <>
              <OrdersTableHead
                order={order}
                // orderBy={orderBy}
                rowCount={
                  buyOrdersState.buyOrders.slice(
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
                  { id: 'buyPrice', label: 'Buy Price' },
                  { id: 'currentPrice', label: 'Current Price' },
                  { id: 'profitPercentage', label: 'sell percentage' },
                  { id: 'currentStatus', label: 'Current Status' },
                  // { id: 'logo', label: 'logo' },
                  // { id: 'amount', label: 'Amount' },
                  // { id: 'chainId', label: 'Chain ID' },
                  { id: 'status', label: 'Status' },
                  { id: 'type', label: 'type' },
                  { id: 'updatedAt', label: 'Updated' },
                  { id: 'Action', label: 'Action' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {buyOrdersState?.buyOrders
                  // ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => {
                    const currentSymbol = row?.symbol;
                    const matchingSymbolPrice = realTimePrices?.find(
                      (item) => item.symbol === currentSymbol
                    );

                    const currentSymbolPrice = matchingSymbolPrice
                      ? matchingSymbolPrice.price
                      : null;

                    // Check if the symbol is present in the unique symbols set

                    // If the symbol is in the set, get the corresponding real-time price; otherwise, use null
                    return (
                      <OrdersTableRow
                        key={row._id}
                        buyPrice={row?.buy_price?.toFixed(7)}
                        symbol={row?.symbol}
                        logo={row?.logo}
                        status={row?.status}
                        currentPrice={currentSymbolPrice?.toFixed(7)}
                        _id={row?._id}
                        currentStatus={
                          (((currentSymbolPrice- row.buy_price) /
                            ((currentSymbolPrice+ row.buy_price) / 2)) *
                          100).toFixed(2)
                        }
                        type={row?.type !== undefined && row?.type !== '' ? row.type : 'auto'}
                        createdAt={row?.createdAt}
                        updatedAt={row?.updatedAt}
                        action={
                          <Stack direction={'row'} alignItems={'center'}>
                            <Visibility
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                handleDialogOpen();
                                vertClickHelper(row);
                              }}
                            />
                            <Button
                              style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                marginLeft: '10px',
                              }}

                              onClick={()=>{
                                dispatch(soldManual({ order_id:row?._id }));
                                setBtnClicked((prev)=>!prev)


                              }}
                            >
                              Sell
                            </Button>
                          </Stack>
                        }
                        amount={row?.amount}
                        // chainId={row?.chain_id}
                        profitPercentage={row?.profit_percentage}
                        selected={selected.indexOf(row._id) !== -1}
                        handleClick={(event) => handleClick(event, row._id)}
                      />
                    );
                  })}

                {/* <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                /> */}

                {/* {notFound && <TableNoData query={filterName} />} */}
              </TableBody>
              </>}
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={buyOrdersState.buyOrderCount}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10]}
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
              <Stack gap={'2px'} direction={{ base: 'column', md: 'row' }}>
                <Typography variant="subtitle1" fontWeight="bold" color={'#000'}>
                  Contaract Address:{' '}
                </Typography>
                <Typography variant="body1" color={'#000'}>
                  <Link target="_blank" style={{color:"#007bff",textDecoration:'none'}} href={`${import.meta.env.VITE_HASH_URL}/${selectedRow?.contractAddress}`}>
                    {selectedRow?.contractAddress}
                  </Link>
                </Typography>
              </Stack>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" fontWeight="bold" color={'#000'}>
                  Pair Address:{' '}
                </Typography>
                <Typography variant="body1" color={'#000'}>
                  {selectedRow?.pairAddress}
                </Typography>
              </Stack>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" fontWeight="bold" color={'#000'}>
                  User ID:{' '}
                </Typography>
                <Typography variant="body1" color={'#000'}>
                  {selectedRow?.user_id}
                </Typography>
              </Stack>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" fontWeight="bold" color={'#000'}>
                  Buy Transaction Hash:{' '}
                </Typography>
                <Typography variant="body1" color={'#000'}>
                <Link target="_blank" style={{color:"#007bff",textDecoration:'none'}} href={`${import.meta.env.VITE_HASH_URL}/${selectedRow?.contractAddress}`}>
                    {selectedRow?.buy_trasaction_hash}
                  </Link>
                </Typography>
              </Stack>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" fontWeight="bold" color={'#000'}>
                  Buy Amount:{' '}
                </Typography>
                <Typography variant="body1" color={'#000'}>
                  {selectedRow?.amount}
                </Typography>
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
