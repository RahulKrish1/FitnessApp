import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProgressCard = ({progress}) => {

    return(
        <Card>
            <CardMedia
                style={{height:0,paddingTop:'56.25%'}}
                image={`https://picsum.photos/200?${progress._id}`}
                title="some title"
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component="h2">
                    {progress.exercise}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button 
                    size="small"
                    color="primary" 
                    component={RouterLink}
                    to={`/progress/progress/${progress._id}`}
                >
                    View Tips
                </Button>
            </CardActions>
        </Card>
    )

}

export default ProgressCard