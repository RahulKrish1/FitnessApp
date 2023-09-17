import * as Yup from 'yup';

export const formValues = {
    exercise:'',
    results:'',
    status:'draft'
}


export const validation = () => (
    Yup.object({
        exercise:Yup.string()
        .required('Sorry the Exercise is required'),
        results:Yup.string()
        .required('Sorry the content is required')
        .min(15,'Minimum of 15 characters required'),
        status:Yup.string()
        .required('Sorry the status is required'),
    })
)