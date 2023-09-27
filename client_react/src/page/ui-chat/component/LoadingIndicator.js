import {Box, CircularProgress, Grid, Stack} from "@mui/material";

const LoadingIndicator = (props) => {
    return (
        <Grid container justifyContent="center">
            <Stack sx={{color: 'grey.500'}} spacing={2} direction="row">
                <CircularProgress color="secondary"/>
                <CircularProgress color="success"/>
                <CircularProgress color="inherit"/>
            </Stack>
        </Grid>
    )
}
export default LoadingIndicator