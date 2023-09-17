import { Table, Pagination} from 'react-bootstrap';
import { Loader } from '../../../utils/tools';
import Moment from 'react-moment';


const PaginateComponent = ({
    progress,
    goToPrevPage,
    goToNextPage,
    goToEdit,
    handleStatusChange,
    handleShow
}) => {


    return(
        <>
            { progress && progress.docs ?
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Created</th>
                                <th>Exercises</th>
                            </tr>
                        </thead>
                        <tbody>
                            { progress.docs.map(item=>(
                                <tr key={item._id}>
                                    <td><Moment to={item.date}></Moment></td>
                                    <td>{item.exercise}</td>
                                    <td className='action_btn remove_btn'
                                        onClick={()=> handleShow(item._id) }
                                    >
                                        Remove
                                    </td>
                                    <td className='action_btn edit_btn'
                                        onClick={()=> goToEdit(item._id)}
                                    >
                                        Edit
                                    </td>
                                    <td className='action_btn status_btn'
                                        onClick={()=> handleStatusChange(item.status,item._id)}
                                    >
                                        {item.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination>
                        { progress.hasPrevPage ?
                            <>
                                <Pagination.Prev 
                                    onClick={()=> goToPrevPage(progress.prevPage)}
                                />
                                <Pagination.Item
                                    onClick={()=> goToPrevPage(progress.prevPage)}
                                >
                                    {progress.prevPage}
                                </Pagination.Item>
                            </>
                            :null
                        }
                        <Pagination.Item active>{progress.page}</Pagination.Item>
                        { progress.hasNextPage ?
                            <>
                                <Pagination.Item
                                    onClick={()=> goToNextPage(progress.nextPage)}
                                >
                                    {progress.nextPage}
                                </Pagination.Item>
                                <Pagination.Next
                                    onClick={()=> goToNextPage(progress.nextPage)}
                                />
                            </>
                        :null
                        }

                    </Pagination>
                </>
            :
                <Loader/>
            }


        </>
    )

}

export default PaginateComponent