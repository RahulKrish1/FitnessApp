// lib
import { useState, useRef, useEffect } from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { useParams } from 'react-router-dom'
// comp
import { AdminTitle } from '../../../../utils/tools';
import { errorHelper, Loader } from '../../../../utils/tools'
import { validation, formValues } from './validationSchema'
import WYSIWYG from '../../../../utils/form/wysiwyg';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProgress, updateProgress } from '../../../../store/actions/progress';

// MUI
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import Divider from '@mui/material/Divider' 
import Chip from '@mui/material/Chip'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
 
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
// import { visuallyHidden } from '@mui/utils';


const EditProgress = () => {
    const [loading,setLoading] = useState(true);
    const [formData,setFormData] = useState(formValues)
    const [editorContent,setEditorContent] = useState(null);
    const [editorBlur,setEditorBlur] = useState(false);
    // redux
    const dispatch = useDispatch();

    let { progressId } = useParams();

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: formData,
        validationSchema:validation,
        onSubmit:(values)=>{
            dispatch(updateProgress({values,progressId}))
        }
    })


    const handleEditorState = (state) => {
        formik.setFieldValue('results',state,true)
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true)
    }

    ///// edit 
    useEffect(()=>{
        dispatch(getAdminProgress(progressId))
        .unwrap()
        .then(response => {
            setLoading(false);
            setFormData(response);
            setEditorContent(response.results)
        })

    },[dispatch,progressId])



    //// edit



    return(
        <>
            <AdminTitle title="Edit tips"/>
            { loading ?
                <Loader/>
            :
            <form className='mt-3 article_form' onSubmit={formik.handleSubmit}>

                <div className='form-group'>
                    <TextField
                        style={{ width:'100%'}}
                        name="exercise"
                        label="Enter an exercises"
                        variant="outlined"
                        {...formik.getFieldProps('exercise')}
                        {...errorHelper(formik,'exercise')}
                    />
                </div>

                <div className='form-group'>
                    <WYSIWYG
                        setEditorState={(state)=>handleEditorState(state)}
                        setEditorBlur={(blur)=> handleEditorBlur(blur)}
                        onError={formik.errors.progress}
                        editorBlur={editorBlur}
                        editorContent={editorContent}
                    />
                    { formik.errors.progress || (formik.errors.progress && editorBlur) ?
                        <FormHelperText error={true}>
                            {formik.errors.progress}
                        </FormHelperText>
                        :null
                    }
                </div>

                <Divider className='mt-3 mb-3'/>

                <FormControl fullWidth>
                    <InputLabel>Select a status</InputLabel>
                    <Select
                        name="status"
                        label="Select a status"
                        {...formik.getFieldProps('status')}
                        error={ formik.errors.status && formik.touched.status ? true:false}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                    </Select>
                    { formik.errors.status && formik.touched.status ?
                        <FormHelperText error={true}>
                            { formik.errors.status}
                        </FormHelperText>
                    :null
                    }
                </FormControl>

                <Divider className='mt-3 mb-3'/>

         
                <Button
                    variant='contained'
                    color="primary"
                    type="submit"
                >
                    Edit Tips
                </Button>
            
            </form>
            }
        </>
    )

}

export default EditProgress