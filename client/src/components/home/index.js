import { useEffect } from 'react';
import ProgressCard from '../../utils/progressCard';

// mui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
// redux
import { useDispatch,useSelector} from 'react-redux' 
import { homeLoadMore } from '../../store/actions/progress'

const Home = () => {
    const progress = useSelector(state=>state.progress);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(progress.progress.length <= 0){
            dispatch(homeLoadMore(progress.homeSort))
        }
    },[dispatch])


    const getNextProgress = () => {
        let skip = progress.homeSort.skip + progress.homeSort.limit;
        dispatch(homeLoadMore({...progress.homeSort, skip:skip}))
    }



    return(
        <>
            <Grid container spacing={2} className="article_card">
                { progress && progress.progress ?
                    progress.progress.map(item=>(
                        <Grid key={item._id} item xs={12} sm={6} lg={3}>
                            <ProgressCard progress={item}/>
                        </Grid>
                    ))
                :null}
            </Grid>
            <hr/>
            <Button
                variant='outlined'
                onClick={getNextProgress}
            >
                Load More
            </Button>
        </>
    )
}

export default Home;