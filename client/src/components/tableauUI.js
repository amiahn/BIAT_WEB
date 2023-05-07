import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

const useStyles = makeStyles(theme =>({
    Table : {
        marginTop : theme.spacing(3),
        '& thead th' : {
        fontWeight : '600',
        color : theme.palette.primary.main,
        backgroundColor : theme.palette.primary.light,
        
        },
        '& tbody td' : {
        fontWeight : '300',
        },
        '& tbody tr:hover' : {
        backgroundColor : '#fffbf2',
        cursor : 'pointer'
        },
    },
}))

function UseTable(records, headcells, filtre) {
    const classes = useStyles()

    const pages = [5, 10, 15]
    const [page, setpage] = useState(0)
    const [RPpage, setRPpage] = useState(pages[page])
    const [order, setorder] = useState()
    const [orderby, setorderby] = useState()

    

    const Tblheader = props => {

        const HandleSort = (cellid) => {
            const isasc = orderby === cellid && order === 'asc'
            setorder(isasc ? 'desc' : 'asc')
            setorderby(cellid)
        }

        return(
            <TableHead>
                <TableRow>
                    {
                        headcells.map((item) =>(
                            <TableCell 
                            sortDirection={orderby === item.id ? order : false}
                            key={item.id}>
                                {item.disableSorting ? item.label :
                                <TableSortLabel
                                active={orderby === item.id}
                                direction={orderby === item.id ? order : 'asc'}
                                onClick={() => {HandleSort(item.id)}}
                                >
                                {item.label}
                                </TableSortLabel>
    }
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const HandleChangePage = (e, NewPage) => {
        setpage(NewPage)
    }

    const HandleChangeRPPage = (e) => {
        setRPpage(parseInt(e.target.value,10))
        setpage(0)
    }

    const Tblcontainer = props => (
        <Table className={classes.Table}>
            {props.children}
        </Table>
    )
    const TblPagination = () => (
        <TablePagination
        rowsPerPage={RPpage}
        rowsPerPageOptions={pages}
        page={page}
        component='div'
        count={records.length}
        onPageChange={HandleChangePage}
        onRowsPerPageChange={HandleChangeRPPage}
        />
    )

        function Sort (array, comparator) {
            const stabilised = array.map((el, index) => [el, index])
            stabilised.sort((a, b) => {
                const order = comparator(a[0], b[0])
                if (!order !== 0) return order
                return a[1] - b[1]
            })
            return stabilised.map((el) => el[0])
        }

        function getComparator (order, orderby) {
            return order ==='desc'
            ? (a, b) => descComparator(a, b, orderby)
            : (a, b) => -descComparator(a, b, orderby)
        }

        function descComparator(a, b, orderby){
            if(b[orderby] < a[orderby]){
                return -1
            }
            if(b[orderby] > a[orderby]){
                return 1
            }
            return 0
        }

    const PagingSorting = () => {
        return Sort(filtre.fn(records), getComparator(order,orderby)).slice(page*RPpage,(page+1)*RPpage)
    }

    return {
        Tblcontainer,
        Tblheader,
        TblPagination,
        PagingSorting
    }
}

export default UseTable