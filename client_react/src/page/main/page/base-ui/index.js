import {
    AppBar,
    Box,
    Container,
    Grid,
    Toolbar,
} from "@mui/material";

const BaseUi = ({children, title}) => {
    const styles = {
        boxContainer: {},
    }

    return(
        <>
            <Box sx={styles.boxContainer}>
                <AppBar position="static">
                    <Toolbar>
                        <Container maxWidth={'md'}>
                            <Grid container direction="row" alignItems="center" justifyContent="center">
                                {title}
                            </Grid>
                        </Container>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    )
}
export default BaseUi