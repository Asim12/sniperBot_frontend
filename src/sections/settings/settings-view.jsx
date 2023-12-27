import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings, editSettings, pauseSettings, startSettings, deleteSettings, createSettings } from 'src/redux/action';
import { Pause, PlayArrow } from '@mui/icons-material';
import { Typography } from '@mui/material';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [showCreateFields, setShowCreateFields] = useState(false);
  const [createValues, setCreateValues] = useState({});

  useEffect(() => {
    dispatch(getSettings());
    setOriginalValues(settingsState?.settings?.setting);
  }, [dispatch]);

  const editableFields = ['trade_setting_id', 'buy_amount_eth', 'profit_percentage'];

  const handleEditClick = () => {
    setEditMode(true);
    setEditedValues({ ...settingsState?.settings?.setting });
    setOriginalValues({ ...settingsState?.settings?.setting });
  };

  const handleDelete = () => {
    const { _id, user_id } = settingsState?.settings?.setting || {};
  
    if (_id && user_id) {
      if (window.confirm('Are you sure you want to delete this setting?')) {
        dispatch(deleteSettings({ trade_setting_id: _id, user_id }))
          .then(() => {
            // Code to execute after deleteSettings is complete
            dispatch(getSettings()); // Refresh settings after deletion
          })
          .catch((error) => {
            console.error('Error deleting setting:', error);
            // Handle error if needed
          });
      }
    } else {
      console.error('Invalid trade_setting_id or user_id');
    }
  };

  const handleSaveClick = () => {
    dispatch(editSettings({
      trade_setting_id: editedValues._id,
      buy_amount_eth: editedValues.buy_amount_eth,
      profit_percentage: editedValues.profit_percentage,
    }));

    setEditMode(false);
    dispatch(getSettings());
  };

  const handleStop = async () => {
    dispatch(pauseSettings(settingsState?.settings?.setting?._id));
  };

  const handlePlay = () => {
    dispatch(startSettings(settingsState?.settings?.setting?._id));
  };

  const handleCancelClick = () => {
    setEditedValues({ ...originalValues });
    setEditMode(false);
  };

  const handleCreateClick = () => {
    setShowCreateFields(true);
  };


  const formatKey = (key) => (
    key
      .split('_')
      .map((word) => word.toUpperCase())
      .join(' ')
  );

  const handleCreateSubmit = () => {
    dispatch(createSettings({
      buy_amount_eth: Number(createValues.buy_amount_eth),
      profit_percentage: Number(createValues.profit_percentage),
    }))
    .then(() => {
      // Code to execute after createSettings is complete
      dispatch(getSettings());
      setShowCreateFields(false);
      setEditMode(false);
      setCreateValues({});
    });
  
    setShowCreateFields(false);
    setEditMode(false);
    setCreateValues({});
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
            {settingsState?.loading || settingsState?.getSettingsLoading ? (
              <Typography>Please wait...</Typography>
            ) : settingsState?.settings?.setting?.trading_status === true ? (
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
      {showCreateFields && (
        <div style={createFieldsContainerStyle}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Buy Amount ETH:</label>
            <input
              type="text"
              value={createValues.buy_amount_eth || ''}
              onChange={(e) => setCreateValues((prev) => ({ ...prev, buy_amount_eth: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Profit Percentage:</label>
            <input
              type="text"
              value={createValues.profit_percentage || ''}
              onChange={(e) => setCreateValues((prev) => ({ ...prev, profit_percentage: e.target.value }))}
              style={inputStyle}
            />
          </div>
          <button onClick={handleCreateSubmit} style={submitBtnStyle}>Submit</button>
        </div>
      )}
      {Object.keys(settingsState?.settings?.setting || {}).map((key) => (
        <div style={itemStyle} key={key}>
          <span style={labelStyle}>{formatKey(key)}:</span>
          <span style={valueContainerStyle}>
            {renderValue(key, editMode && editableFields.includes(key))}
          </span>
        </div>
      ))}
      {settingsState?.settings?.setting ? (
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
            <>
              <button style={deleteButtonStyle} onClick={handleDelete}>
                Delete
              </button>
              <button style={editButtonStyle} onClick={handleEditClick}>
                Edit
              </button>
            </>
          )}
        </div>
      ) : (
        <div style={buttonContainerStyle}>
          {!showCreateFields && (
            <button style={createButtonStyle} onClick={handleCreateClick}>
              Create
            </button>
          )}
        </div>
      )}
    </div>
  );
};




// Inline styles
const containerStyle = {
  padding: '20px',
  marginBottom: '20px',
};

const createFieldsContainerStyle = {
  marginBottom: '20px',
};

const submitBtnStyle = {
  backgroundColor: '#4caf50',
  color: '#ffffff',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  backgroundColor: '#ff3d00',
  color: '#ffffff',
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};
const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

const inputContainerStyle = {
  marginBottom: '10px',
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

  const createButtonStyle = {
  backgroundColor: '#4caf50', // Green color
  color: '#ffffff', // White text color
  padding: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default SettingsPage;
