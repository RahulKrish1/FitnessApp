import { useEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Loader, htmlDecode } from '../../utils/tools';
import { useDispatch, useSelector } from 'react-redux'
import { getProgress } from '../../store/actions/progress'


const Progress = () => {
    const progress = useSelector(state=>state.progress);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(()=>{
        dispatch(getProgress(id))
    },[id,dispatch])



    return(
        <>
            { progress && progress.current ?
                <div className='article_container'>
                    <div
                        style={{
                            background:`url(https://picsum.photos/1920/1080)`
                        }}
                        className="image"
                    >
                    </div>
                    <h1>{progress.current.exercise}</h1>
                    <div className='mt-3 content'>
                        <div dangerouslySetInnerHTML={
                            {__html: htmlDecode(progress.current.results)}
                        }>
                        </div>
                    </div>
                </div>
            :
                <Loader/>
            }
        </>
    )
}

export default Progress