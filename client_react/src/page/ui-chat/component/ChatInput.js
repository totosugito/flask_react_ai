import { useState } from "react"
import { useTheme } from "@mui/material/styles"
import {
    Button,
    Stack,
    TextField
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send'


const ChatInput = (props) => {
    const theme = useTheme()
    const styles = {
        stack: {
            pt: 1,
            width: "100%",
        },
        textField: {
            mr: 1,
            color: theme.palette.primary.main
        },
        button: {}
    }

    const [msgText, setMsgText] = useState('')
    const sendMessage = () => {
        props.onSendMessage({
            id: Math.floor(Math.random() * 1000000),
            user: "user",
            response: msgText,
        })
        setMsgText("")
    }
    return (
        <>
            <Stack direction={'row'} sx={styles.stack}>
                <TextField fullWidth sx={styles.textField} size={"small"} value={msgText} maxRows={5} multiline
                           onChange={(e) => setMsgText(e.target.value)}/>
                <Button variant="outlined" sx={styles.button} onClick={sendMessage}>
                    <SendIcon fontSize={'small'}/>
                </Button>
            </Stack>
        </>
    )
}
export default ChatInput
