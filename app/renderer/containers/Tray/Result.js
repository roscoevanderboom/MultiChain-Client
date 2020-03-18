import React, { useEffect, useState } from 'react';
// State
import { Container, Toolbar, makeStyles, Button } from '@material-ui/core'
import { Backspace, Close } from '@material-ui/icons'

const styles = makeStyles({
    container: {
        margin: 0,
        padding: 0
    },
    toolbar: {
        backgroundColor: 'black',
        minHeight: 'fit-content',
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const Result = ({ props }) => {
    const classes = styles();
    const { files, tags, setTags } = props;
    const [tagList, setTagList] = useState([]);

    const goBack = () => {
        routerHistory.goBack()
    }

    useEffect(() => {
        console.log(files);
        console.log(tags);
    }, [tags, files]);

    return (
        <Container className={classes.container}>
            <Toolbar className={classes.toolbar}>
                <Backspace onClick={goBack} className='toolbarBtn' />
                <Close className='toolbarBtn closeBtn' />
            </Toolbar>
        </Container>
    )
}

export default Result;