import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Grid from '@material-ui/core/Grid';
import Section from '../../components/Section';
import SectionHeader from '../../components/SectionHeader';
import CustomFrame from '../../components/CustomFrame';
import AssetCard from './AssetCard';
import NewAsset from './NewAsset';

export default () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Assets');
    }, [])


    return (
        <Section>
            {!state.assets ?
                <CustomFrame url='https://www.multichain.com/developers/asset-reissuance/' /> :
                <React.Fragment>
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
                </React.Fragment>
            }
        </Section>
    )
}