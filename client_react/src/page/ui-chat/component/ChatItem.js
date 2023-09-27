import {
    Avatar,
    Grid,
    Typography
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import moment from 'moment'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ItemText from "./ItemText";
import ItemPlotly from "./ItemPlotly";
import ItemSmartDataFrame from "./ItemSmartDataFrame";
import Plot from "react-plotly.js";

const ChatItem = (props) => {
    const theme = useTheme()
    const styles = {
        displayNameOther: {
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            fontSize: '110%'
        },
        messageContentOther: {
            color: theme.palette.text.primary
        },
        containerMessageOther: {
            textAlign: "left",
            m: 1
        },
        avatarOther: {
            color: theme.palette.getContrastText(theme.palette.divider),
            backgroundColor: theme.palette.divider,
            width: theme.spacing(4),
            height: theme.spacing(4)
        },
        messageOther: {
            p: 1,
            backgroundColor: theme.palette.divider,
            maxWidth: "720px",
            minHeight: "30px",
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageTimeStampOther: {
            fontSize: "70%",
            color: theme.palette.text.secondary,
            textAlign: 'right'
        },

        displayNameMine: {
            fontWeight: 'bold',
            color: theme.palette.primary.contrastText,
            fontSize: '110%'
        },
        messageContentMine: {
            color: theme.palette.primary.contrastText
        },
        containerMessageMine: {
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "right",
            m: 1
        },
        messageMine: {
            p: 1,
            marginRight: "20px",
            position: "relative",
            backgroundColor: theme.palette.success.main,
            maxWidth: "720px",
            textAlign: "left",
            font: "400 90% 'Open Sans', sans-serif",
            borderRadius: "10px",
        },
        messageTimeStampMine: {
            fontSize: "70%",
            color: theme.palette.success.contrastText,
            textAlign: 'right'
        },

        importantMessage: {
            ml: 1,
            color: theme.palette.warning.main
        }
    }

    const createItemChat = (msg) => {
        switch (msg["type"]) {
            case "text":
                return(<ItemText data={msg.response}/>)
            case "plotly":
                let data = JSON.parse(JSON.stringify(msg.response["data"]))
                let layout = JSON.parse(JSON.stringify(msg.response["layout"]))
                return(<ItemPlotly data={[data]} layout={layout}/>)
            case "SmartDataframe":
                return(<ItemSmartDataFrame data={msg.response} row={10}/>)
            default:
                return(<ItemText data={msg["type"]}/>)
        }
    }

    const MessageOther = (data) => {
        const timestamp = data['updatedAt'] ? moment( data['updatedAt'] ).format("YYYY-MM-DD  HH:mm:ss") : ""
        return (
            <>
                <Grid container sx={styles.containerMessageOther}>
                    <Grid item sx={{mr: 1}}>
                        <Avatar style={styles.avatarOther}><SmartToyIcon/> </Avatar>
                    </Grid>
                    <Grid item sx={styles.messageOther}>
                        <Typography sx={styles.displayNameOther}>{data.user}</Typography>
                        {createItemChat(data)}
                        <Typography sx={styles.messageTimeStampOther}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    const MessageMine = (data) => {
        const timestamp = data['updatedAt'] ? moment( data['updatedAt'] ).format("YYYY-MM-DD  HH:mm:ss") : ""
        return (
            <>
                <Grid container sx={styles.containerMessageMine}>
                    <Grid item sx={styles.messageMine}>
                        <Typography sx={styles.displayNameMine}>{data.user}</Typography>
                        <Typography sx={styles.messageContentMine}>{data.response}</Typography>
                        <Typography sx={styles.messageTimeStampMine}>{timestamp}</Typography>
                    </Grid>
                </Grid>
            </>
        );
    };

    return (
        <>
            {
                props.data["user"] === "ai" ? MessageOther(props.data) : MessageMine(props.data)
            }
        </>
    )
}

export default ChatItem
