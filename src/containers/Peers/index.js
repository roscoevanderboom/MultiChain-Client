import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import SectionParagraph from '../../components/SectionParagraph';
import Button from '../../components/CustomButtons/Button';

const Peers = () => {
    const { reducers, state } = useContext(store);
    const { peers } = state.multichain_state;

    useEffect(() => {
        reducers.setTitle('Peers');
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (peers) {
            console.log(peers);

        }
    }, [peers])

    return (peers &&
        <Section>
            <SectionToolbar
                left={
                    <Button size='sm' color='github'>
                        Add peer node
                    </Button>
                } />
            {peers.length !== 0 ? null :
                <SectionParagraph>
                    No peers connected
                </SectionParagraph>
            }

        </Section>
    )
}

export default Peers;