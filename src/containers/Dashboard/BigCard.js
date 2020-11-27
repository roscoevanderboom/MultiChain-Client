import React, { useEffect, useContext, useState } from 'react';
import { store } from '../../store';
import fs from 'fs';
import path from 'path';
import { execFile, spawn } from 'child_process';
// Constants
import chainpath from '../../constants/multichain/Chainpaths';
// Components
import Card from '../../components/DashboardCard';
import { ListItemText, Grid, Divider } from '@material-ui/core';
// Styles
import styles from './styles';

const BigCard = (props) => {
    const classes = styles();
    const { state } = useContext(store);
    const { chainInfo } = state.multichain_state;
    const [total, setTotal] = useState(0);

    const blockchainDBSize = () => {
        const DBpath = path.join(chainpath, chainInfo.chainname);
        fs.readdir(DBpath, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                res.map(file => fs.stat(path.join(DBpath, file),
                    (err, stats) => {
                        if (err) {
                            console.log(err);
                        } else {
                            setTotal(total => total + stats.size / 1024)
                        }
                    }))
            }
        })
        // const readdir = spawn('dir', ['-w']);
        // readdir.stdout.on('data', (data) => {
        //     console.log(data.toString());
        // });
        // readdir.stderr.on('data', (data) => {
        //     console.log(data.toString());
        // });
    }

    useEffect(() => {
        if (chainInfo.chainname !== undefined) {
            blockchainDBSize();
        }
    }, [chainInfo.chainname])

    useEffect(() => {
        console.log(total);       
    }, [total])

    return (
        <Card title={props.title}>
            <Grid container
                className={classes.largeCards}>
                Stats
            </Grid>
        </Card>
    )
}
export default BigCard;