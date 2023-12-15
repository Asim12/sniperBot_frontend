import { useRef, useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress } from '@mui/material';
import { users } from 'src/_mock/user';
import { MoreVert, Visibility } from '@mui/icons-material';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import OrdersTableRow from '../orders-table-row';
import OrdersTableHead from '../orders-table-head';
import TableEmptyRows from '../table-empty-rows';
import OrdersTableToolbar from '../orders-table-toolbar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addCustomOrders, getCustomOrders } from 'src/redux/action';
// ----------------------------------------------------------------------

export default function CustomOrdersPage() {
  const dispatch = useDispatch();

  const [contractAddress, setContractAddress] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const customOrdersState = useSelector((state) => state.order); // assuming 'soldOrders' is the key for your reducer
  console.log(
    '🚀 ~ file: custom-orders-view.jsx:43 ~ CustomOrdersPage ~ customOrdersState:',
    customOrdersState
  );

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);


  const [detailDialogOpen, setDetailDialogOpen] = useState(false); // New state for the dialog

  const [selectedRow, setSelectedRow] = useState(null); // New state for selected row
  console.log('selected row is ',selectedRow)



  const handleDetailDialogOpen = () => {
    setDetailDialogOpen(true);
  };

  const handleDetailDialogClose = () => {
    setDetailDialogOpen(false);
  };
  console.log('page number is ', page);

  const addCustomOrderHandler = useCallback(() => {
    dispatch(addCustomOrders({ contract_address: contractAddress }));
  }, [dispatch, contractAddress]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
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
  
  useEffect(() => {
    dispatch(getCustomOrders({ limit: 20, pageNumber: page + 1 }));
  }, [rowsPerPage, page]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customOrdersState.customOrders
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
        <Typography variant="h4">Custom Orders</Typography>

        <Button
          onClick={() => handleDialogOpen()}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Order
        </Button>
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
                  customOrdersState.customOrders.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).length
                }
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: '_id', label: 'Order ID' },
                  { id: 'created', label: 'Created', align: 'center' },
                  { id: 'symbol', label: 'Symbol', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: 'type', label: 'type' },
                  { id: 'updated', label: 'Updated' },
                  { id: 'action', label: 'action' },
                ]}
              />
              <TableBody>
                {customOrdersState?.customOrders
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <OrdersTableRow
                      key={row._id}
                      status={row?.status}
                      symbol={row?.symbol}
                      count={row?.count}
                      name={row?.name}
                      type={row?.type !== undefined && row?.type !== '' ? row.type : 'auto'}
                      createdAt={row?.createdAt}
                      updatedAt={row?.updatedAt}
                      currentStatus={0}
                      action={
                        <Visibility
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            handleDetailDialogOpen();
                            vertClickHelper(row);
                          }}
                        />
                      }
                      _id={row?._id}
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
          count={customOrdersState.customOrders.length}
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
        <DialogTitle>Add a custom order</DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {customOrdersState?.customOrdersLoading && <CircularProgress />}
        </div>

        <DialogContent>
          <DialogContentText>
            To add a custom order, please enter the contract address here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="contractAddress"
            label="Contract Address"
            type="text"
            fullWidth
            variant="standard"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button disabled={!contractAddress.trim()} onClick={addCustomOrderHandler}>
            Add
          </Button>
        </DialogActions>
      </Dialog>








      <Dialog
        open={detailDialogOpen}
        onClose={handleDetailDialogClose}
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
              <Stack direction={{base:'column',md:'row'}}   gap={'2px'}>
                <Typography variant="subtitle1" color={'#000'} fontWeight={'bold'}>Contaract Address: </Typography>
                <Typography variant="p" color={'#000'}>{selectedRow?.contractAddress}</Typography>
              </Stack>

              <Stack direction={{base:'column',md:'row'}}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" color={'#000'} fontWeight={'bold'}>Pair Address: </Typography>
                <Typography variant="p" color={'#000'}>{selectedRow?.pairAddress}</Typography>
              </Stack>

              <Stack direction={{base:'column',md:'row'}}
                style={{ marginTop: '1rem' }}
                gap={'2px'}
              >
                <Typography variant="subtitle1" color={'#000'} fontWeight={'bold'}>User ID: </Typography>
                <Typography variant="p" color={'#000'}>{selectedRow?.user_id}</Typography>
              </Stack>

              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDetailDialogClose}>Cancel</Button>
          </DialogActions>
        </div>
      </Dialog>
    </Container>
  );
}
