import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export default function MuiDialog(props) {
    const onCancelClicked = () => {
        props.onCancelClicked()
    }
    const onConfirmClicked = () => {
        props.onConfirmClicked()
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={onCancelClicked}>
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    {props.contents}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelClicked}>{props.cancelText}</Button>
                    <Button onClick={onConfirmClicked} autoFocus sx={{textTransform: 'none'}} size={'large'}>
                        {props.confirmText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}