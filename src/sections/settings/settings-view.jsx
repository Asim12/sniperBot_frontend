import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, editSettings, pauseSettings, startSettings } from 'src/redux/action';
import { Pause, PlayArrow, Stop } from '@mui/icons-material'; // Import Material-UI icons

const SettingsPage = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);
  console.log("🚀 ~ file: settings-view.jsx:9 ~ SettingsPage ~ settingsState:", settingsState)
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [originalValues, setOriginalValues] = useState({});

  console.log(originalValues)

  useEffect(() => {
    dispatch(getSettings());

    setOriginalValues(settingsState?.settings?.setting)
  }, [dispatch]);

  const editableFields = ['trade_setting_id', 'buy_amount_eth', 'profit_percentage'];

  const handleEditClick = () => {
    setEditMode(true);
    // Set initial values for editing
    setEditedValues({ ...settingsState?.settings?.setting });
    setOriginalValues({ ...settingsState?.settings?.setting });
  };


  const formatKey = (key) => (
    key
      .split('_')
      .map((word) => word.toUpperCase())
      .join(' ')
  );

  const handleSaveClick = () => {
    // Dispatch action to edit settings with editable values
    dispatch(editSettings({
      trade_setting_id: editedValues._id,
      buy_amount_eth: editedValues.buy_amount_eth,
      profit_percentage: editedValues.profit_percentage,
    }));

    // Handle any additional logic on save if needed

    // Exit edit mode
    setEditMode(false);

    dispatch(getSettings())
  };


  const handleStop=()=>{
    dispatch(pauseSettings(
        originalValues._id,
      
      ));

      dispatch(getSettings())
  }


  
  const handlePlay=()=>{
    dispatch(startSettings(
        originalValues._id,
      
      ));

      dispatch(getSettings())
  }

  const handleCancelClick = () => {
    // Reset edited values to original values on cancel
    setEditedValues({ ...originalValues });
    setEditMode(false);
  };

  const renderValue = (value, isEditable) => {
    if (editMode && isEditable) {
      return (
        <input
          type="text"
          value={editedValues[value] || ''}
          onChange={(e) =>
            setEditedValues((prev) => ({ ...prev, [value]: e.target.value }))
          }
          style={inputStyle}
        />
      );
    }
    return (
      <>
        <span style={valueStyle}>{settingsState?.settings?.setting?.[value]}</span>
        {value === 'trading_status' && (
          <>
            {settingsState?.settings?.setting?.trading_status ? (
                              <Pause onClick={handleStop} title="Stop" style={iconStyle} />

            ) : (

                <PlayArrow onClick={handlePlay} style={iconStyle} />

            )}
          </>
        )}
      </>
    );
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Trade Settings</h2>
      {Object.keys(settingsState?.settings?.setting || {}).map((key) => (
        <div style={itemStyle} key={key}>
          <span style={labelStyle}>{formatKey(key)}:</span>
          <span style={valueContainerStyle}>
            {renderValue(key, editMode && editableFields.includes(key))}
          </span>
        </div>
      ))}
      <div style={buttonContainerStyle}>
        {editMode ? (
          <>
            <button style={saveButtonStyle} onClick={handleSaveClick}>
              Save
            </button>
            <button style={cancelButtonStyle} onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button style={editButtonStyle} onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

// Inline styles
// ... (same as before)


// Inline styles
const containerStyle = {
  padding: '20px',
  marginBottom: '20px',
};

const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const itemStyle = {
  display: 'flex',
  marginBottom: '10px',
};

const labelStyle = {
  fontWeight: 'bold',
  marginRight: '10px',
};

const valueContainerStyle = {
  flexGrow: 1,
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '16px',
};

const valueStyle = {
  fontSize: '16px',
};

const buttonContainerStyle = {
  marginTop: '10px',
};

const editButtonStyle = {
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  marginRight: '10px',
  backgroundColor: '#2196f3',
  color: '#fff',
};

const saveButtonStyle = {
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  marginRight: '10px',
  backgroundColor: '#4caf50',
  color: '#fff',
};

const cancelButtonStyle = {
  padding: '8px 16px',
  fontSize: '16px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '4px',
  marginRight: '10px',
  backgroundColor: '#ff9800',
  color: '#fff',
};

const iconStyle = {
    marginLeft: '5px', // Adjust the margin as needed
    cursor:'pointer'
  };

export default SettingsPage;
