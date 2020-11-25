import React, { useContext, useEffect, useState } from 'react';
import { store } from '../../store';
// Components
import {
    Card, Grid, ListItemText, List, ListItem
} from '@material-ui/core';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import PermissionSelect from '../../components/CustomSelect/Permission-Select';

const Permissions = () => {
    const { reducers, state } = useContext(store);
    const { permissions } = state.multichain_state;
    const [selectedPermission, setSelectedPermission] = useState('')

    const handlePermissionSelect = (e) => {
        setSelectedPermission(e.target.value);
    }

    useEffect(() => {
        reducers.setTitle('Permissions');
        // eslint-disable-next-line
    }, [])

    return (permissions &&
        <Section>
            <br />
            <SectionToolbar
                center={
                    <PermissionSelect
                        value={selectedPermission}
                        onChange={handlePermissionSelect} />
                }
            />
            <br />
            {selectedPermission === '' ? null :
                <Grid container
                    justify='center'>
                    <Grid item md={6}>
                        <Card>
                            <List>
                                {permissions[selectedPermission].map((value, i) =>
                                    <ListItem button key={i}>
                                        <ListItemText>
                                            {value}
                                        </ListItemText>
                                    </ListItem>
                                )}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            }
        </Section>
    )
}
export default Permissions;