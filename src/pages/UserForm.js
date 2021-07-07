import { Grid, TableBody, TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Controls from '../components/Controls';
import AddIcon from '@material-ui/icons/Add';

export default function UserForm() {

    const [openPopup, setOpenPopup] = useState(false);

    return (
        <Grid container>
            <Grid item xs={6}>
                <Controls.Button
                    variant="outlined"
                    startIcon={<AddIcon/>}
                    onClick={() => setOpenPopup(true)}
                />
                <Controls.Popup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    title="Custom popup"
                >
                    <div>
                        src/components/basic/Popup.js
                        Line 8:40:  'setOpenPopup' is assigned a value but never used  no-unused-vars

                        src/components/basic/RadioGroup.js
                        Line 10:11:  'classes' is assigned a value but never used  no-unused-vars
                    </div>
                </Controls.Popup>
            </Grid>
        </Grid>
        
    )
}
