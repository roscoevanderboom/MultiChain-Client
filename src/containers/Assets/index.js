import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
import Grid from '@material-ui/core/Grid';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import AssetCard from './AssetCard';
import NewAsset from './NewAsset';
import SendAsset from './SendAsset';

const Assets = () => {
    const { reducers, state } = useContext(store);
    const { multichain_state } = state;
    const [current_asset, setCurrentAsset] = useState({});
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(open ? false : true)
    }

    useEffect(() => {
        reducers.setTitle('Assets');
        // eslint-disable-next-line
    }, [current_asset])


    return (multichain_state.assets &&
        <Section>
            <SectionToolbar
                left={<NewAsset />} />

            <Grid container>
                {multichain_state.assets.map((asset, i) =>
                    <Grid item xs={4}
                        key={i}>
                        <AssetCard
                            props={{ asset, setCurrentAsset, handleModal }} />
                    </Grid>
                )}
            </Grid>
            <SendAsset props={{
                asset: current_asset,
                open, handleModal
            }} />
        </Section>
    )
}
export default Assets;