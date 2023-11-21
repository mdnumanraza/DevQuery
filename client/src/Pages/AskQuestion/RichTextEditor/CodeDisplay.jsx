import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, base16AteliersulphurpoolLight, } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeDisplay = ({code}) => {
    const [mode,setMode] = useState(base16AteliersulphurpoolLight);

    const handleMode = ()=>{
        mode===base16AteliersulphurpoolLight?setMode(darcula):setMode(base16AteliersulphurpoolLight)
    }
  
  return (
    <>
    <p className='code-mode' onClick={handleMode}>
        { mode!==base16AteliersulphurpoolLight?"Light":"Dark"}
    </p>
    <SyntaxHighlighter language="javascript" style={ mode}>
    
      {code}
    </SyntaxHighlighter>
    </>
  );
};

export default CodeDisplay;

