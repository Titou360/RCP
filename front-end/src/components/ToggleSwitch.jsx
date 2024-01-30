import { useState } from 'react';
import ReactSwitch from 'react-switch';

const ToggleSwitch = () => {
  const [isSoundOn, setSoundOn] = useState(false);

  const handleSoundToggle = () => {
    setSoundOn(!isSoundOn);
  };

  return (
    <div>
      <ReactSwitch
        checked={isSoundOn}
        onChange={handleSoundToggle}
        width={50}
        checkedIcon={<span role="img" aria-label="se connecter"></span>}
        uncheckedIcon={<span role="img" aria-label="s'enregistrer"></span>}
      />
    </div>
  );
};

export default ToggleSwitch;
