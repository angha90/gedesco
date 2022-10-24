import React, { SyntheticEvent } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';
import { SortOrder } from '../Table';

const useStyles = makeStyles((theme) => ({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

type TableHeadComponentProps = {
    order: SortOrder ;
    orderBy: string;
    onRequestSort: (a: SyntheticEvent, b: string) => void;
    headCells: HeadCell[];
};

export type HeadCell = {
    id: string,
    numeric: boolean,
    label: string;
};

const TableHeadComponent = (props: TableHeadComponentProps) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const classes = useStyles();

  const createSortHandler = (property: string) => (event: SyntheticEvent) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell: HeadCell) => (
          <TableCell
            className='app-table-head'
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeadComponent;
