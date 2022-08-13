import { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function ContractBtns({ setValue }) {
  const {
    state: { contract, accounts },
  } = useEth();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async (e) => {
    if (e.target.tagName === 'INPUT') {
      return;
    }
    if (inputValue === '') {
      alert('Please enter a value to write.');
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">
      <button onClick={read}>read()</button>

      <div className="input-btn">
        <input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
        <button onClick={(e) => write(e)}>write</button>
      </div>
    </div>
  );
}

export default ContractBtns;
