import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { ListItem } from '@mui/material';

const Tester = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <h1>Tester</h1>
            <div>
                <ListItem>
                    <LoadingButton loading={loading} loadingPosition="start" variant="contained">
                        Save
                    </LoadingButton>
                </ListItem>
            </div>
        </div>
    );
};
export default Tester;
