import {useTheme} from "@mui/material/styles";
import MaterialReactTable from "material-react-table";

const ItemSmartDataFrame = (props) => {
    const theme = useTheme()
    const styles = {
        messageContentOther: {
            color: theme.palette.text.primary
        },
    }

    const create_table_column = () => {
        let columns = []
        for (const key in props.data[0]) {
            columns.push({
                accessorKey: key,
                header: key,
                enableSorting: true,
                enableColumnActions: false,
                size: 130
            })
        }
        return (columns)
    }

    return(
        <>
            <MaterialReactTable
                columns={create_table_column()}
                data={props.data}
                enableStickyHeader
                manualSorting={false}
                enableTopToolbar={false}
                enableStickyFooter={false}
                enableFullScreenToggle={false}
                enableDensityToggle={false}
                enableColumnFilters={false}
                enableBottomToolbar={props.data.length > props.row}
                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed',
                    },
                }}
                initialState={{
                    pagination: {pageSize: props.row, pageIndex: 0},
                    density: 'compact',
                }}
            />
        </>
    )
}
export default ItemSmartDataFrame