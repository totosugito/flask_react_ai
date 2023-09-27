import ChatList from "./component/ChatList";
import {useState} from "react";
import {httpPost} from "../../service/http-api";
import {useSelector} from "react-redux";
import {addData, clearData} from "../../store/slice/chat";
import {dispatch} from "../../store";
import {Button} from "@mui/material";
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import LoadingIndicator from "./component/LoadingIndicator";
import ChatInput from "./component/ChatInput";

const UiChat = () => {
    const chatStore = useSelector((state) => state.chat)
    const [chatList, setChatList] = useState(chatStore["data"])
    const [showLoader, setShowLoader] = useState(false)


    const submitQuestion = async (text) => {
        setShowLoader(true)
        let bodyFormData = new FormData();
        let config = {
            headers: {"Content-Type": "multipart/form-data"}
        }
        bodyFormData.append('question', text);
        httpPost("http://127.0.0.1:8001/send-question", bodyFormData, config).then((v) => {
            if (v.isError) {
                console.log(v.message)
            } else {
                dispatch(addData(v.data))
                setChatList((chatList) => [...chatList, v.data])
            }
            setShowLoader(false)
        })
    }

    const onSendMessage = (msg) => {
        if (showLoader) {
            return;
        }

        if (msg.response === "")
            return
        setChatList((chatList) => [...chatList, msg])
        dispatch(addData(msg))
        submitQuestion(msg.response).then(r => {
        })
    }

    const clearChatHistory = () => {
        setChatList([]);
        dispatch(clearData())
    }
    return (
        <>
            <Button variant="outlined" startIcon={<AutoDeleteIcon/>} onClick={() => clearChatHistory()}>Clear
                Chat</Button>
            <ChatList data={chatList}/>

            {showLoader &&
                <LoadingIndicator/>
            }
            <ChatInput onSendMessage={onSendMessage}/>
        </>
    )
}
export default UiChat