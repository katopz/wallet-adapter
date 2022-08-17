import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box } from '@mui/material';

type TesterPayloadComponentProps = {
    text: string;
    setText: Function;
    style?: React.CSSProperties;
};

function TextareaInput(props: TesterPayloadComponentProps) {
    const { text, setText, style } = props;
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.value);
        setText(event.target.value);
    };

    return (
        <TextareaAutosize
            style={{ height: 200, width: '100%', ...style }}
            onChange={handleChange}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={text}
        />
    );
}

type SignMessageComponentProps = {
    signMessage?: Function;
};

export function SignMessageComponent(props: SignMessageComponentProps) {
    const { signMessage } = props;
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('hello');

    const handleClick = async () => {
        setLoading(true);
        if (!signMessage) {
            throw Error('signMessage is not defined');
        }
        const message: Uint8Array = new TextEncoder().encode(text);
        signMessage(message).then((result: any) => console.log(result));
    };

    return (
        <Box style={{ margin: '0.5em' }}>
            <TextareaInput text={text} setText={setText} />
            <LoadingButton
                disabled={loading || !signMessage}
                loading={loading}
                loadingPosition="start"
                variant="contained"
                onClick={() => handleClick()}
                style={{ marginTop: '0.5em' }}
            >
                SUBMIT
            </LoadingButton>
        </Box>
    );
}
