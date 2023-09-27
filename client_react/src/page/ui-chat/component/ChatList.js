import {useTheme} from "@mui/material/styles";
import {createRef, useEffect} from "react";
import {Box, Container} from "@mui/material";
import ChatItem from "./ChatItem";

const ChatList = (props) => {
    const theme = useTheme()
    const styles = {
        container: {
            // marginTop: "50px",
        },
        toolbar: {
            width: '100%',
            p: 1,
            backgroundColor: theme.palette.primary.main,
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px"
        },
        toolbarText: {
            width: '100%',
            color: theme.palette.primary.contrastText,
        },
        paper: {
            p: 1,
            height: "calc(100vh - 160px )",
            maxWidth: "2500px",
            maxHeight: "2000px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: "5px",
            overflowY: "auto",
            overflowX: "hidden",
            height: "calc( 100% - 0px )",
        }
    }

    const messagesEndRef = createRef()
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [props.data])

    return (
        <Container disableGutters maxWidth={false}>
            <Box sx={styles.paper}>
                <Box sx={styles.messagesBody}>
                    {props.data &&
                        props.data.map((msg) => (
                            <ChatItem key={msg.id} data={msg}/>))
                    }
                    <div ref={messagesEndRef}/>
                </Box>
            </Box>
        </Container>
    );
}
export default ChatList