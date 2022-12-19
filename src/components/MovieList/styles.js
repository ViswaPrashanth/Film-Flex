import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    moviesContainer : {
        display : 'flex',
        flexwarp : "wrap",
        justifyContent : "space-between",
        overflow : "auto",
        [theme.breakpoints.down('sm')] : {
            justifyContent : 'center',
        }
    }
}));