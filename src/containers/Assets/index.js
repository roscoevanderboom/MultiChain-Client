import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Grid from '@material-ui/core/Grid';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import AssetCard from './AssetCard';
import NewAsset from './NewAsset';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Assets');
        // eslint-disable-next-line
    }, [])


    return (state.assets &&
        <Section>
            <SectionHeader>
                <NewAsset />
            </SectionHeader>
            <Grid container>
                {state.assets.map((asset, i) =>
                    <Grid item xs={4}
                        key={i}>
                        <AssetCard asset={asset} />
                    </Grid>
                )}
            </Grid>
        </Section>
    )
}