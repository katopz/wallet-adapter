import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useState } from 'react';

const NETWORKS = ['mainnet-beta', 'devnet', 'testnet'];

export default function NetworkSelector() {
    const [network, setNetwork] = useState('devnet');
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setNetwork(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native"></InputLabel>
                <NativeSelect
                    onChange={handleChange}
                    defaultValue={network}
                    inputProps={{
                        name: 'network',
                        id: 'uncontrolled-native',
                    }}
                >
                    {NETWORKS.map((e) => (
                        <option value={e}>{e}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </Box>
    );
}
