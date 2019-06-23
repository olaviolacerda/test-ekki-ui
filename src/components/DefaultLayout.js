import React from 'react'

import { Grid } from 'semantic-ui-react'
import Header from '../components/Header'


const DefaultLayout = ({ children, rowMargin, verticalAlign, textAlign, gridStyles, columnStyles, header }) => {
    return (
        <Grid verticalAlign={verticalAlign} textAlign={textAlign} style={{ ...gridStyles }}>
            <Grid.Column style={{ ...columnStyles }}>
                {!header && <Header />}
                <Grid.Row style={{ marginTop: rowMargin ? rowMargin : 40 }}>
                    {children}
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
};

export default DefaultLayout