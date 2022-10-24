import React, { BaseSyntheticEvent, MouseEvent, SyntheticEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHeadComponent, { HeadCell } from './TableHead/TableHead';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
}));

type TableComponentProps = {
  rows: TableRowProps[];
  headCells: HeadCell[];
};

type StableSortProps = [TableRowProps, number];

type SortComparator = (a: TableRowProps, b: TableRowProps) => number; 

export type TableRowProps = {
  [key: string]: string | number;
};

export type SortOrder = 'asc' | 'desc';

const TableComponent = (props: TableComponentProps) => {
  const { rows, headCells } = props;
  const classes = useStyles();
  const [order, setOrder] = useState<SortOrder>('asc');
  const [orderBy, setOrderBy] = useState<string>('calories');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleRequestSort = (event: SyntheticEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: MouseEvent<HTMLButtonElement | MouseEvent> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: BaseSyntheticEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const descendingComparator = (a: TableRowProps, b: TableRowProps, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  const getComparator = (order: SortOrder, orderBy: string) => {
    return order === 'desc'
      ? (a: TableRowProps, b: TableRowProps) => descendingComparator(a, b, orderBy)
      : (a: TableRowProps, b: TableRowProps) => -descendingComparator(a, b, orderBy);
  };
  
  const stableSort = (array: TableRowProps[], comparator: SortComparator) => {
    const stabilizedThis: StableSortProps[]= array.map((el: TableRowProps, index: number) => [el, index]);

    stabilizedThis.sort((a: StableSortProps, b: StableSortProps) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el: StableSortProps) => el[0]);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            size='small'
          >
            <TableHeadComponent
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: TableRowProps, index: number) => {

                  return (
                    <TableRow key={index} >
                      {headCells.map((headCell: HeadCell, key: number) => 
                      <TableCell
                        key={key} 
                        align={headCell.numeric ? 'right' : 'left'}
                        >
                          {row[headCell.id]}</TableCell>)}
                      </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>     
    </div>
  );
}

export default TableComponent;