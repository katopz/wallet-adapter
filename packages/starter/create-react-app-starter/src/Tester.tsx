import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { SignMessageComponent } from './components/SignMessageComponent';

type WalletResponseResult = {
    signature: string;
};

type WalletSignedMessageResponseResult = {
    publicKey: string;
    signature: string;
};

type WalletResponse = {
    id: number;
    jsonrpc: string;
    result: WalletResponseResult | WalletSignedMessageResponseResult;
};

export const AUTHORIZED_METHODS = ['signMessage', 'signTransaction', 'signAllTransactions'];
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ m: 0, p: 0 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function getMessageByMethod(message: string): Uint8Array {
    return new TextEncoder().encode(message);
}

function getJsonPayload(method: string, message: string) {
    return JSON.stringify(
        {
            jsonrpc: '2.0',
            id: new Date().valueOf(),
            method,
            params: {
                message: getMessageByMethod(message),
            },
        },
        null,
        2
    );
}

export default function Tester() {
    const { sendTransaction, signTransaction, signAllTransactions, signMessage } = useWallet();
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {AUTHORIZED_METHODS.map((e, i) => (
                        <Tab label={e} {...a11yProps(i)} style={{ textTransform: 'none' }} />
                    ))}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <SignMessageComponent signMessage={signMessage} />
                {/* <TesterPayloadComponent value={value} payload={payload} index={i} /> */}
            </TabPanel>
        </Box>
    );
}
