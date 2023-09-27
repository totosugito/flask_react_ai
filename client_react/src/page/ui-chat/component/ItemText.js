import {Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const ItemText = (props) => {
    const theme = useTheme()
    const styles = {
        messageContentOther: {
            color: theme.palette.text.primary
        },
    }
    return(
        <>
            <Typography sx={styles.messageContentOther}>{props.data}</Typography>
        </>
    )
}
export default ItemText