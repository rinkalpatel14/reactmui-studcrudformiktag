import React, { useState } from 'react'
import './StudCrudFormikTag.css'
import { Box, Container, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, Stack, } from '@mui/material';
import Paper from '@mui/material/Paper';
import { Field, Form, Formik } from 'formik'

function StudCrudFormikTag() {
    const [list, setList] = useState([])
    const [editId, setEditId] = useState(null)
    const [open, setOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const [ini, setIni] = useState({
        id: '',
        name: '',
        sub1: '',
        sub2: '',
        sub3: '',
    })

    //update + submit data
    const handleSubmit = (values, { resetForm }) => {
        if (editId != null) {
            const copyData = [...list]
            copyData[editId] = values
            setList(copyData)
            setEditId(null)
            setIni({
                id: '',
                name: '',
                sub1: '',
                sub2: '',
                sub3: '',
            })
        } else {
            console.log(values);
            setList([...list, values])
        }
        resetForm()
        setOpen(false)
    }

    //confimdelete data
    const confirmDelete = () => {
        const copyData = [...list]
        copyData.splice(deleteIndex, 1)
        setList(copyData)
        setDeleteOpen(false)
        setDeleteIndex(null)
    }

    // //delete data
    // const deleteData = (index) => {
    //     const copyData = [...list]
    //     copyData.splice(index, 1)
    //     setList(copyData)
    // }

    //edit data
    const editData = (data, index) => {
        setIni(data)
        setEditId(index)
        setOpen(true)
    }

    return (

        <Container maxWidth="lg">
            <Box sx={{ height: '100vh', py: 5 }}>
                {/* create button */}
                <Button variant="contained" className='createstud-btn'
                    onClick={() => setOpen(true)}
                    sx={{ bgcolor: '#21d05b' }} >
                    Create Student
                </Button>
                <Box className="crud-table">
                    <Typography variant='h6' className='table-heading'>Student Result Management </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200, border: '1px solid rgba(52, 145, 238, 0.15)' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Id</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Sub1</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Sub2</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Sub3</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Total</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Min</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Max</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: 16 }}>Percent</TableCell>
                                    <TableCell align='center' sx={{ fontWeight: 'bold', fontSize: 16 }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {list.map((i, index) => (
                                    <TableRow
                                        key={i.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">
                                            {i.id}
                                        </TableCell>
                                        <TableCell>{i.name}</TableCell>
                                        <TableCell>{i.sub1}</TableCell>
                                        <TableCell>{i.sub2}</TableCell>
                                        <TableCell>{i.sub3}</TableCell>
                                        <TableCell sx={{ color: 'green', fontWeight: 'bold' }}>{i.sub1 + i.sub2 + i.sub3}</TableCell>
                                        <TableCell>
                                            {(i.sub1 < i.sub2) && (i.sub1 < i.sub3) ? i.sub1 :
                                                (i.sub2 < i.sub1) && (i.sub2 < i.sub3) ? i.sub2 : i.sub3}
                                        </TableCell>
                                        <TableCell>
                                            {(i.sub1 > i.sub2) && (i.sub1 > i.sub3) ? i.sub1 :
                                                (i.sub2 > i.sub1) && (i.sub2 > i.sub3) ? i.sub2 : i.sub3}
                                        </TableCell>
                                        <TableCell sx={{ color: 'blue', fontWeight: 'bold' }}>
                                            {((i.sub1 + i.sub2 + i.sub3) / 3).toFixed(2)} %
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Button variant="contained" color='info' className='update-btn'
                                                sx={{ mr: 1 }}
                                                onClick={() => editData(i, index)}>
                                                Update
                                            </Button>
                                            <Button variant="contained" color='error' className='del-btn'
                                                onClick={() => {
                                                    setDeleteIndex(index)
                                                    setDeleteOpen(true)
                                                }}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            {/* create button dialog box */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle >Create a new student! </DialogTitle>
                <DialogContent>
                    <Formik initialValues={ini} onSubmit={handleSubmit} enableReinitialize={true}>
                        <Form>
                            <Stack spacing={2} mt={1}>
                                <Field name="id" type="number" placeholder="Id" className="input-field"></Field>
                                <Field name="name" placeholder="Enter your name" className="input-field"></Field>
                                <Field name="sub1" type="number" placeholder="Sub1 marks" className="input-field"></Field>
                                <Field name="sub2" type="number" placeholder="Sub2 marks" className="input-field"></Field>
                                <Field name="sub3" type="number" placeholder="Sub3 marks" className="input-field"></Field>
                                <Button type='submit' variant="contained" className='submit-btn'
                                    sx={{ bgcolor: '#21d05b' }}>
                                    {editId != null ? "Update" : "Create"}
                                </Button>
                            </Stack>
                        </Form>
                    </Formik>
                </DialogContent>
            </Dialog>

            {/* delete dialog box */}
            <Dialog open={deleteOpen} onClose={() => deleteOpen(false)}>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete this student?
                    </Typography>
                    <Stack direction="row" spacing={2} mt={2} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            variant="contained"
                            color='error'
                            className='del-btn'
                            onClick={confirmDelete}>
                            Delete
                        </Button>
                        <Button
                            variant="outlined"
                            className='del-btn'
                            onClick={() => setDeleteOpen(false)}>
                            Cancel
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Container>

    )
}

export default StudCrudFormikTag
