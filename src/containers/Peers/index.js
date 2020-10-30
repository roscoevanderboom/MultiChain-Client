import React, { useContext, useEffect } from 'react';
import { store } from '../../store';
import Section from '../../components/Section';
import SectionToolbar from '../../components/SectionToolbar';
import SectionParagraph from '../../components/SectionParagraph';
import Button from '../../components/CustomButtons/Button';

const Peers = () => {
    const { reducers, state } = useContext(store);

    useEffect(() => {
        reducers.setTitle('Peers');
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (state.peers) {
            console.log(state.peers);

        }
    }, [state.peers])

    return (state.peers &&
        <Section>
            <SectionToolbar
                left={
                    <Button color='github'>
                        Add peer node
                    </Button>
                } />
            {state.peers.length !== 0 ? null :
                <SectionParagraph>
                    No peers connected
                </SectionParagraph>
            }

        </Section>
    )
}

export default Peers;